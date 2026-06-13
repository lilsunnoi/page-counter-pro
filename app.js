// Configure PDF.js Worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Application State
const state = {
    theme: 'dark', // 'dark' or 'light'
    isAuthenticated: false, // Whether the user is logged in
    files: [], // Array of File objects currently loaded
    pages: [], // Array of analyzed page objects
    isProcessing: false,
    cancelRequested: false,
    qrCodeDataUrl: null, // Base64 data URL of uploaded QR Code
    settings: {
        colorThreshold: 18,
        minColorPercent: 0.30,
        ignoreBackground: true,
        priceBW: 1.00,
        priceColor: 5.00
    }
};

// DOM Elements
const doc = {
    body: document.body,
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    dropZone: document.getElementById('dropZone'),
    fileInput: document.getElementById('fileInput'),
    fileQueue: document.getElementById('fileQueue'),
    queueList: document.getElementById('queueList'),
    statusAlert: document.getElementById('statusAlert'),
    statusTitle: document.getElementById('statusTitle'),
    statusDetail: document.getElementById('statusDetail'),
    progressBar: document.getElementById('progressBar'),
    cancelProcessBtn: document.getElementById('cancelProcessBtn'),
    
    // Sliders & settings
    colorThreshold: document.getElementById('colorThreshold'),
    minColorPercent: document.getElementById('minColorPercent'),
    ignoreBackground: document.getElementById('ignoreBackground'),
    thresholdVal: document.getElementById('thresholdVal'),
    percentVal: document.getElementById('percentVal'),
    priceBW: document.getElementById('priceBW'),
    priceColor: document.getElementById('priceColor'),
    applySettingsBtn: document.getElementById('applySettingsBtn'),
    
    // QR Code settings
    qrInput: document.getElementById('qrInput'),
    qrPreviewBox: document.getElementById('qrPreviewBox'),
    removeQrBtn: document.getElementById('removeQrBtn'),
    
    // Stats dashboard
    statTotalPages: document.getElementById('statTotalPages'),
    statTotalFiles: document.getElementById('statTotalFiles'),
    statBWPages: document.getElementById('statBWPages'),
    statBWPercent: document.getElementById('statBWPercent'),
    statColorPages: document.getElementById('statColorPages'),
    statColorPercent: document.getElementById('statColorPercent'),
    statTotalCost: document.getElementById('statTotalCost'),
    
    // Results Grid & state
    emptyState: document.getElementById('emptyState'),
    pageGrid: document.getElementById('pageGrid'),
    exportReportBtn: document.getElementById('exportReportBtn'),
    clearAllBtn: document.getElementById('clearAllBtn'),
    
    // Modal
    previewModal: document.getElementById('previewModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalCanvas: document.getElementById('modalCanvas'),
    modalPageTitle: document.getElementById('modalPageTitle'),
    modalPageSize: document.getElementById('modalPageSize'),
    modalColorPercent: document.getElementById('modalColorPercent'),
    modalStatusBadge: document.getElementById('modalStatusBadge'),
    modalToggleBtn: document.getElementById('modalToggleBtn'),

    // Login elements
    loginOverlay: document.getElementById('loginOverlay'),
    loginCard: document.getElementById('loginCard'),
    loginTitle: document.getElementById('loginTitle'),
    loginSubtitle: document.getElementById('loginSubtitle'),
    loginForm: document.getElementById('loginForm'),
    loginUsername: document.getElementById('loginUsername'),
    loginPassword: document.getElementById('loginPassword'),
    togglePasswordBtn: document.getElementById('togglePasswordBtn'),
    eyeIcon: document.getElementById('eyeIcon'),
    rememberMe: document.getElementById('rememberMe'),
    loginError: document.getElementById('loginError'),
    logoutBtn: document.getElementById('logoutBtn'),

    // Register elements
    registerForm: document.getElementById('registerForm'),
    registerUsername: document.getElementById('registerUsername'),
    registerPassword: document.getElementById('registerPassword'),
    registerConfirmPassword: document.getElementById('registerConfirmPassword'),
    toggleRegPasswordBtn: document.getElementById('toggleRegPasswordBtn'),
    regEyeIcon: document.getElementById('regEyeIcon'),
    registerError: document.getElementById('registerError'),
    registerErrorText: document.getElementById('registerErrorText'),
    registerSuccess: document.getElementById('registerSuccess'),
    goToRegisterLink: document.getElementById('goToRegisterLink'),
    goToLoginLink: document.getElementById('goToLoginLink'),
    goToRegisterText: document.getElementById('goToRegisterText'),
    goToLoginText: document.getElementById('goToLoginText'),

    // Logout confirmation modal
    logoutModal: document.getElementById('logoutModal'),
    logoutModalOverlay: document.getElementById('logoutModalOverlay'),
    cancelLogoutBtn: document.getElementById('cancelLogoutBtn'),
    confirmLogoutBtn: document.getElementById('confirmLogoutBtn')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    setupEventListeners();
    initQrCode();
    initLucide();
});

// Setup Lucide Icons
function initLucide() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// QR Code Initialization & Preview UI
function initQrCode() {
    const savedQr = localStorage.getItem('qr_code_data_url');
    if (savedQr) {
        state.qrCodeDataUrl = savedQr;
        updateQrPreviewUI();
    }
}

