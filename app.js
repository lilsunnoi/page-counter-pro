// app.js

// --- Custom Confirm Modal Logic ---
function showConfirmModal(title, message, onConfirm) {
    const overlay = document.getElementById('customConfirm');
    const titleEl = document.getElementById('confirmTitle');
    const msgEl = document.getElementById('confirmMessage');
    const btnCancel = document.getElementById('confirmCancelBtn');
    const btnOk = document.getElementById('confirmOkBtn');

    titleEl.textContent = title;
    msgEl.textContent = message;
    
    // Show modal
    overlay.classList.remove('hidden');
    // Force reflow
    void overlay.offsetWidth;
    overlay.classList.add('show');

    // Setup event listeners
    const cleanup = () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.classList.add('hidden'), 300);
        btnCancel.removeEventListener('click', onCancelClick);
        btnOk.removeEventListener('click', onOkClick);
    };

    const onCancelClick = () => {
        cleanup();
    };

    const onOkClick = () => {
        cleanup();
        onConfirm();
    };

    btnCancel.addEventListener('click', onCancelClick);
    btnOk.addEventListener('click', onOkClick);
}

const API_BASE_URL = '/api';
let currentUser = null;
let products = [];
let cart = [];
let salesChartInstance = null;
let latestAdminData = null;

// DOM Elements
const els = {
    loginOverlay: document.getElementById('loginOverlay'),
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    goToRegisterLink: document.getElementById('goToRegisterLink'),
    goToLoginLink: document.getElementById('goToLoginLink'),
    goToRegisterText: document.getElementById('goToRegisterText'),
    goToLoginText: document.getElementById('goToLoginText'),
    loginError: document.getElementById('loginError'),
    registerError: document.getElementById('registerError'),
    registerSuccess: document.getElementById('registerSuccess'),
    
    currentUserBadge: document.getElementById('currentUserBadge'),
    logoutBtn: document.getElementById('logoutBtn'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    
    productGrid: document.getElementById('productGrid'),
    categoryFilters: document.getElementById('categoryFilters'),
    cartItems: document.getElementById('cartItems'),
    emptyCart: document.getElementById('emptyCart'),
    cartTotal: document.getElementById('cartTotal'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    
    // Sidebar Navigation
    navPosBtn: document.getElementById('navPosBtn'),
    navOrdersBtn: document.getElementById('navOrdersBtn'),
    navDashboardBtn: document.getElementById('navDashboardBtn'),
    navProductsBtn: document.getElementById('navProductsBtn'),
    navUsersBtn: document.getElementById('navUsersBtn'),
    
    // Views
    viewPos: document.getElementById('view-pos'),
    viewOrders: document.getElementById('view-orders'),
    viewDashboard: document.getElementById('view-dashboard'),
    viewProducts: document.getElementById('view-products'),
    viewUsers: document.getElementById('view-users'),
    
    // Global Elements inside views
    refreshOrdersBtn: document.getElementById('refreshOrdersBtn'),
    refreshAdminDashboardBtn: document.getElementById('refreshAdminDashboardBtn'),
    btnShowAddProductModal: document.getElementById('btnShowAddProductModal'),
    productModal: document.getElementById('productModal'),
    btnCloseProductModal: document.getElementById('btnCloseProductModal'),
    btnCancelProduct: document.getElementById('btnCancelProduct'),
    productForm: document.getElementById('productForm'),
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

        setupEventListeners();
    checkAuthStatus();
});

// Expose functions globally for inline HTML handlers
window.deleteUser = async function(username) {
    showConfirmModal("ลบผู้ใช้", `คุณต้องการลบพนักงาน "${username}" ใช่หรือไม่?`, async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/admin/users/${username}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requestorUsername: currentUser.username })
            });
            const result = await res.json();
            if (res.ok) {
                fetchAdminData();
            } else {
                alert(result.message || 'เกิดข้อผิดพลาดในการลบผู้ใช้');
            }
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        }
    });
    lucide.createIcons();
};

