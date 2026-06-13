(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";const n={theme:"dark",isAuthenticated:!1,userRole:"user",files:[],pages:[],isProcessing:!1,cancelRequested:!1,qrCodeDataUrl:null,settings:{colorThreshold:18,minColorPercent:.3,ignoreBackground:!0,priceBW:1,priceColor:5}},e={body:document.body,themeToggleBtn:document.getElementById("themeToggleBtn"),dropZone:document.getElementById("dropZone"),fileInput:document.getElementById("fileInput"),fileQueue:document.getElementById("fileQueue"),queueList:document.getElementById("queueList"),statusAlert:document.getElementById("statusAlert"),statusTitle:document.getElementById("statusTitle"),statusDetail:document.getElementById("statusDetail"),progressBar:document.getElementById("progressBar"),cancelProcessBtn:document.getElementById("cancelProcessBtn"),colorThreshold:document.getElementById("colorThreshold"),minColorPercent:document.getElementById("minColorPercent"),ignoreBackground:document.getElementById("ignoreBackground"),thresholdVal:document.getElementById("thresholdVal"),percentVal:document.getElementById("percentVal"),priceBW:document.getElementById("priceBW"),priceColor:document.getElementById("priceColor"),applySettingsBtn:document.getElementById("applySettingsBtn"),qrInput:document.getElementById("qrInput"),qrPreviewBox:document.getElementById("qrPreviewBox"),removeQrBtn:document.getElementById("removeQrBtn"),statTotalPages:document.getElementById("statTotalPages"),statTotalFiles:document.getElementById("statTotalFiles"),statBWPages:document.getElementById("statBWPages"),statBWPercent:document.getElementById("statBWPercent"),statColorPages:document.getElementById("statColorPages"),statColorPercent:document.getElementById("statColorPercent"),statTotalCost:document.getElementById("statTotalCost"),emptyState:document.getElementById("emptyState"),pageGrid:document.getElementById("pageGrid"),exportReportBtn:document.getElementById("exportReportBtn"),clearAllBtn:document.getElementById("clearAllBtn"),previewModal:document.getElementById("previewModal"),modalOverlay:document.getElementById("modalOverlay"),modalCloseBtn:document.getElementById("modalCloseBtn"),modalCanvas:document.getElementById("modalCanvas"),modalPageTitle:document.getElementById("modalPageTitle"),modalPageSize:document.getElementById("modalPageSize"),modalColorPercent:document.getElementById("modalColorPercent"),modalStatusBadge:document.getElementById("modalStatusBadge"),modalToggleBtn:document.getElementById("modalToggleBtn"),loginOverlay:document.getElementById("loginOverlay"),loginCard:document.getElementById("loginCard"),loginTitle:document.getElementById("loginTitle"),loginSubtitle:document.getElementById("loginSubtitle"),loginForm:document.getElementById("loginForm"),loginUsername:document.getElementById("loginUsername"),loginPassword:document.getElementById("loginPassword"),togglePasswordBtn:document.getElementById("togglePasswordBtn"),eyeIcon:document.getElementById("eyeIcon"),rememberMe:document.getElementById("rememberMe"),loginError:document.getElementById("loginError"),logoutBtn:document.getElementById("logoutBtn"),registerForm:document.getElementById("registerForm"),registerUsername:document.getElementById("registerUsername"),registerPassword:document.getElementById("registerPassword"),registerConfirmPassword:document.getElementById("registerConfirmPassword"),toggleRegPasswordBtn:document.getElementById("toggleRegPasswordBtn"),regEyeIcon:document.getElementById("regEyeIcon"),registerError:document.getElementById("registerError"),registerErrorText:document.getElementById("registerErrorText"),registerSuccess:document.getElementById("registerSuccess"),goToRegisterLink:document.getElementById("goToRegisterLink"),goToLoginLink:document.getElementById("goToLoginLink"),goToRegisterText:document.getElementById("goToRegisterText"),goToLoginText:document.getElementById("goToLoginText"),logoutModal:document.getElementById("logoutModal"),logoutModalOverlay:document.getElementById("logoutModalOverlay"),cancelLogoutBtn:document.getElementById("cancelLogoutBtn"),confirmLogoutBtn:document.getElementById("confirmLogoutBtn"),adminDashboardBtn:document.getElementById("adminDashboardBtn"),adminDashboardModal:document.getElementById("adminDashboardModal"),adminDashboardModalOverlay:document.getElementById("adminDashboardModalOverlay"),adminDashboardModalCloseBtn:document.getElementById("adminDashboardModalCloseBtn"),refreshAdminDashboardBtn:document.getElementById("refreshAdminDashboardBtn"),adminTotalFiles:document.getElementById("adminTotalFiles"),adminTotalPages:document.getElementById("adminTotalPages"),adminTotalRevenue:document.getElementById("adminTotalRevenue"),adminTotalUsers:document.getElementById("adminTotalUsers"),tabLogsBtn:document.getElementById("tabLogsBtn"),tabUsersBtn:document.getElementById("tabUsersBtn"),tabLogsContent:document.getElementById("tabLogsContent"),tabUsersContent:document.getElementById("tabUsersContent"),adminLogsTableBody:document.getElementById("adminLogsTableBody"),adminUsersTableBody:document.getElementById("adminUsersTableBody")};document.addEventListener("DOMContentLoaded",()=>{j(),W(),Q(),H(),L()});function L(){window.lucide&&window.lucide.createIcons()}function H(){const t=localStorage.getItem("qr_code_data_url");t&&(n.qrCodeDataUrl=t,S())}function S(){n.qrCodeDataUrl?(e.qrPreviewBox.innerHTML=`<img src="${n.qrCodeDataUrl}" class="qr-preview-img" alt="QR Code Preview">`,e.removeQrBtn.classList.remove("hidden")):(e.qrPreviewBox.innerHTML=`
            <i data-lucide="qr-code" class="qr-placeholder-icon"></i>
            <span class="qr-upload-text">คลิกเพื่ออัปโหลด QR Code</span>
        `,e.removeQrBtn.classList.add("hidden"),L())}function W(){localStorage.getItem("is_authenticated")==="true"||sessionStorage.getItem("is_authenticated")==="true"?(n.isAuthenticated=!0,n.userRole=localStorage.getItem("user_role")||sessionStorage.getItem("user_role")||"user",e.loginOverlay.classList.add("hidden"),e.logoutBtn.classList.remove("hidden"),n.userRole==="admin"?e.adminDashboardBtn.classList.remove("hidden"):e.adminDashboardBtn.classList.add("hidden")):(n.isAuthenticated=!1,n.userRole="user",e.loginOverlay.classList.remove("hidden"),e.logoutBtn.classList.add("hidden"),e.adminDashboardBtn.classList.add("hidden"))}function j(){const t=localStorage.getItem("theme");t?n.theme=t:window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches&&(n.theme="light"),R()}function R(){n.theme==="light"?(e.body.classList.remove("dark-theme"),e.body.classList.add("light-theme")):(e.body.classList.remove("light-theme"),e.body.classList.add("dark-theme")),localStorage.setItem("theme",n.theme)}function Q(){e.themeToggleBtn.addEventListener("click",()=>{n.theme=n.theme==="dark"?"light":"dark",R()}),e.loginForm.addEventListener("submit",async o=>{o.preventDefault();const s=e.loginUsername.value.trim(),d=e.loginPassword.value;try{const l=await fetch("http://localhost:5000/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:s,password:d})}),c=await l.json();l.ok?(n.isAuthenticated=!0,n.userRole=c.role||"user",e.loginError.classList.add("hidden"),e.rememberMe.checked?(localStorage.setItem("is_authenticated","true"),localStorage.setItem("current_username",s),localStorage.setItem("user_role",n.userRole)):(sessionStorage.setItem("is_authenticated","true"),sessionStorage.setItem("current_username",s),sessionStorage.setItem("user_role",n.userRole)),n.userRole==="admin"?e.adminDashboardBtn.classList.remove("hidden"):e.adminDashboardBtn.classList.add("hidden"),e.loginOverlay.classList.add("hidden"),e.logoutBtn.classList.remove("hidden"),e.loginUsername.value="",e.loginPassword.value=""):(e.loginError.querySelector("span").textContent=c.message||"ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง!",e.loginError.classList.remove("hidden"),e.loginCard.classList.add("shake"),setTimeout(()=>{e.loginCard.classList.remove("shake")},400))}catch(l){console.error("Login error:",l),e.loginError.querySelector("span").textContent="ไม่สามารถเชื่อมต่อฐานข้อมูลเซิร์ฟเวอร์ได้",e.loginError.classList.remove("hidden"),e.loginCard.classList.add("shake"),setTimeout(()=>{e.loginCard.classList.remove("shake")},400)}}),e.togglePasswordBtn.addEventListener("click",()=>{const o=e.loginPassword.getAttribute("type")==="password"?"text":"password";e.loginPassword.setAttribute("type",o),o==="text"?e.eyeIcon.setAttribute("data-lucide","eye-off"):e.eyeIcon.setAttribute("data-lucide","eye"),L()}),e.toggleRegPasswordBtn.addEventListener("click",()=>{const s=e.registerPassword.getAttribute("type")==="password"?"text":"password";e.registerPassword.setAttribute("type",s),e.registerConfirmPassword.setAttribute("type",s),s==="text"?e.regEyeIcon.setAttribute("data-lucide","eye-off"):e.regEyeIcon.setAttribute("data-lucide","eye"),L()}),e.logoutBtn.addEventListener("click",()=>{e.logoutModal.classList.add("open")});const t=()=>{e.logoutModal.classList.remove("open")};e.cancelLogoutBtn.addEventListener("click",t),e.logoutModalOverlay.addEventListener("click",t),e.confirmLogoutBtn.addEventListener("click",()=>{n.isAuthenticated=!1,n.userRole="user",localStorage.removeItem("is_authenticated"),localStorage.removeItem("current_username"),localStorage.removeItem("user_role"),sessionStorage.removeItem("is_authenticated"),sessionStorage.removeItem("current_username"),sessionStorage.removeItem("user_role"),e.loginOverlay.classList.remove("hidden"),e.logoutBtn.classList.add("hidden"),e.adminDashboardBtn.classList.add("hidden"),$(),t()}),e.goToRegisterLink.addEventListener("click",()=>{e.loginForm.classList.add("hidden"),e.registerForm.classList.remove("hidden"),e.goToRegisterText.classList.add("hidden"),e.goToLoginText.classList.remove("hidden"),e.loginTitle.innerHTML="สมัครสมาชิก <span>Pro</span>",e.loginSubtitle.textContent="สร้างบัญชีผู้ใช้ใหม่สำหรับประเมินหน้าเอกสาร",e.loginError.classList.add("hidden"),e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden")}),e.goToLoginLink.addEventListener("click",()=>{e.registerForm.classList.add("hidden"),e.loginForm.classList.remove("hidden"),e.goToLoginText.classList.add("hidden"),e.goToRegisterText.classList.remove("hidden"),e.loginTitle.innerHTML="PageCounter <span>Pro</span>",e.loginSubtitle.textContent="เข้าสู่ระบบเพื่อใช้งานระบบแยกหน้าเอกสาร",e.loginError.classList.add("hidden"),e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden")}),e.registerForm.addEventListener("submit",async o=>{o.preventDefault();const s=e.registerUsername.value.trim(),d=e.registerPassword.value,l=e.registerConfirmPassword.value;if(e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden"),s.length<3){a("ชื่อผู้ใช้งานต้องมีความยาวอย่างน้อย 3 ตัวอักษร");return}if(d.length<6){a("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");return}if(d!==l){a("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");return}try{const c=await fetch("http://localhost:5000/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:s,password:d})}),g=await c.json();c.ok?(e.registerSuccess.classList.remove("hidden"),e.registerUsername.value="",e.registerPassword.value="",e.registerConfirmPassword.value="",setTimeout(()=>{e.goToLoginLink.click(),e.loginUsername.value=s,e.loginPassword.focus()},1500)):a(g.message||"เกิดข้อผิดพลาดในการลงทะเบียน")}catch(c){console.error("Registration error:",c),a("ไม่สามารถเชื่อมต่อฐานข้อมูลเซิร์ฟเวอร์ได้")}});function a(o){e.registerErrorText.textContent=o,e.registerError.classList.remove("hidden"),e.loginCard.classList.add("shake"),setTimeout(()=>{e.loginCard.classList.remove("shake")},400)}const i=o=>{o.preventDefault(),o.stopPropagation()};["dragenter","dragover","dragleave","drop"].forEach(o=>{e.dropZone.addEventListener(o,i,!1)}),["dragenter","dragover"].forEach(o=>{e.dropZone.addEventListener(o,()=>e.dropZone.classList.add("dragover"),!1)}),["dragleave","drop"].forEach(o=>{e.dropZone.addEventListener(o,()=>e.dropZone.classList.remove("dragover"),!1)}),e.dropZone.addEventListener("drop",o=>{const s=o.dataTransfer,d=Array.from(s.files).filter(l=>l.type==="application/pdf");d.length>0&&F(d)}),e.dropZone.addEventListener("click",()=>{e.fileInput.click()}),e.fileInput.addEventListener("change",o=>{const s=Array.from(o.target.files).filter(d=>d.type==="application/pdf");s.length>0&&F(s)}),e.colorThreshold.addEventListener("input",o=>{e.thresholdVal.textContent=o.target.value,n.settings.colorThreshold=parseInt(o.target.value)}),e.minColorPercent.addEventListener("input",o=>{e.percentVal.textContent=parseFloat(o.target.value).toFixed(2)+"%",n.settings.minColorPercent=parseFloat(o.target.value)}),e.ignoreBackground.addEventListener("change",o=>{n.settings.ignoreBackground=o.target.checked}),e.priceBW.addEventListener("input",o=>{n.settings.priceBW=parseFloat(o.target.value)||0,B()}),e.priceColor.addEventListener("input",o=>{n.settings.priceColor=parseFloat(o.target.value)||0,B()}),e.applySettingsBtn.addEventListener("click",()=>{n.pages.length!==0&&J()}),e.cancelProcessBtn.addEventListener("click",()=>{n.cancelRequested=!0,e.statusTitle.textContent="กำลังยกเลิกการทำงาน..."}),e.clearAllBtn.addEventListener("click",$),e.exportReportBtn.addEventListener("click",Y),e.qrPreviewBox.addEventListener("click",()=>{e.qrInput.click()}),e.qrInput.addEventListener("change",o=>{const s=o.target.files[0];if(s){const d=new FileReader;d.onload=l=>{const c=l.target.result;n.qrCodeDataUrl=c,localStorage.setItem("qr_code_data_url",c),S()},d.readAsDataURL(s)}}),e.removeQrBtn.addEventListener("click",o=>{o.stopPropagation(),n.qrCodeDataUrl=null,localStorage.removeItem("qr_code_data_url"),e.qrInput.value="",S()}),e.modalCloseBtn.addEventListener("click",D),e.modalOverlay.addEventListener("click",D),e.adminDashboardBtn.addEventListener("click",X);const r=()=>{e.adminDashboardModal.classList.remove("open")};e.adminDashboardModalCloseBtn.addEventListener("click",r),e.adminDashboardModalOverlay.addEventListener("click",r),e.refreshAdminDashboardBtn.addEventListener("click",z),e.tabLogsBtn.addEventListener("click",()=>{e.tabLogsBtn.classList.add("active"),e.tabUsersBtn.classList.remove("active"),e.tabLogsContent.classList.remove("hidden"),e.tabUsersContent.classList.add("hidden")}),e.tabUsersBtn.addEventListener("click",()=>{e.tabUsersBtn.classList.add("active"),e.tabLogsBtn.classList.remove("active"),e.tabUsersContent.classList.remove("hidden"),e.tabLogsContent.classList.add("hidden")})}function F(t){n.isProcessing||(t.forEach(a=>{n.files.some(i=>i.name===a.name&&i.size===a.size)||n.files.push(a)}),P(),G())}function P(){n.files.length>0?(e.fileQueue.classList.remove("hidden"),e.queueList.innerHTML="",n.files.forEach((t,a)=>{const i=(t.size/1048576).toFixed(2),r=document.createElement("div");r.className="queue-item",r.innerHTML=`
                <div class="queue-item-name" title="${t.name}">
                    <i data-lucide="file-text"></i>
                    <span>${t.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="queue-item-size">${i} MB</span>
                    ${n.isProcessing?"":`<button class="queue-item-remove" onclick="removeQueueItem(${a})"><i data-lucide="trash-2"></i></button>`}
                </div>
            `,e.queueList.appendChild(r)}),L()):e.fileQueue.classList.add("hidden")}window.removeQueueItem=function(t){if(n.isProcessing)return;const a=n.files[t].name;n.pages=n.pages.filter(i=>i.fileName!==a),n.files.splice(t,1),P(),n.pages.length===0?$():(Z(),B())};async function G(){if(n.files.length===0||n.isProcessing)return;n.isProcessing=!0,n.cancelRequested=!1,e.statusAlert.classList.remove("hidden"),e.applySettingsBtn.disabled=!0,e.clearAllBtn.classList.add("hidden"),e.exportReportBtn.classList.add("hidden"),P();const t=new Set(n.pages.map(s=>s.fileName)),a=n.files.filter(s=>!t.has(s.name));if(a.length===0){T();return}let i=0;const r=[];e.statusTitle.textContent="กำลังโหลดและเตรียมไฟล์...",e.statusDetail.textContent="โปรดรอสักครู่ขณะระบบตรวจสอบจำนวนหน้าทั้งหมด";try{for(let s=0;s<a.length&&!n.cancelRequested;s++){const d=a[s],l=await V(d),c=await pdfjsLib.getDocument({data:l}).promise;r.push({file:d,pdf:c,numPages:c.numPages}),i+=c.numPages}}catch(s){console.error("Error pre-loading PDFs:",s),alert("ไม่สามารถอ่านไฟล์ PDF บางไฟล์ได้ กรุณาตรวจสอบว่าไฟล์ไม่เสียหายและไม่มีรหัสผ่าน"),T();return}let o=0;e.emptyState.classList.add("hidden"),e.pageGrid.classList.remove("hidden");for(let s=0;s<r.length&&!n.cancelRequested;s++){const{file:d,pdf:l,numPages:c}=r[s];for(let g=1;g<=c&&!n.cancelRequested;g++){o++;const p=o/i*100;e.statusTitle.textContent=`กำลังวิเคราะห์หน้าเอกสาร... (${o}/${i})`,e.statusDetail.textContent=`ไฟล์: ${d.name} (หน้า ${g}/${c})`,e.progressBar.style.width=`${p}%`;try{const m=await l.getPage(g),u=m.getViewport({scale:1}),E=150/u.width,x=m.getViewport({scale:E}),v=document.createElement("canvas"),y=v.getContext("2d");v.width=x.width,v.height=x.height,await m.render({canvasContext:y,viewport:x}).promise;const f=y.getImageData(0,0,v.width,v.height),b=O(f,n.settings.colorThreshold,n.settings.minColorPercent,n.settings.ignoreBackground),C={id:`${d.name.replace(/[^a-z0-9]/gi,"_")}_${g}_${Date.now()}`,fileName:d.name,pageNum:g,width:u.width,height:u.height,imgData:f,isColor:b.isColor,colorPercent:b.colorPercent,colorPixelCount:b.colorPixelCount,userOverride:null};n.pages.push(C),A(C),B()}catch(m){console.error(`Error processing page ${g} of ${d.name}:`,m)}}n.cancelRequested||await ee(d.name,c)}T()}function T(){n.isProcessing=!1,e.statusAlert.classList.add("hidden"),e.progressBar.style.width="0%",e.applySettingsBtn.disabled=!1,n.pages.length>0?(e.clearAllBtn.classList.remove("hidden"),e.exportReportBtn.classList.remove("hidden"),e.exportReportBtn.disabled=!1):(e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden")),P(),B()}function V(t){return new Promise((a,i)=>{const r=new FileReader;r.onload=()=>a(r.result),r.onerror=()=>i(r.error),r.readAsArrayBuffer(t)})}function O(t,a,i,r){const o=t.data;let s=0,d=0;for(let p=0;p<o.length;p+=4){const m=o[p],u=o[p+1],h=o[p+2];if(o[p+3]<10)continue;if(r){if(m>215&&u>215&&h>195){const b=m-u,M=u-h,C=m-h;if(b<25&&M<25&&C<35)continue}if(m<25&&u<25&&h<25)continue}d++;const x=Math.abs(m-u),v=Math.abs(u-h),y=Math.abs(h-m);Math.max(x,v,y)>a&&s++}const l=d>0?d:o.length/4,c=s/l*100;return{isColor:c>=i,colorPercent:parseFloat(c.toFixed(2)),colorPixelCount:s}}function B(){let t=n.pages.length,a=0,i=0;n.pages.forEach(d=>{(d.userOverride!==null?d.userOverride==="color":d.isColor)?i++:a++});const r=t>0?Math.round(a/t*100):0,o=t>0?Math.round(i/t*100):0,s=a*n.settings.priceBW+i*n.settings.priceColor;k(e.statTotalPages,t),e.statTotalFiles.textContent=`${n.files.length} ไฟล์`,k(e.statBWPages,a),e.statBWPercent.textContent=`${r}%`,k(e.statColorPages,i),e.statColorPercent.textContent=`${o}%`,e.statTotalCost.textContent=`฿${s.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function k(t,a){const i=parseInt(t.textContent)||0;if(i===a){t.textContent=a;return}const r=400,o=performance.now();function s(d){const l=Math.min((d-o)/r,1),c=l*(2-l),g=Math.floor(i+c*(a-i));t.textContent=g,l<1?requestAnimationFrame(s):t.textContent=a}requestAnimationFrame(s)}function Z(){if(e.pageGrid.innerHTML="",n.pages.length===0){e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden");return}e.emptyState.classList.add("hidden"),e.pageGrid.classList.remove("hidden"),n.pages.forEach(t=>{A(t)})}function A(t){const a=t.userOverride!==null?t.userOverride==="color":t.isColor,i=document.createElement("div");i.className=`page-item ${a?"page-color":"page-bw"}`,i.id=`grid-page-${t.id}`;let r=t.fileName;r.length>18&&(r=r.substring(0,15)+"..."),i.innerHTML=`
        <div class="page-thumbnail-wrapper">
            <canvas id="canvas-${t.id}"></canvas>
            <span class="page-number">หน้า ${t.pageNum}</span>
        </div>
        <div class="page-info">
            <span class="page-name" title="${t.fileName}">${r}</span>
            <div class="page-badge-wrapper">
                <span class="badge ${a?"badge-color":"badge-bw"}" id="badge-${t.id}">
                    ${a?"หน้าสี":"ขาวดำ"}
                </span>
            </div>
        </div>
    `,i.addEventListener("click",s=>{s.target.classList.contains("badge")?U(t):K(t)}),e.pageGrid.appendChild(i);const o=document.getElementById(`canvas-${t.id}`);o&&(o.width=t.imgData.width,o.height=t.imgData.height,o.getContext("2d").putImageData(t.imgData,0,0))}function U(t){const a=t.userOverride!==null?t.userOverride==="color":t.isColor;t.userOverride=a?"bw":"color",N(t),B()}function N(t){const a=t.userOverride!==null?t.userOverride==="color":t.isColor,i=document.getElementById(`grid-page-${t.id}`),r=document.getElementById(`badge-${t.id}`);i&&r&&(i.className=`page-item ${a?"page-color":"page-bw"}`,r.className=`badge ${a?"badge-color":"badge-bw"}`,r.textContent=a?"หน้าสี":"ขาวดำ"),e.previewModal.classList.contains("open")&&w&&w.id===t.id&&_(t)}function J(){n.pages.length!==0&&(e.applySettingsBtn.innerHTML='<div class="spinner" style="width:14px; height:14px; margin:0; display:inline-block; vertical-align:middle;"></div> กำลังวิเคราะห์ใหม่...',e.applySettingsBtn.disabled=!0,setTimeout(()=>{n.pages.forEach(t=>{const a=O(t.imgData,n.settings.colorThreshold,n.settings.minColorPercent,n.settings.ignoreBackground);t.isColor=a.isColor,t.colorPercent=a.colorPercent,t.colorPixelCount=a.colorPixelCount,N(t)}),B(),e.applySettingsBtn.innerHTML='<i data-lucide="refresh-cw"></i> วิเคราะห์ไฟล์ใหม่อีกครั้ง',e.applySettingsBtn.disabled=!1,L()},100))}function $(){n.files=[],n.pages=[],e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden"),e.pageGrid.innerHTML="",e.fileQueue.classList.add("hidden"),e.queueList.innerHTML="",e.exportReportBtn.classList.add("hidden"),e.clearAllBtn.classList.add("hidden"),e.fileInput.value="",B()}let w=null;function K(t){w=t,e.previewModal.classList.add("open"),e.modalCanvas.width=t.imgData.width,e.modalCanvas.height=t.imgData.height,e.modalCanvas.getContext("2d").putImageData(t.imgData,0,0),_(t)}function _(t){const a=t.userOverride!==null?t.userOverride==="color":t.isColor;e.modalPageTitle.textContent=`${t.fileName} (หน้า ${t.pageNum})`;const i=(t.width/72).toFixed(2),r=(t.height/72).toFixed(2);e.modalPageSize.textContent=`${Math.round(t.width)} x ${Math.round(t.height)} px (${i}" x ${r}")`,e.modalColorPercent.textContent=`${t.colorPercent}% (${t.colorPixelCount.toLocaleString()} พิกเซล)`,e.modalStatusBadge.textContent=a?"หน้าสี (Color)":"ขาวดำ (Black & White)",e.modalStatusBadge.className=`info-val badge ${a?"badge-color":"badge-bw"}`,e.modalToggleBtn.innerHTML=`<i data-lucide="shuffle"></i> สลับเป็นหน้า${a?"ขาวดำ":"สี"}`,L()}e.modalToggleBtn.addEventListener("click",()=>{w&&U(w)});function D(){e.previewModal.classList.remove("open"),w=null}window.addEventListener("keydown",t=>{t.key==="Escape"&&D()});function q(t){if(!t||t.length===0)return"-";const a=[...t].sort((s,d)=>s-d),i=[];let r=a[0],o=a[0];for(let s=1;s<a.length;s++)a[s]===o+1||(r===o?i.push(`${r}`):i.push(`${r}-${o}`),r=a[s]),o=a[s];return r===o?i.push(`${r}`):i.push(`${r}-${o}`),i.join(", ")}function Y(){if(n.pages.length===0)return;const t=new Map;n.pages.forEach(c=>{t.has(c.fileName)||t.set(c.fileName,[]),t.get(c.fileName).push(c)});let a=n.pages.length,i=0,r=0,o="";for(const[c,g]of t.entries()){g.sort((f,b)=>f.pageNum-b.pageNum);const p=[],m=[];g.forEach(f=>{(f.userOverride!==null?f.userOverride==="color":f.isColor)?m.push(f.pageNum):p.push(f.pageNum)});const u=p.length,h=m.length;i+=u,r+=h;const E=u*n.settings.priceBW,x=h*n.settings.priceColor,v=E+x;let y="";u>0&&(y+=`
                <div class="detail-row">
                    <span class="detail-label">หน้าขาวดำ: <span class="detail-pages">${q(p)}</span></span>
                    <span class="detail-price">${u} หน้า x ฿${n.settings.priceBW.toFixed(2)} = ฿${E.toFixed(2)}</span>
                </div>
            `),h>0&&(y+=`
                <div class="detail-row">
                    <span class="detail-label">หน้าสี: <span class="detail-pages">${q(m)}</span></span>
                    <span class="detail-price">${h} หน้า x ฿${n.settings.priceColor.toFixed(2)} = ฿${x.toFixed(2)}</span>
                </div>
            `),o+=`
            <div class="file-item">
                <div class="file-name">${I(c)}</div>
                ${y}
                <div class="file-subtotal">
                    <span>รวมไฟล์นี้: ${g.length} หน้า</span>
                    <strong>฿${v.toFixed(2)}</strong>
                </div>
            </div>
            <div class="divider-dashed"></div>
        `}const s=i*n.settings.priceBW+r*n.settings.priceColor,d="REC-"+new Date().toISOString().slice(2,10).replace(/-/g,"")+"-"+Math.floor(1e3+Math.random()*9e3),l=window.open("","_blank");l.document.write(`
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
                    <div><strong>เลขที่ใบเสร็จ:</strong> ${d}</div>
                    <div class="metadata-right"><strong>วันที่:</strong> ${new Date().toLocaleDateString("th-TH",{dateStyle:"medium"})}</div>
                    <div><strong>เวลา:</strong> ${new Date().toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</div>
                    <div class="metadata-right"><strong>ผู้ประเมิน:</strong> เจ้าหน้าที่ระบบ</div>
                </div>
                
                <div class="section-title">รายการวิเคราะห์เอกสาร</div>
                
                <div class="items-container">
                    ${o}
                </div>
                
                <div class="total-row">
                    <span>จำนวนไฟล์ทั้งหมด:</span>
                    <span>${t.size} ไฟล์</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าขาวดำรวม:</span>
                    <span>${i} หน้า (@ ฿${n.settings.priceBW.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าสีรวม:</span>
                    <span>${r} หน้า (@ ฿${n.settings.priceColor.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าทั้งหมด:</span>
                    <span>${a} หน้า</span>
                </div>
                
                <div class="divider-double"></div>
                
                <div class="total-row grand-total">
                    <span>ยอดสุทธิรวมทั้งสิ้น:</span>
                    <span class="total-price">฿${s.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                </div>
                
                <div class="receipt-footer">
                    <div class="thanks-msg">ขอบคุณที่ใช้บริการ PageCounter Pro</div>
                    <div>ความถูกต้องผ่านการคำนวณแบบแยกหน้าตามสีพิกเซลจริง</div>
                    ${n.qrCodeDataUrl?`
                    <div class="receipt-qr-code">
                        <div class="qr-title">สแกนเพื่อชำระเงิน / Scan to Pay</div>
                        <img src="${n.qrCodeDataUrl}" class="qr-image" alt="Payment QR Code">
                    </div>
                    `:`
                    <div class="barcode-placeholder"></div>
                    <div style="font-size: 10px; margin-top: 5px; color: #cbd5e1;">* ${d} *</div>
                    `}
                </div>
            </div>
        </body>
        </html>
    `),l.document.close()}function I(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function X(){e.adminDashboardModal.classList.add("open"),z()}async function z(){const t=localStorage.getItem("current_username")||sessionStorage.getItem("current_username")||"";if(!t){alert("กรุณาเข้าสู่ระบบอีกครั้งเพื่อเข้าใช้แผงควบคุม");return}e.adminLogsTableBody.innerHTML='<tr><td colspan="7" class="text-center py-4 text-muted"><div class="spinner" style="margin: 0 auto 10px;"></div>กำลังโหลดประวัติข้อมูล...</td></tr>',e.adminUsersTableBody.innerHTML='<tr><td colspan="3" class="text-center py-4 text-muted"><div class="spinner" style="margin: 0 auto 10px;"></div>กำลังโหลดรายชื่อสมาชิก...</td></tr>';try{const a=await fetch("http://localhost:5000/api/admin/dashboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requestorUsername:t})}),i=await a.json();a.ok?(e.adminTotalFiles.textContent=i.stats.totalFiles,e.adminTotalPages.textContent=i.stats.totalPages,e.adminTotalUsers.textContent=i.users.length,e.adminTotalRevenue.textContent=`฿${i.stats.totalRevenue.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}`,e.adminLogsTableBody.innerHTML="",i.recentLogs.length===0?e.adminLogsTableBody.innerHTML='<tr><td colspan="7" class="text-center py-4 text-muted">ไม่พบประวัติการประเมินเอกสารในขณะนี้</td></tr>':i.recentLogs.forEach(r=>{const o=document.createElement("tr"),s=new Date(r.createdAt).toLocaleString("th-TH",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});o.innerHTML=`
                        <td>${s}</td>
                        <td><strong>${I(r.username)}</strong></td>
                        <td>${I(r.fileName)}</td>
                        <td class="text-center">${r.totalPages}</td>
                        <td class="text-center">${r.bwPages}</td>
                        <td class="text-center">${r.colorPages}</td>
                        <td class="text-center" style="font-weight: 600; color: var(--accent-success);">฿${r.estimatedCost.toFixed(2)}</td>
                    `,e.adminLogsTableBody.appendChild(o)}),e.adminUsersTableBody.innerHTML="",i.users.forEach(r=>{const o=document.createElement("tr"),s=new Date(r.createdAt).toLocaleString("th-TH",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),d=r.role==="admin"?'<span style="background: rgba(168, 85, 247, 0.15); color: #c084fc; padding: 2px 8px; border-radius: 12px; font-weight: 600; font-size: 11px;">Admin</span>':'<span style="background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); padding: 2px 8px; border-radius: 12px; font-size: 11px;">User</span>';o.innerHTML=`
                    <td>${s}</td>
                    <td><strong>${I(r.username)}</strong></td>
                    <td>${d}</td>
                `,e.adminUsersTableBody.appendChild(o)})):(alert(i.message||"ดึงข้อมูลไม่สำเร็จ"),e.adminDashboardModal.classList.remove("open"))}catch(a){console.error("Error fetching admin dashboard statistics:",a),alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ฐานข้อมูลเพื่อดึงข้อมูลได้ในขณะนี้"),e.adminDashboardModal.classList.remove("open")}}async function ee(t,a){const i=localStorage.getItem("current_username")||sessionStorage.getItem("current_username")||"guest",r=n.pages.filter(l=>l.fileName===t);let o=0,s=0;r.forEach(l=>{(l.userOverride!==null?l.userOverride==="color":l.isColor)?s++:o++});const d=o*n.settings.priceBW+s*n.settings.priceColor;try{await fetch("http://localhost:5000/api/logs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:i,fileName:t,totalPages:a,bwPages:o,colorPages:s,estimatedCost:d})})}catch(l){console.error("Error logging service usage to database:",l)}}