function updateQrPreviewUI() {
    if (state.qrCodeDataUrl) {
        doc.qrPreviewBox.innerHTML = `<img src="${state.qrCodeDataUrl}" class="qr-preview-img" alt="QR Code Preview">`;
        doc.removeQrBtn.classList.remove('hidden');
    } else {
        doc.qrPreviewBox.innerHTML = `
            <i data-lucide="qr-code" class="qr-placeholder-icon"></i>
            <span class="qr-upload-text">คลิกเพื่ออัปโหลด QR Code</span>
        `;
        doc.removeQrBtn.classList.add('hidden');
        initLucide();
    }
}

// Authentication Handling
function initAuth() {
    const savedAuth = localStorage.getItem('is_authenticated') === 'true' || sessionStorage.getItem('is_authenticated') === 'true';
    if (savedAuth) {
        state.isAuthenticated = true;
        doc.loginOverlay.classList.add('hidden');
        doc.logoutBtn.classList.remove('hidden');
    } else {
        state.isAuthenticated = false;
        doc.loginOverlay.classList.remove('hidden');
        doc.logoutBtn.classList.add('hidden');
    }
}

// Theme Handling
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        state.theme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        state.theme = 'light';
    }
    
    updateThemeUI();
}

function updateThemeUI() {
    if (state.theme === 'light') {
        doc.body.classList.remove('dark-theme');
        doc.body.classList.add('light-theme');
    } else {
        doc.body.classList.remove('light-theme');
        doc.body.classList.add('dark-theme');
    }
    localStorage.setItem('theme', state.theme);
}