let selectedUserForPassword = null;
window.openPasswordModal = function(username) {
    selectedUserForPassword = username;
    const overlay = document.getElementById('passwordModal');
    document.getElementById('newPasswordInput').value = '';
    document.getElementById('passwordModalError').classList.add('hidden');
    
    overlay.classList.remove('hidden');
    void overlay.offsetWidth;
    overlay.classList.add('show');
};

function closePasswordModal() {
    const overlay = document.getElementById('passwordModal');
    overlay.classList.remove('show');
    setTimeout(() => overlay.classList.add('hidden'), 300);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('passwordCancelBtn')?.addEventListener('click', closePasswordModal);
    document.getElementById('passwordSaveBtn')?.addEventListener('click', async () => {
        const newPassword = document.getElementById('newPasswordInput').value;
        const errorEl = document.getElementById('passwordModalError');
        
        if (newPassword.length < 4) {
            errorEl.textContent = 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร';
            errorEl.classList.remove('hidden');
            return;
        }
        errorEl.classList.add('hidden');

        try {
            const res = await fetch(`${API_BASE_URL}/admin/users/${selectedUserForPassword}/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    requestorUsername: currentUser.username,
                    newPassword: newPassword
                })
            });
            const result = await res.json();
            if (res.ok) {
                closePasswordModal();
                alert(`เปลี่ยนรหัสผ่านของ "${selectedUserForPassword}" สำเร็จ`);
            } else {
                errorEl.textContent = result.message || 'เกิดข้อผิดพลาด';
                errorEl.classList.remove('hidden');
            }
        } catch (err) {
            console.error('Error updating password:', err);
            errorEl.textContent = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้';
            errorEl.classList.remove('hidden');
        }
    });
    lucide.createIcons();
});


// Setup Event Listeners
function setupEventListeners() {
    // Auth Forms
    els.goToRegisterLink.addEventListener('click', () => toggleForms('register'));
    els.goToLoginLink.addEventListener('click', () => toggleForms('login'));
    els.loginForm.addEventListener('submit', handleLogin);
    els.registerForm.addEventListener('submit', handleRegister);
    els.logoutBtn.addEventListener('click', handleLogout);

    // Theme Toggle
    els.themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
    });

    // Password Visibility Toggles
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => togglePasswordVisibility('loginPassword', 'eyeIcon'));
    }
    const toggleRegPasswordBtn = document.getElementById('toggleRegPasswordBtn');
    if (toggleRegPasswordBtn) {
        toggleRegPasswordBtn.addEventListener('click', () => togglePasswordVisibility('registerPassword', 'regEyeIcon'));
    }

    // POS Filters
    els.categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProducts(e.target.dataset.filter);
        }
    });

    // Checkout
    els.checkoutBtn.addEventListener('click', handleCheckout);

    // Sidebar Navigation
    els.navPosBtn.addEventListener('click', () => switchView('pos'));
    els.navOrdersBtn.addEventListener('click', () => { switchView('orders'); fetchAdminData(); });
    els.navDashboardBtn.addEventListener('click', () => { switchView('dashboard'); fetchAdminData(); });
    els.navProductsBtn.addEventListener('click', () => { switchView('products'); fetchAdminData(); });
    els.navUsersBtn.addEventListener('click', () => { switchView('users'); fetchAdminData(); });
    document.getElementById('exportPdfBtn')?.addEventListener('click', exportDashboardToPDF);
    document.getElementById('btnFilterDashboard')?.addEventListener('click', fetchAdminData);

    // Refresh buttons
    els.refreshOrdersBtn.addEventListener('click', fetchAdminData);
    els.refreshAdminDashboardBtn.addEventListener('click', fetchAdminData);

    // Product Management
    els.btnShowAddProductModal.addEventListener('click', () => openProductModal());
    els.btnCloseProductModal.addEventListener('click', closeProductModal);
    els.btnCancelProduct.addEventListener('click', closeProductModal);
    els.productForm.addEventListener('submit', handleProductFormSubmit);
}

// View Switching Logic
function switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active', 'hidden'));
    document.querySelectorAll('.view-section').forEach(v => v.classList.add('hidden'));
    
    // Deactivate all nav items
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(n => n.classList.remove('active'));

    // Show target view
    if(viewName === 'pos') { els.viewPos.classList.remove('hidden'); els.viewPos.classList.add('active'); els.navPosBtn.classList.add('active'); }
    if(viewName === 'orders') { els.viewOrders.classList.remove('hidden'); els.viewOrders.classList.add('active'); els.navOrdersBtn.classList.add('active'); }
    if(viewName === 'dashboard') { els.viewDashboard.classList.remove('hidden'); els.viewDashboard.classList.add('active'); els.navDashboardBtn.classList.add('active'); }
    if(viewName === 'products') { els.viewProducts.classList.remove('hidden'); els.viewProducts.classList.add('active'); els.navProductsBtn.classList.add('active'); renderAdminProducts(); }
    if(viewName === 'users') { els.viewUsers.classList.remove('hidden'); els.viewUsers.classList.add('active'); els.navUsersBtn.classList.add('active'); }
}

// Authentication
function checkAuthStatus() {
    const savedUser = localStorage.getItem('chatime_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        setupUserSession();
    } else {
        els.loginOverlay.classList.remove('hidden');
    }
}

function setupUserSession() {
    els.loginOverlay.classList.add('hidden');
    els.currentUserBadge.textContent = currentUser.username;
    els.currentUserBadge.classList.remove('hidden');
    els.logoutBtn.classList.remove('hidden');

    if (currentUser.role && currentUser.role.toLowerCase() === 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
    } else {
        document.querySelectorAll('.admin-only').forEach(el => el.classList.add('hidden'));
    }

    fetchProducts();
    switchView('pos'); // Always default to POS on login
}

function handleLogout() {
    showConfirmModal("ออกจากระบบ", "คุณต้องการออกจากระบบใช่หรือไม่?", () => {
        localStorage.removeItem('chatime_user');
        location.reload();
    });
    lucide.createIcons();
}

function toggleForms(formToShow) {
    if (formToShow === 'register') {
        els.loginForm.classList.add('hidden');
        els.goToRegisterText.classList.add('hidden');
        els.registerForm.classList.remove('hidden');
        els.goToLoginText.classList.remove('hidden');
    } else {
        els.registerForm.classList.add('hidden');
        els.goToLoginText.classList.add('hidden');
        els.loginForm.classList.remove('hidden');
        els.goToRegisterText.classList.remove('hidden');
    }
}

function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
}

async function handleLogin(e) {
    e.preventDefault();
    els.loginError.classList.add('hidden');
    const btn = els.loginForm.querySelector('button[type="submit"]');
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('loginUsername').value,
                password: document.getElementById('loginPassword').value
            })
        });

        const data = await response.json();
        if (response.ok) {
            currentUser = { username: data.username, role: data.role, token: data.token };
            localStorage.setItem('chatime_user', JSON.stringify(currentUser));
            setupUserSession();
        } else {
            els.loginError.classList.remove('hidden');
        }
    } catch (error) {
        els.loginError.classList.remove('hidden');
    } finally {
        btn.disabled = false;
    }
}

async function handleRegister(e) {
    e.preventDefault();
    els.registerError.classList.add('hidden');
    els.registerSuccess.classList.add('hidden');

    const pw = document.getElementById('registerPassword').value;
    const confirmPw = document.getElementById('registerConfirmPassword').value;

    if (pw !== confirmPw) {
        document.getElementById('registerErrorText').textContent = 'รหัสผ่านไม่ตรงกัน';
        els.registerError.classList.remove('hidden');
        return;
    }

    const btn = els.registerForm.querySelector('button[type="submit"]');
    btn.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById('registerUsername').value,
                password: pw
            })
        });

        if (response.ok) {
            els.registerSuccess.classList.remove('hidden');
            setTimeout(() => toggleForms('login'), 2000);
        } else {
            const data = await response.json();
            document.getElementById('registerErrorText').textContent = data.message || 'สมัครสมาชิกล้มเหลว';
            els.registerError.classList.remove('hidden');
        }
    } catch (error) {
        document.getElementById('registerErrorText').textContent = 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้';
        els.registerError.classList.remove('hidden');
    } finally {
        btn.disabled = false;
    }
}

// Products & POS
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        products = await response.json();
        renderProducts('all');
    } catch (error) {
        els.productGrid.innerHTML = '<div class="error">ไม่สามารถดึงข้อมูลเมนูได้</div>';
    }
}

function renderProducts(filter) {
    els.productGrid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image_url}" alt="${p.name}" class="product-img">
            <div class="product-info">
                <span class="product-category">${p.category}</span>
                <span class="product-title">${p.name}</span>
                <span class="product-price">฿${parseFloat(p.price).toFixed(2)}</span>
            </div>
        `;
        card.addEventListener('click', (e) => addToCart(p, e));
        els.productGrid.appendChild(card);
    });
    lucide.createIcons();
}

function addToCart(product, event) {
    const existing = cart.find(item => item.product_id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, product_id: product.id, quantity: 1 });
    }
    renderCart();

    if (event) {
        const cartPanel = document.querySelector('.cart-panel');
        const imgElement = event.currentTarget.querySelector('.product-img');
        if (cartPanel && imgElement) {
            const flyingImg = imgElement.cloneNode();
            flyingImg.className = 'flying-item';
            
            const rect = imgElement.getBoundingClientRect();
            flyingImg.style.left = `${rect.left}px`;
            flyingImg.style.top = `${rect.top}px`;
            flyingImg.style.width = `${rect.width}px`;
            flyingImg.style.height = `${rect.height}px`;
            
            document.body.appendChild(flyingImg);
            
            // Force reflow to ensure initial styles are applied before transitioning
            void flyingImg.offsetWidth;
            
            const targetRect = cartPanel.getBoundingClientRect();
            const destX = targetRect.left + (targetRect.width / 2) - (rect.left + rect.width / 2);
            const destY = targetRect.top + 50 - (rect.top + rect.height / 2);
            
            requestAnimationFrame(() => {
                flyingImg.style.transform = `translate(${destX}px, ${destY}px) scale(0.2)`;
                flyingImg.style.opacity = '0.3';
            });
            
            setTimeout(() => {
                if (flyingImg.parentNode) {
                    flyingImg.parentNode.removeChild(flyingImg);
                }
                const cartCard = document.querySelector('.cart-card');
                if (cartCard) {
                    cartCard.classList.remove('cart-bounce');
                    void cartCard.offsetWidth;
                    cartCard.classList.add('cart-bounce');
                }
            }, 600);
        }
    }
}