// Event Listeners setup
function setupEventListeners() {
    // Theme Toggle
    doc.themeToggleBtn.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        updateThemeUI();
    });

    // Authentication Listeners
    doc.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = doc.loginUsername.value.trim();
        const password = doc.loginPassword.value;
        
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                state.isAuthenticated = true;
                doc.loginError.classList.add('hidden');
                
                if (doc.rememberMe.checked) {
                    localStorage.setItem('is_authenticated', 'true');
                } else {
                    sessionStorage.setItem('is_authenticated', 'true');
                }
                
                doc.loginOverlay.classList.add('hidden');
                doc.logoutBtn.classList.remove('hidden');
                
                doc.loginUsername.value = '';
                doc.loginPassword.value = '';
            } else {
                doc.loginError.querySelector('span').textContent = data.message || 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง!';
                doc.loginError.classList.remove('hidden');
                doc.loginCard.classList.add('shake');
                setTimeout(() => {
                    doc.loginCard.classList.remove('shake');
                }, 400);
            }
        } catch (err) {
            console.error('Login error:', err);
            doc.loginError.querySelector('span').textContent = 'ไม่สามารถเชื่อมต่อฐานข้อมูลเซิร์ฟเวอร์ได้';
            doc.loginError.classList.remove('hidden');
            doc.loginCard.classList.add('shake');
            setTimeout(() => {
                doc.loginCard.classList.remove('shake');
            }, 400);
        }
    });

    doc.togglePasswordBtn.addEventListener('click', () => {
        const type = doc.loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        doc.loginPassword.setAttribute('type', type);
        
        if (type === 'text') {
            doc.eyeIcon.setAttribute('data-lucide', 'eye-off');
        } else {
            doc.eyeIcon.setAttribute('data-lucide', 'eye');
        }
        initLucide();
    });

    doc.toggleRegPasswordBtn.addEventListener('click', () => {
        const isPassword = doc.registerPassword.getAttribute('type') === 'password';
        const type = isPassword ? 'text' : 'password';
        doc.registerPassword.setAttribute('type', type);
        doc.registerConfirmPassword.setAttribute('type', type);
        
        if (type === 'text') {
            doc.regEyeIcon.setAttribute('data-lucide', 'eye-off');
        } else {
            doc.regEyeIcon.setAttribute('data-lucide', 'eye');
        }
        initLucide();
    });

    // Logout Action & Confirmation Modal
    doc.logoutBtn.addEventListener('click', () => {
        doc.logoutModal.classList.add('open');
    });

    const closeLogoutModal = () => {
        doc.logoutModal.classList.remove('open');
    };

    doc.cancelLogoutBtn.addEventListener('click', closeLogoutModal);
    doc.logoutModalOverlay.addEventListener('click', closeLogoutModal);

    doc.confirmLogoutBtn.addEventListener('click', () => {
        state.isAuthenticated = false;
        localStorage.removeItem('is_authenticated');
        sessionStorage.removeItem('is_authenticated');
        doc.loginOverlay.classList.remove('hidden');
        doc.logoutBtn.classList.add('hidden');
        clearAllData();
        closeLogoutModal();
    });

    // Form Navigation Toggle Listeners
    doc.goToRegisterLink.addEventListener('click', () => {
        doc.loginForm.classList.add('hidden');
        doc.registerForm.classList.remove('hidden');
        
        doc.goToRegisterText.classList.add('hidden');
        doc.goToLoginText.classList.remove('hidden');
        
        doc.loginTitle.innerHTML = 'สมัครสมาชิก <span>Pro</span>';
        doc.loginSubtitle.textContent = 'สร้างบัญชีผู้ใช้ใหม่สำหรับประเมินหน้าเอกสาร';
        
        doc.loginError.classList.add('hidden');
        doc.registerError.classList.add('hidden');
        doc.registerSuccess.classList.add('hidden');
    });

    doc.goToLoginLink.addEventListener('click', () => {
        doc.registerForm.classList.add('hidden');
        doc.loginForm.classList.remove('hidden');
        
        doc.goToLoginText.classList.add('hidden');
        doc.goToRegisterText.classList.remove('hidden');
        
        doc.loginTitle.innerHTML = 'PageCounter <span>Pro</span>';
        doc.loginSubtitle.textContent = 'เข้าสู่ระบบเพื่อใช้งานระบบแยกหน้าเอกสาร';
        
        doc.loginError.classList.add('hidden');
        doc.registerError.classList.add('hidden');
        doc.registerSuccess.classList.add('hidden');
    });

    // Register Form Handler
    doc.registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = doc.registerUsername.value.trim();
        const password = doc.registerPassword.value;
        const confirmPass = doc.registerConfirmPassword.value;
        
        doc.registerError.classList.add('hidden');
        doc.registerSuccess.classList.add('hidden');
        
        if (username.length < 3) {
            showRegisterError('ชื่อผู้ใช้งานต้องมีความยาวอย่างน้อย 3 ตัวอักษร');
            return;
        }
        
        if (password.length < 6) {
            showRegisterError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
            return;
        }
        
        if (password !== confirmPass) {
            showRegisterError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                doc.registerSuccess.classList.remove('hidden');
                
                doc.registerUsername.value = '';
                doc.registerPassword.value = '';
                doc.registerConfirmPassword.value = '';
                
                setTimeout(() => {
                    doc.goToLoginLink.click();
                    doc.loginUsername.value = username;
                    doc.loginPassword.focus();
                }, 1500);
            } else {
                showRegisterError(data.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
            }
        } catch (err) {
            console.error('Registration error:', err);
            showRegisterError('ไม่สามารถเชื่อมต่อฐานข้อมูลเซิร์ฟเวอร์ได้');
        }
    });

    function showRegisterError(message) {
        doc.registerErrorText.textContent = message;
        doc.registerError.classList.remove('hidden');
        doc.loginCard.classList.add('shake');
        setTimeout(() => {
            doc.loginCard.classList.remove('shake');
        }, 400);
    }

    // Drag and Drop
    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        doc.dropZone.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        doc.dropZone.addEventListener(eventName, () => doc.dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        doc.dropZone.addEventListener(eventName, () => doc.dropZone.classList.remove('dragover'), false);
    });

    doc.dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = Array.from(dt.files).filter(file => file.type === 'application/pdf');
        if (files.length > 0) {
            handleFilesSelected(files);
        }
    });

    doc.dropZone.addEventListener('click', () => {
        doc.fileInput.click();
    });

    doc.fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
        if (files.length > 0) {
            handleFilesSelected(files);
        }
    });

    // Settings adjustments (Real-time slider values update)
    doc.colorThreshold.addEventListener('input', (e) => {
        doc.thresholdVal.textContent = e.target.value;
        state.settings.colorThreshold = parseInt(e.target.value);
    });

    doc.minColorPercent.addEventListener('input', (e) => {
        doc.percentVal.textContent = parseFloat(e.target.value).toFixed(2) + '%';
        state.settings.minColorPercent = parseFloat(e.target.value);
    });

    doc.ignoreBackground.addEventListener('change', (e) => {
        state.settings.ignoreBackground = e.target.checked;
    });

    // Price updates (Updates cost instantly)
    doc.priceBW.addEventListener('input', (e) => {
        state.settings.priceBW = parseFloat(e.target.value) || 0;
        recalculateStats();
    });
    
    doc.priceColor.addEventListener('input', (e) => {
        state.settings.priceColor = parseFloat(e.target.value) || 0;
        recalculateStats();
    });

    // Re-run color analysis on cached pixels
    doc.applySettingsBtn.addEventListener('click', () => {
        if (state.pages.length === 0) return;
        reanalyzeCachedPages();
    });

    // Cancel processing
    doc.cancelProcessBtn.addEventListener('click', () => {
        state.cancelRequested = true;
        doc.statusTitle.textContent = 'กำลังยกเลิกการทำงาน...';
    });

    // Clear data
    doc.clearAllBtn.addEventListener('click', clearAllData);

    // Export Report
    doc.exportReportBtn.addEventListener('click', exportReport);

    // QR Code Upload Handlers
    doc.qrPreviewBox.addEventListener('click', () => {
        doc.qrInput.click();
    });

    doc.qrInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                state.qrCodeDataUrl = dataUrl;
                localStorage.setItem('qr_code_data_url', dataUrl);
                updateQrPreviewUI();
            };
            reader.readAsDataURL(file);
        }
    });

    doc.removeQrBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering file input click
        state.qrCodeDataUrl = null;
        localStorage.removeItem('qr_code_data_url');
        doc.qrInput.value = '';
        updateQrPreviewUI();
    });

    // Modal Close
    doc.modalCloseBtn.addEventListener('click', closeModal);
    doc.modalOverlay.addEventListener('click', closeModal);
}

// Handle selected files
function handleFilesSelected(newFiles) {
    if (state.isProcessing) return;
    
    // Add to state files list
    newFiles.forEach(file => {
        if (!state.files.some(f => f.name === file.name && f.size === file.size)) {
            state.files.push(file);
        }
    });
    
    updateQueueUI();
    processFileQueue();
}

// Update file queue sidebar UI
function updateQueueUI() {
    if (state.files.length > 0) {
        doc.fileQueue.classList.remove('hidden');
        doc.queueList.innerHTML = '';
        state.files.forEach((file, index) => {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            const item = document.createElement('div');
            item.className = 'queue-item';
            item.innerHTML = `
                <div class="queue-item-name" title="${file.name}">
                    <i data-lucide="file-text"></i>
                    <span>${file.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="queue-item-size">${sizeMB} MB</span>
                    ${!state.isProcessing ? `<button class="queue-item-remove" onclick="removeQueueItem(${index})"><i data-lucide="trash-2"></i></button>` : ''}
                </div>
            `;
            doc.queueList.appendChild(item);
        });
        initLucide();
    } else {
        doc.fileQueue.classList.add('hidden');
    }
}

// Global removal function for queue items
window.removeQueueItem = function(index) {
    if (state.isProcessing) return;
    
    // Remove all analyzed pages belonging to this file index
    const fileName = state.files[index].name;
    state.pages = state.pages.filter(page => page.fileName !== fileName);
    
    state.files.splice(index, 1);
    updateQueueUI();
    
    if (state.pages.length === 0) {
        clearAllData();
    } else {
        // Redraw grid and stats
        renderPageGrid();
        recalculateStats();
    }
};

// Sequential Processing of PDF Queue
async function processFileQueue() {
    if (state.files.length === 0 || state.isProcessing) return;
    
    state.isProcessing = true;
    state.cancelRequested = false;
    doc.statusAlert.classList.remove('hidden');
    doc.applySettingsBtn.disabled = true;
    doc.clearAllBtn.classList.add('hidden');
    doc.exportReportBtn.classList.add('hidden');
    updateQueueUI(); // Disable remove buttons during process

    // Find which files need processing (we only process files that aren't already in state.pages)
    const processedFileNames = new Set(state.pages.map(p => p.fileName));
    const filesToProcess = state.files.filter(f => !processedFileNames.has(f.name));
    
    if (filesToProcess.length === 0) {
        finishProcessing();
        return;
    }

    // First, count total pages of files to process to set the progress bar
    let totalPagesToProcess = 0;
    const pdfDocs = [];
    
    doc.statusTitle.textContent = 'กำลังโหลดและเตรียมไฟล์...';
    doc.statusDetail.textContent = 'โปรดรอสักครู่ขณะระบบตรวจสอบจำนวนหน้าทั้งหมด';
    
    try {
        for (let i = 0; i < filesToProcess.length; i++) {
            if (state.cancelRequested) break;
            const file = filesToProcess[i];
            const arrayBuffer = await readFileAsArrayBuffer(file);
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            pdfDocs.push({ file, pdf, numPages: pdf.numPages });
            totalPagesToProcess += pdf.numPages;
        }
    } catch (err) {
        console.error("Error pre-loading PDFs:", err);
        alert("ไม่สามารถอ่านไฟล์ PDF บางไฟล์ได้ กรุณาตรวจสอบว่าไฟล์ไม่เสียหายและไม่มีรหัสผ่าน");
        finishProcessing();
        return;
    }

    let pagesProcessed = 0;
    doc.emptyState.classList.add('hidden');
    doc.pageGrid.classList.remove('hidden');

    // Process pages one by one
    for (let docIdx = 0; docIdx < pdfDocs.length; docIdx++) {
        if (state.cancelRequested) break;
        
        const { file, pdf, numPages } = pdfDocs[docIdx];
        
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            if (state.cancelRequested) break;
            
            pagesProcessed++;
            const progress = (pagesProcessed / totalPagesToProcess) * 100;
            
            doc.statusTitle.textContent = `กำลังวิเคราะห์หน้าเอกสาร... (${pagesProcessed}/${totalPagesToProcess})`;
            doc.statusDetail.textContent = `ไฟล์: ${file.name} (หน้า ${pageNum}/${numPages})`;
            doc.progressBar.style.width = `${progress}%`;

            try {
                // Load and analyze the page
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.0 });
                
                // Scale target: render thumbnail at width 150px for fast display & fast color inspection
                const thumbnailWidth = 150;
                const scale = thumbnailWidth / viewport.width;
                const scaledViewport = page.getViewport({ scale: scale });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = scaledViewport.width;
                canvas.height = scaledViewport.height;
                
                await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
                
                // Extract image pixel data
                const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                
                // Color analysis
                const analysis = analyzePageColors(
                    imgData, 
                    state.settings.colorThreshold, 
                    state.settings.minColorPercent, 
                    state.settings.ignoreBackground
                );

                // Create page state record
                const pageId = `${file.name.replace(/[^a-z0-9]/gi, '_')}_${pageNum}_${Date.now()}`;
                const newPage = {
                    id: pageId,
                    fileName: file.name,
                    pageNum: pageNum,
                    width: viewport.width,
                    height: viewport.height,
                    imgData: imgData, // Stored for real-time recalculation
                    isColor: analysis.isColor,
                    colorPercent: analysis.colorPercent,
                    colorPixelCount: analysis.colorPixelCount,
                    userOverride: null // user can change it manually to 'color' or 'bw'
                };

                state.pages.push(newPage);
                
                // Live rendering in the grid
                appendPageToGrid(newPage);
                recalculateStats();
                
            } catch (err) {
                console.error(`Error processing page ${pageNum} of ${file.name}:`, err);
            }
        }
    }

    finishProcessing();
}

// Finish queue process reset UI
function finishProcessing() {
    state.isProcessing = false;
    doc.statusAlert.classList.add('hidden');
    doc.progressBar.style.width = '0%';
    doc.applySettingsBtn.disabled = false;
    
    if (state.pages.length > 0) {
        doc.clearAllBtn.classList.remove('hidden');
        doc.exportReportBtn.classList.remove('hidden');
        doc.exportReportBtn.disabled = false;
    } else {
        doc.emptyState.classList.remove('hidden');
        doc.pageGrid.classList.add('hidden');
    }
    
    updateQueueUI();
    recalculateStats();
}

// Read File as Array Buffer Promise
function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