function updateCartQty(id, change) {
    const item = cart.find(item => item.product_id === id);
    if (item) {
        if (item.quantity + change <= 0) {
            showConfirmModal("ลบสินค้า", `คุณต้องการลบ "${item.name}" ออกจากตะกร้าใช่หรือไม่?`, () => {
                cart = cart.filter(i => i.product_id !== id);
                renderCart();
            });
        } else {
            item.quantity += change;
            renderCart();
        }
    }
}

function renderCart() {
    if (cart.length === 0) {
        els.cartItems.innerHTML = '';
        els.cartItems.appendChild(els.emptyCart);
        els.cartTotal.textContent = '฿0.00';
        els.checkoutBtn.disabled = true;
        return;
    }

    els.cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="cart-item-header">
                <span>${item.name}</span>
            </div>
            <div class="cart-item-actions">
                <div class="qty-control">
                    <button class="qty-btn" onclick="updateCartQty(${item.product_id}, -1)">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty(${item.product_id}, 1)">+</button>
                </div>
                <span class="item-total">฿${subtotal.toFixed(2)}</span>
            </div>
        `;
        els.cartItems.appendChild(el);
    });

    els.cartTotal.textContent = `฿${total.toFixed(2)}`;
    els.checkoutBtn.disabled = false;
    
    // Attach functions to window so inline onclick works
    window.updateCartQty = updateCartQty;
}

async function handleCheckout() {
    els.checkoutBtn.disabled = true;
    els.checkoutBtn.innerHTML = '<i data-lucide="loader"></i> กำลังชำระเงิน...';
    lucide.createIcons();

    const total_amount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderData = {
        username: currentUser.username,
        total_amount: total_amount,
        items: cart.map(i => ({
            product_id: i.product_id,
            quantity: i.quantity,
            price: i.price
        }))
    };

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert('ชำระเงินสำเร็จ!');
            cart = [];
            renderCart();
        } else {
            alert('เกิดข้อผิดพลาดในการบันทึกออเดอร์');
        }
    } catch (error) {
        alert('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้');
    } finally {
        els.checkoutBtn.innerHTML = '<i data-lucide="credit-card"></i> ชำระเงิน (Checkout)';
        lucide.createIcons();
        els.checkoutBtn.disabled = cart.length === 0;
    }
}

// Admin Dashboard
// Functions openAdminDashboard and switchTab removed in favor of switchView.

async function fetchAdminData() {
    try {
        const payload = { requestorUsername: currentUser.username };
        const startDateEl = document.getElementById('filterStartDate');
        const endDateEl = document.getElementById('filterEndDate');
        
        if (startDateEl && endDateEl && startDateEl.value && endDateEl.value) {
            payload.start_date = startDateEl.value;
            payload.end_date = endDateEl.value;
        }

        const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            const data = await response.json();
            latestAdminData = data;
            renderAdminDashboard(data);
        }
    } catch (e) {
        console.error('Failed to fetch admin data', e);
    }
}

function renderAdminDashboard(data) {
    // Stats
    document.getElementById('adminTodayOrders').textContent = data.stats.todayOrders;
    document.getElementById('adminTodayRevenue').textContent = `฿${parseFloat(data.stats.todayRevenue).toFixed(2)}`;
    document.getElementById('adminTotalOrders').textContent = data.stats.totalOrders;
    document.getElementById('adminTotalRevenue').textContent = `฿${parseFloat(data.stats.totalRevenue).toFixed(2)}`;

    // Chart
    renderChartJS(data.chartData);

    // Orders Table
    const tbodyOrders = document.getElementById('adminOrdersTableBody');
    tbodyOrders.innerHTML = '';
    if (data.recentOrders.length === 0) {
        tbodyOrders.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-muted">ไม่มีประวัติออเดอร์</td></tr>';
    } else {
        data.recentOrders.forEach(o => {
            const date = new Date(o.created_at).toLocaleString('th-TH');
            tbodyOrders.innerHTML += `
                <tr>
                    <td>${date}</td>
                    <td>${o.username}</td>
                    <td>${o.items_count} แก้ว</td>
                    <td class="text-gradient font-bold">฿${parseFloat(o.total_amount).toFixed(2)}</td>
                </tr>
            `;
        });
    }

    // Users Table
    const tbodyUsers = document.getElementById('adminUsersTableBody');
    tbodyUsers.innerHTML = '';
    data.users.forEach(u => {
        const date = new Date(u.createdAt).toLocaleDateString('th-TH');
        const roleBadge = u.role === 'admin' ? '<span class="user-badge" style="background:#fef3c7;color:#b45309">Admin</span>' : 'พนักงาน';
        
        let actionsHtml = '';
        if (u.role !== 'admin') {
            actionsHtml = `
                <div class="flex gap-2 justify-end">
                    <button class="btn btn-sm" style="background:#f1f5f9;color:#475569" onclick="openPasswordModal('${u.username}')">
                        <i data-lucide="key" style="width:14px;height:14px;"></i> รหัสผ่าน
                    </button>
                    <button class="btn btn-sm" style="background:#fee2e2;color:#ef4444" onclick="deleteUser('${u.username}')">
                        <i data-lucide="trash-2" style="width:14px;height:14px;"></i> ลบ
                    </button>
                </div>
            `;
        } else {
            actionsHtml = '<div class="text-right text-muted text-sm">-</div>';
        }

        tbodyUsers.innerHTML += `
            <tr>
                <td>${u.username}</td>
                <td>${roleBadge}</td>
                <td>${date}</td>
                <td class="text-right">${actionsHtml}</td>
            </tr>
        `;
    });
    lucide.createIcons();
}

function renderChartJS(chartData) {
    const ctx = document.getElementById('salesChart');
    if (salesChartInstance) {
        salesChartInstance.destroy();
    }
    
    // Reverse to show oldest to newest (left to right)
    chartData.reverse();

    const labels = chartData.map(d => d.date);
    const data = chartData.map(d => d.total);

    const isDark = document.body.classList.contains('dark-theme');
    const textColor = isDark ? '#f8fafc' : '#1e293b';

    salesChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'ยอดขาย (บาท)',
                data: data,
                backgroundColor: '#10b981',
                borderRadius: 4,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: textColor } }
            },
            scales: {
                y: { ticks: { color: textColor }, grid: { color: isDark ? '#334155' : '#e2e8f0' } },
                x: { ticks: { color: textColor }, grid: { display: false } }
            }
        }
    });
    lucide.createIcons();
}

function renderAdminProducts() {
    const tbody = document.getElementById('adminProductsTableBody');
    tbody.innerHTML = '';
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-muted">ไม่มีข้อมูลสินค้า</td></tr>';
        return;
    }

    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image_url || '/images/default.png'}" class="product-img-thumbnail" alt="${p.name}"></td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>฿${parseFloat(p.price).toFixed(2)}</td>
            <td>
                <button class="btn btn-primary edit-product-btn" data-id="${p.id}" style="padding: 0.25rem 0.5rem; font-size: 0.875rem;">
                    แก้ไข
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelectorAll('.edit-product-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            openProductModal(parseInt(e.target.dataset.id));
        });
    });
    lucide.createIcons();
}

function openProductModal(productId = null) {
    const form = els.productForm;
    document.getElementById('productId').value = '';
    form.reset();
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            document.getElementById('productModalTitle').textContent = 'แก้ไขสินค้า';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = parseFloat(product.price).toFixed(2);
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productImage').value = product.image_url || '';
        }
    } else {
        document.getElementById('productModalTitle').textContent = 'เพิ่มสินค้า';
    }
    
    els.productModal.classList.add('show');
    lucide.createIcons();
}

function closeProductModal() {
    els.productModal.classList.remove('show');
}

async function handleProductFormSubmit(e) {
    e.preventDefault();
    const btn = els.productForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    
    const id = document.getElementById('productId').value;
    const isEdit = !!id;
    const url = isEdit ? `${API_BASE_URL}/products/${id}` : `${API_BASE_URL}/products`;
    const method = isEdit ? 'PUT' : 'POST';
    
    const payload = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        category: document.getElementById('productCategory').value,
        image_url: document.getElementById('productImage').value
    };
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            closeProductModal();
            await fetchProducts(); // Refreshes POS grid and updates `products` array
            if (!els.tabProductsContent.classList.contains('hidden')) {
                renderAdminProducts(); // Re-render table if on products tab
            }
        } else {
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    } catch (error) {
        alert('เชื่อมต่อระบบไม่ได้');
    } finally {
        btn.disabled = false;
    }
}

// ==========================================
// Chatbot Logic
// ==========================================

const chatToggle = document.getElementById('chatbot-toggle');
const chatWindow = document.getElementById('chatbot-window');
const chatClose = document.getElementById('chatbot-close');
const chatInput = document.getElementById('chatbot-input');
const chatSend = document.getElementById('chatbot-send');
const chatMessages = document.getElementById('chatbot-messages');

if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.remove('hidden');
        chatInput.focus();
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    chatSend.addEventListener('click', handleChatSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
    });
    lucide.createIcons();
}

function handleChatSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    appendChatMessage(text, 'user-message');
    chatInput.value = '';
    
    // Simple bot logic
    setTimeout(() => {
        generateBotResponse(text);
    }, 500);
}

function appendChatMessage(text, className) {
    const msg = document.createElement('div');
    msg.className = `message ${className}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function generateBotResponse(text) {
    const typingId = 'typing-' + Date.now();
    
    // Create typing indicator manually to add ID easily
    const typingMsg = document.createElement('div');
    typingMsg.className = 'message bot-message';
    typingMsg.id = typingId;
    typingMsg.textContent = 'กำลังพิมพ์...';
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        
        const data = await response.json();
        
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        if (data.success && data.reply) {
            appendChatMessage(data.reply, 'bot-message');
        } else {
            appendChatMessage(data.message || 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ AI', 'bot-message');
        }
    } catch (error) {
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();
        
        appendChatMessage('ระบบ AI ขัดข้อง ไม่สามารถติดต่อเซิร์ฟเวอร์ได้', 'bot-message');
    }
}


function exportDashboardToPDF() {
    if (!latestAdminData) {
        alert('กรุณารอสักครู่ กำลังโหลดข้อมูล...');
        return;
    }

    const { stats, recentOrders } = latestAdminData;
    
    // Create a temporary container for the PDF content
    const container = document.createElement('div');
    container.style.padding = '30px';
    container.style.fontFamily = 'Kanit, sans-serif';
    container.style.color = '#1e293b';
    container.style.background = '#ffffff';
    
    // Header
    const dateStr = new Date().toLocaleString('th-TH');
    const startDateEl = document.getElementById('filterStartDate');
    const endDateEl = document.getElementById('filterEndDate');
    let periodStr = '';
    
    if (startDateEl && endDateEl && startDateEl.value && endDateEl.value) {
        const sd = new Date(startDateEl.value).toLocaleDateString('th-TH');
        const ed = new Date(endDateEl.value).toLocaleDateString('th-TH');
        periodStr = `<p style="text-align: center; color: #4f46e5; margin-bottom: 5px; font-weight: 500;">ข้อมูลประจำวันที่: ${sd} ถึง ${ed}</p>`;
    }

    let html = `
        <h2 style="text-align: center; color: #0f172a; margin-bottom: 5px;">สรุปยอดขาย (Dashboard Report)</h2>
        ${periodStr}
        <p style="text-align: center; color: #64748b; margin-bottom: 30px;">พิมพ์เมื่อ: ${dateStr}</p>
        
        <div style="display: flex; gap: 20px; margin-bottom: 30px;">
            <div style="flex: 1; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">ยอดขายวันนี้ (บิล)</p>
                <h3 style="margin: 5px 0 0 0; color: #0f172a; font-size: 24px;">${stats.todayOrders}</h3>
            </div>
            <div style="flex: 1; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">รายได้วันนี้</p>
                <h3 style="margin: 5px 0 0 0; color: #10b981; font-size: 24px;">฿${parseFloat(stats.todayRevenue).toFixed(2)}</h3>
            </div>
            <div style="flex: 1; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">ออเดอร์รวมทั้งหมด</p>
                <h3 style="margin: 5px 0 0 0; color: #0f172a; font-size: 24px;">${stats.totalOrders}</h3>
            </div>
            <div style="flex: 1; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 14px;">รายได้รวมทั้งหมด</p>
                <h3 style="margin: 5px 0 0 0; color: #8b5cf6; font-size: 24px;">฿${parseFloat(stats.totalRevenue).toFixed(2)}</h3>
            </div>
        </div>
        
        <h3 style="color: #0f172a; margin-bottom: 15px;">ตารางรายการสั่งซื้อล่าสุด</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px;">
            <thead>
                <tr style="background-color: #f1f5f9;">
                    <th style="padding: 10px; border-bottom: 2px solid #cbd5e1;">เวลาสั่งซื้อ</th>
                    <th style="padding: 10px; border-bottom: 2px solid #cbd5e1;">พนักงาน</th>
                    <th style="padding: 10px; border-bottom: 2px solid #cbd5e1;">จำนวนแก้ว</th>
                    <th style="padding: 10px; border-bottom: 2px solid #cbd5e1;">ยอดชำระ</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (recentOrders.length === 0) {
        html += `<tr><td colspan="4" style="padding: 15px; text-align: center; border-bottom: 1px solid #e2e8f0;">ไม่มีข้อมูล</td></tr>`;
    } else {
        recentOrders.forEach(o => {
            const rowDate = new Date(o.created_at).toLocaleString('th-TH');
            html += `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${rowDate}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${o.username}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${o.items_count}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">฿${parseFloat(o.total_amount).toFixed(2)}</td>
                </tr>
            `;
        });
    }

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

    // Use html2pdf
    const opt = {
        margin:       10,
        filename:     'dashboard_report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(container).save();
}