// Pixel Classification Algorithm
function analyzePageColors(imgData, threshold, minColorPercent, ignoreBackground) {
    const data = imgData.data;
    let colorPixels = 0;
    let validPixels = 0;
    
    // Loop through all pixels (very fast for 150px thumbnails)
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a < 10) continue; // Skip transparency

        // Scanned paper background removal
        if (ignoreBackground) {
            // Check for light cream, yellow, or grey paper backgrounds (high RGB, low saturation)
            if (r > 215 && g > 215 && b > 195) {
                const diffRG = r - g;
                const diffGB = g - b;
                const diffBR = r - b;
                // If they are closely grouped (near-neutral light background)
                if (diffRG < 25 && diffGB < 25 && diffBR < 35) {
                    continue; // Skip background pixel
                }
            }
            // Skip dark noise edges/borders
            if (r < 25 && g < 25 && b < 25) {
                continue;
            }
        }
        
        validPixels++;
        
        // Check RGB channel variance
        const diffRG = Math.abs(r - g);
        const diffGB = Math.abs(g - b);
        const diffBR = Math.abs(b - r);
        const maxDiff = Math.max(diffRG, diffGB, diffBR);
        
        if (maxDiff > threshold) {
            colorPixels++;
        }
    }
    
    const divisor = validPixels > 0 ? validPixels : (data.length / 4);
    const colorPercent = (colorPixels / divisor) * 100;
    const isColor = colorPercent >= minColorPercent;
    
    return {
        isColor,
        colorPercent: parseFloat(colorPercent.toFixed(2)),
        colorPixelCount: colorPixels
    };
}

// Live calculation and UI Stats update
function recalculateStats() {
    let total = state.pages.length;
    let bw = 0;
    let color = 0;
    
    state.pages.forEach(page => {
        // Evaluate classification, respecting user manually toggling
        const isPageColor = page.userOverride !== null 
            ? (page.userOverride === 'color') 
            : page.isColor;
            
        if (isPageColor) {
            color++;
        } else {
            bw++;
        }
    });

    const bwPercent = total > 0 ? Math.round((bw / total) * 100) : 0;
    const colorPercent = total > 0 ? Math.round((color / total) * 100) : 0;
    
    // Calculate estimated printing cost
    const totalCost = (bw * state.settings.priceBW) + (color * state.settings.priceColor);

    // Update UI Stats
    animateCounter(doc.statTotalPages, total);
    doc.statTotalFiles.textContent = `${state.files.length} ไฟล์`;
    
    animateCounter(doc.statBWPages, bw);
    doc.statBWPercent.textContent = `${bwPercent}%`;
    
    animateCounter(doc.statColorPages, color);
    doc.statColorPercent.textContent = `${colorPercent}%`;
    
    doc.statTotalCost.textContent = `฿${totalCost.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Helper to animate counters beautifully
function animateCounter(element, targetValue) {
    const startVal = parseInt(element.textContent) || 0;
    if (startVal === targetValue) {
        element.textContent = targetValue;
        return;
    }
    
    const duration = 400; // ms
    const startTime = performance.now();
    
    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuad = progress * (2 - progress);
        const currentVal = Math.floor(startVal + easeOutQuad * (targetValue - startVal));
        element.textContent = currentVal;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = targetValue;
        }
    }
    requestAnimationFrame(update);
}

// Grid functions
function renderPageGrid() {
    doc.pageGrid.innerHTML = '';
    if (state.pages.length === 0) {
        doc.emptyState.classList.remove('hidden');
        doc.pageGrid.classList.add('hidden');
        return;
    }
    
    doc.emptyState.classList.add('hidden');
    doc.pageGrid.classList.remove('hidden');
    
    state.pages.forEach(page => {
        appendPageToGrid(page);
    });
}

function appendPageToGrid(page) {
    const isPageColor = page.userOverride !== null 
        ? (page.userOverride === 'color') 
        : page.isColor;

    const pageItem = document.createElement('div');
    pageItem.className = `page-item ${isPageColor ? 'page-color' : 'page-bw'}`;
    pageItem.id = `grid-page-${page.id}`;
    
    // Shorten long file names
    let shortName = page.fileName;
    if (shortName.length > 18) {
        shortName = shortName.substring(0, 15) + '...';
    }

    pageItem.innerHTML = `
        <div class="page-thumbnail-wrapper">
            <canvas id="canvas-${page.id}"></canvas>
            <span class="page-number">หน้า ${page.pageNum}</span>
        </div>
        <div class="page-info">
            <span class="page-name" title="${page.fileName}">${shortName}</span>
            <div class="page-badge-wrapper">
                <span class="badge ${isPageColor ? 'badge-color' : 'badge-bw'}" id="badge-${page.id}">
                    ${isPageColor ? 'หน้าสี' : 'ขาวดำ'}
                </span>
            </div>
        </div>
    `;

    // Click handler to open large preview modal
    pageItem.addEventListener('click', (e) => {
        // Prevent toggle if badge clicked directly
        if (e.target.classList.contains('badge')) {
            togglePageClassification(page);
        } else {
            openPreviewModal(page);
        }
    });

    doc.pageGrid.appendChild(pageItem);
    
    // Draw the image data to canvas
    const pageCanvas = document.getElementById(`canvas-${page.id}`);
    if (pageCanvas) {
        pageCanvas.width = page.imgData.width;
        pageCanvas.height = page.imgData.height;
        const ctx = pageCanvas.getContext('2d');
        ctx.putImageData(page.imgData, 0, 0);
    }
}

// Swap classifications on click
function togglePageClassification(page) {
    const currentIsColor = page.userOverride !== null 
        ? (page.userOverride === 'color') 
        : page.isColor;
        
    // Toggle
    page.userOverride = currentIsColor ? 'bw' : 'color';
    
    // Update individual page UI in grid
    updatePageUI(page);
    recalculateStats();
}

function updatePageUI(page) {
    const isPageColor = page.userOverride !== null 
        ? (page.userOverride === 'color') 
        : page.isColor;
        
    const pageItem = document.getElementById(`grid-page-${page.id}`);
    const badge = document.getElementById(`badge-${page.id}`);
    
    if (pageItem && badge) {
        pageItem.className = `page-item ${isPageColor ? 'page-color' : 'page-bw'}`;
        badge.className = `badge ${isPageColor ? 'badge-color' : 'badge-bw'}`;
        badge.textContent = isPageColor ? 'หน้าสี' : 'ขาวดำ';
    }
    
    // Update modal if currently open
    if (doc.previewModal.classList.contains('open') && currentModalPage && currentModalPage.id === page.id) {
        updateModalUI(page);
    }
}

// Re-run classification on cached ImageData (instant!)
function reanalyzeCachedPages() {
    if (state.pages.length === 0) return;
    
    // Visual indicator of refresh
    doc.applySettingsBtn.innerHTML = '<div class="spinner" style="width:14px; height:14px; margin:0; display:inline-block; vertical-align:middle;"></div> กำลังวิเคราะห์ใหม่...';
    doc.applySettingsBtn.disabled = true;

    setTimeout(() => {
        state.pages.forEach(page => {
            // Run analysis again
            const analysis = analyzePageColors(
                page.imgData, 
                state.settings.colorThreshold, 
                state.settings.minColorPercent, 
                state.settings.ignoreBackground
            );
            
            page.isColor = analysis.isColor;
            page.colorPercent = analysis.colorPercent;
            page.colorPixelCount = analysis.colorPixelCount;
            
            // Re-render UI details for this item
            updatePageUI(page);
        });
        
        recalculateStats();
        
        doc.applySettingsBtn.innerHTML = '<i data-lucide="refresh-cw"></i> วิเคราะห์ไฟล์ใหม่อีกครั้ง';
        doc.applySettingsBtn.disabled = false;
        initLucide();
    }, 100);
}

// Clear all data
function clearAllData() {
    state.files = [];
    state.pages = [];
    doc.emptyState.classList.remove('hidden');
    doc.pageGrid.classList.add('hidden');
    doc.pageGrid.innerHTML = '';
    doc.fileQueue.classList.add('hidden');
    doc.queueList.innerHTML = '';
    doc.exportReportBtn.classList.add('hidden');
    doc.clearAllBtn.classList.add('hidden');
    doc.fileInput.value = '';
    
    recalculateStats();
}

// Modal handling
let currentModalPage = null;

function openPreviewModal(page) {
    currentModalPage = page;
    doc.previewModal.classList.add('open');
    
    // Setup Canvas
    doc.modalCanvas.width = page.imgData.width;
    doc.modalCanvas.height = page.imgData.height;
    const ctx = doc.modalCanvas.getContext('2d');
    ctx.putImageData(page.imgData, 0, 0);
    
    // Update Modal Info
    updateModalUI(page);
}

function updateModalUI(page) {
    const isPageColor = page.userOverride !== null 
        ? (page.userOverride === 'color') 
        : page.isColor;
        
    doc.modalPageTitle.textContent = `${page.fileName} (หน้า ${page.pageNum})`;
    
    // Calculate point size (A4 standard: 595 x 842 pt is roughly 8.27 x 11.69 inches)
    const wInch = (page.width / 72).toFixed(2);
    const hInch = (page.height / 72).toFixed(2);
    doc.modalPageSize.textContent = `${Math.round(page.width)} x ${Math.round(page.height)} px (${wInch}" x ${hInch}")`;
    
    doc.modalColorPercent.textContent = `${page.colorPercent}% (${page.colorPixelCount.toLocaleString()} พิกเซล)`;
    
    doc.modalStatusBadge.textContent = isPageColor ? 'หน้าสี (Color)' : 'ขาวดำ (Black & White)';
    doc.modalStatusBadge.className = `info-val badge ${isPageColor ? 'badge-color' : 'badge-bw'}`;
    
    // Swap button icon/text
    doc.modalToggleBtn.innerHTML = `<i data-lucide="shuffle"></i> สลับเป็นหน้า${isPageColor ? 'ขาวดำ' : 'สี'}`;
    initLucide();
}

// Modal Toggle Action
doc.modalToggleBtn.addEventListener('click', () => {
    if (currentModalPage) {
        togglePageClassification(currentModalPage);
    }
});

function closeModal() {
    doc.previewModal.classList.remove('open');
    currentModalPage = null;
}

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Helper to format page numbers into clean ranges (e.g. 1-3, 5, 7-9)
function formatPageRanges(pages) {
    if (!pages || pages.length === 0) return '-';
    const sorted = [...pages].sort((a, b) => a - b);
    const ranges = [];
    let start = sorted[0];
    let end = sorted[0];
    
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === end + 1) {
            end = sorted[i];
        } else {
            if (start === end) {
                ranges.push(`${start}`);
            } else {
                ranges.push(`${start}-${end}`);
            }
            start = sorted[i];
            end = sorted[i];
        }
    }
    if (start === end) {
        ranges.push(`${start}`);
    } else {
        ranges.push(`${start}-${end}`);
    }
    return ranges.join(', ');
}

// Export beautiful printable HTML receipt
function exportReport() {
    if (state.pages.length === 0) return;
    
    // Group pages by file
    const filesMap = new Map();
    state.pages.forEach(page => {
        if (!filesMap.has(page.fileName)) {
            filesMap.set(page.fileName, []);
        }
        filesMap.get(page.fileName).push(page);
    });

    let total = state.pages.length;
    let totalBW = 0;
    let totalColor = 0;
    
    let itemsHTML = '';
    
    for (const [fileName, pages] of filesMap.entries()) {
        pages.sort((a, b) => a.pageNum - b.pageNum);
        const bwPages = [];
        const colorPages = [];
        
        pages.forEach(page => {
            const isPageColor = page.userOverride !== null 
                ? (page.userOverride === 'color') 
                : page.isColor;
            if (isPageColor) {
                colorPages.push(page.pageNum);
            } else {
                bwPages.push(page.pageNum);
            }
        });
        
        const fileBWCount = bwPages.length;
        const fileColorCount = colorPages.length;
        totalBW += fileBWCount;
        totalColor += fileColorCount;
        
        const fileBWCost = fileBWCount * state.settings.priceBW;
        const fileColorCost = fileColorCount * state.settings.priceColor;
        const fileTotalCost = fileBWCost + fileColorCost;
        
        let fileDetailsHTML = '';
        if (fileBWCount > 0) {
            fileDetailsHTML += `
                <div class="detail-row">
                    <span class="detail-label">หน้าขาวดำ: <span class="detail-pages">${formatPageRanges(bwPages)}</span></span>
                    <span class="detail-price">${fileBWCount} หน้า x ฿${state.settings.priceBW.toFixed(2)} = ฿${fileBWCost.toFixed(2)}</span>
                </div>
            `;
        }
        if (fileColorCount > 0) {
            fileDetailsHTML += `
                <div class="detail-row">
                    <span class="detail-label">หน้าสี: <span class="detail-pages">${formatPageRanges(colorPages)}</span></span>
                    <span class="detail-price">${fileColorCount} หน้า x ฿${state.settings.priceColor.toFixed(2)} = ฿${fileColorCost.toFixed(2)}</span>
                </div>
            `;
        }
        
        itemsHTML += `
            <div class="file-item">
                <div class="file-name">${escapeHtml(fileName)}</div>
                ${fileDetailsHTML}
                <div class="file-subtotal">
                    <span>รวมไฟล์นี้: ${pages.length} หน้า</span>
                    <strong>฿${fileTotalCost.toFixed(2)}</strong>
                </div>
            </div>
            <div class="divider-dashed"></div>
        `;
    }
    
    const totalCost = (totalBW * state.settings.priceBW) + (totalColor * state.settings.priceColor);
    const receiptId = 'REC-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
    
    // Create new print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>ใบเสร็จสรุปค่าบริการพิมพ์เอกสาร | PageCounter Pro</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Kanit:wght@300;400;500;600;700&family=Sarabun:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Kanit', 'Sarabun', 'Inter', sans-serif;
                    color: #1e293b;
                    background: #f1f5f9;
                    margin: 0;
                    padding: 30px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    box-sizing: border-box;
                }
                
                /* Action buttons */
                .actions-bar {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 24px;
                    width: 100%;
                    max-width: 480px;
                }
                .btn {
                    padding: 10px 20px;
                    font-family: 'Kanit', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 8px;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .btn-primary {
                    background: linear-gradient(135deg, #0284c7, #2563eb);
                    color: white;
                }
                .btn-primary:hover {
                    background: linear-gradient(135deg, #0369a1, #1d4ed8);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px rgba(2, 132, 199, 0.2);
                }
                .btn-secondary {
                    background: #64748b;
                    color: white;
                }
                .btn-secondary:hover {
                    background: #475569;
                    transform: translateY(-1px);
                }
                
                /* Receipt container */
                .receipt-card {
                    background: #ffffff;
                    max-width: 480px;
                    width: 100%;
                    padding: 40px 35px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0,0,0,0.05);
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    box-sizing: border-box;
                }
                
                /* Logo Header */
                .receipt-header {
                    text-align: center;
                    margin-bottom: 25px;
                }
                .logo-container {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }
                .logo-icon {
                    background: linear-gradient(135deg, #0284c7, #2563eb);
                    color: white;
                    width: 38px;
                    height: 38px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 10px rgba(2, 132, 199, 0.25);
                }
                .logo-icon svg {
                    width: 20px;
                    height: 20px;
                }
                .logo-text {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f172a;
                    letter-spacing: -0.5px;
                    text-align: left;
                }
                .logo-text span {
                    color: #0284c7;
                }
                .receipt-title {
                    font-size: 15px;
                    font-weight: 600;
                    color: #64748b;
                    margin: 6px 0 0 0;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                
                /* Metadata */
                .receipt-metadata {
                    font-size: 13px;
                    color: #64748b;
                    margin-top: 20px;
                    border-top: 1px dashed #cbd5e1;
                    border-bottom: 1px dashed #cbd5e1;
                    padding: 12px 0;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6px;
                }
                .metadata-right {
                    text-align: right;
                }
                
                /* Items Section */
                .section-title {
                    font-size: 13px;
                    font-weight: 700;
                    color: #475569;
                    margin: 25px 0 12px 0;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 6px;
                }
                .file-item {
                    margin-bottom: 16px;
                    text-align: left;
                }
                .file-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #1e293b;
                    word-break: break-all;
                    margin-bottom: 6px;
                    line-height: 1.4;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #475569;
                    margin-bottom: 5px;
                    padding-left: 14px;
                    position: relative;
                }
                .detail-row::before {
                    content: "•";
                    position: absolute;
                    left: 2px;
                    color: #94a3b8;
                }
                .detail-label {
                    display: inline-flex;
                    flex-direction: column;
                }
                .detail-pages {
                    color: #8c9ba5;
                    font-size: 11px;
                    font-weight: 400;
                    margin-top: 2px;
                    word-break: break-all;
                }
                .detail-price {
                    font-weight: 500;
                    color: #0f172a;
                    white-space: nowrap;
                    margin-left: 10px;
                }
                .file-subtotal {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #64748b;
                    margin-top: 6px;
                    padding-left: 14px;
                }
                
                /* Dividers */
                .divider-dashed {
                    border-top: 1px dashed #e2e8f0;
                    margin: 14px 0;
                }
                .divider-double {
                    border-top: 3px double #cbd5e1;
                    margin: 18px 0;
                }
                
                /* Summary Row */
                .total-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #475569;
                    margin-bottom: 6px;
                }
                .total-row.grand-total {
                    font-size: 18px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-top: 12px;
                    margin-bottom: 0;
                    align-items: baseline;
                }
                .grand-total .total-price {
                    color: #0284c7;
                    font-size: 22px;
                    font-weight: 700;
                }
                
                /* Footer */
                .receipt-footer {
                    text-align: center;
                    margin-top: 35px;
                    color: #94a3b8;
                    font-size: 12px;
                }
                .thanks-msg {
                    color: #475569;
                    font-size: 13px;
                    font-weight: 600;
                    margin-bottom: 6px;
                }
                .barcode-placeholder {
                    height: 45px;
                    margin: 20px auto 8px auto;
                    background: repeating-linear-gradient(
                        90deg,
                        #1e293b,
                        #1e293b 2px,
                        transparent 2px,
                        transparent 6px,
                        #1e293b 6px,
                        #1e293b 7px,
                        transparent 7px,
                        transparent 11px,
                        #1e293b 11px,
                        #1e293b 13px,
                        transparent 13px,
                        transparent 16px
                    );
                    width: 70%;
                    opacity: 0.8;
                }
                
                .receipt-qr-code {
                    text-align: center;
                    margin: 20px auto 10px auto;
                }
                .qr-title {
                    font-size: 12px;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 8px;
                }
                .qr-image {
                    width: 140px;
                    height: 140px;
                    border: 1px solid #cbd5e1;
                    padding: 4px;
                    border-radius: 8px;
                    background: white;
                }
                
                @media print {
                    body {
                        background: #ffffff;
                        padding: 0;
                    }
                    .actions-bar {
                        display: none;
                    }
                    .receipt-card {
                        box-shadow: none;
                        border: none;
                        padding: 10px 0;
                        max-width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="actions-bar">
                <button class="btn btn-primary" onclick="window.print()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
                    พิมพ์ใบเสร็จ / บันทึก PDF
                </button>
                <button class="btn btn-secondary" onclick="window.close()">ปิดหน้าต่าง</button>
            </div>
            
            <div class="receipt-card">
                <div class="receipt-header">
                    <div class="logo-container">
                        <div class="logo-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        </div>
                        <div class="logo-text">PageCounter <span>Pro</span></div>
                    </div>
                    <div class="receipt-title">ใบแจ้งหนี้ประเมินราคา / ใบเสร็จ</div>
                </div>
                
                <div class="receipt-metadata">
                    <div><strong>เลขที่ใบเสร็จ:</strong> ${receiptId}</div>
                    <div class="metadata-right"><strong>วันที่:</strong> ${new Date().toLocaleDateString('th-TH', { dateStyle: 'medium' })}</div>
                    <div><strong>เวลา:</strong> ${new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                    <div class="metadata-right"><strong>ผู้ประเมิน:</strong> เจ้าหน้าที่ระบบ</div>
                </div>
                
                <div class="section-title">รายการวิเคราะห์เอกสาร</div>
                
                <div class="items-container">
                    ${itemsHTML}
                </div>
                
                <div class="total-row">
                    <span>จำนวนไฟล์ทั้งหมด:</span>
                    <span>${filesMap.size} ไฟล์</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าขาวดำรวม:</span>
                    <span>${totalBW} หน้า (@ ฿${state.settings.priceBW.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าสีรวม:</span>
                    <span>${totalColor} หน้า (@ ฿${state.settings.priceColor.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าทั้งหมด:</span>
                    <span>${total} หน้า</span>
                </div>
                
                <div class="divider-double"></div>
                
                <div class="total-row grand-total">
                    <span>ยอดสุทธิรวมทั้งสิ้น:</span>
                    <span class="total-price">฿${totalCost.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                
                <div class="receipt-footer">
                    <div class="thanks-msg">ขอบคุณที่ใช้บริการ PageCounter Pro</div>
                    <div>ความถูกต้องผ่านการคำนวณแบบแยกหน้าตามสีพิกเซลจริง</div>
                    ${state.qrCodeDataUrl ? `
                    <div class="receipt-qr-code">
                        <div class="qr-title">สแกนเพื่อชำระเงิน / Scan to Pay</div>
                        <img src="${state.qrCodeDataUrl}" class="qr-image" alt="Payment QR Code">
                    </div>
                    ` : `
                    <div class="barcode-placeholder"></div>
                    <div style="font-size: 10px; margin-top: 5px; color: #cbd5e1;">* ${receiptId} *</div>
                    `}
                </div>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Helper to escape HTML characters to prevent XSS
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
