(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";const n={theme:"dark",isAuthenticated:!1,files:[],pages:[],isProcessing:!1,cancelRequested:!1,qrCodeDataUrl:null,settings:{colorThreshold:18,minColorPercent:.3,ignoreBackground:!0,priceBW:1,priceColor:5}},e={body:document.body,themeToggleBtn:document.getElementById("themeToggleBtn"),dropZone:document.getElementById("dropZone"),fileInput:document.getElementById("fileInput"),fileQueue:document.getElementById("fileQueue"),queueList:document.getElementById("queueList"),statusAlert:document.getElementById("statusAlert"),statusTitle:document.getElementById("statusTitle"),statusDetail:document.getElementById("statusDetail"),progressBar:document.getElementById("progressBar"),cancelProcessBtn:document.getElementById("cancelProcessBtn"),colorThreshold:document.getElementById("colorThreshold"),minColorPercent:document.getElementById("minColorPercent"),ignoreBackground:document.getElementById("ignoreBackground"),thresholdVal:document.getElementById("thresholdVal"),percentVal:document.getElementById("percentVal"),priceBW:document.getElementById("priceBW"),priceColor:document.getElementById("priceColor"),applySettingsBtn:document.getElementById("applySettingsBtn"),qrInput:document.getElementById("qrInput"),qrPreviewBox:document.getElementById("qrPreviewBox"),removeQrBtn:document.getElementById("removeQrBtn"),statTotalPages:document.getElementById("statTotalPages"),statTotalFiles:document.getElementById("statTotalFiles"),statBWPages:document.getElementById("statBWPages"),statBWPercent:document.getElementById("statBWPercent"),statColorPages:document.getElementById("statColorPages"),statColorPercent:document.getElementById("statColorPercent"),statTotalCost:document.getElementById("statTotalCost"),emptyState:document.getElementById("emptyState"),pageGrid:document.getElementById("pageGrid"),exportReportBtn:document.getElementById("exportReportBtn"),clearAllBtn:document.getElementById("clearAllBtn"),previewModal:document.getElementById("previewModal"),modalOverlay:document.getElementById("modalOverlay"),modalCloseBtn:document.getElementById("modalCloseBtn"),modalCanvas:document.getElementById("modalCanvas"),modalPageTitle:document.getElementById("modalPageTitle"),modalPageSize:document.getElementById("modalPageSize"),modalColorPercent:document.getElementById("modalColorPercent"),modalStatusBadge:document.getElementById("modalStatusBadge"),modalToggleBtn:document.getElementById("modalToggleBtn"),loginOverlay:document.getElementById("loginOverlay"),loginCard:document.getElementById("loginCard"),loginTitle:document.getElementById("loginTitle"),loginSubtitle:document.getElementById("loginSubtitle"),loginForm:document.getElementById("loginForm"),loginUsername:document.getElementById("loginUsername"),loginPassword:document.getElementById("loginPassword"),togglePasswordBtn:document.getElementById("togglePasswordBtn"),eyeIcon:document.getElementById("eyeIcon"),rememberMe:document.getElementById("rememberMe"),loginError:document.getElementById("loginError"),logoutBtn:document.getElementById("logoutBtn"),registerForm:document.getElementById("registerForm"),registerUsername:document.getElementById("registerUsername"),registerPassword:document.getElementById("registerPassword"),registerConfirmPassword:document.getElementById("registerConfirmPassword"),toggleRegPasswordBtn:document.getElementById("toggleRegPasswordBtn"),regEyeIcon:document.getElementById("regEyeIcon"),registerError:document.getElementById("registerError"),registerErrorText:document.getElementById("registerErrorText"),registerSuccess:document.getElementById("registerSuccess"),goToRegisterLink:document.getElementById("goToRegisterLink"),goToLoginLink:document.getElementById("goToLoginLink"),goToRegisterText:document.getElementById("goToRegisterText"),goToLoginText:document.getElementById("goToLoginText"),logoutModal:document.getElementById("logoutModal"),logoutModalOverlay:document.getElementById("logoutModalOverlay"),cancelLogoutBtn:document.getElementById("cancelLogoutBtn"),confirmLogoutBtn:document.getElementById("confirmLogoutBtn")};document.addEventListener("DOMContentLoaded",()=>{H(),W(),Q(),U(),B()});function B(){window.lucide&&window.lucide.createIcons()}function U(){const t=localStorage.getItem("qr_code_data_url");t&&(n.qrCodeDataUrl=t,k())}function k(){n.qrCodeDataUrl?(e.qrPreviewBox.innerHTML=`<img src="${n.qrCodeDataUrl}" class="qr-preview-img" alt="QR Code Preview">`,e.removeQrBtn.classList.remove("hidden")):(e.qrPreviewBox.innerHTML=`
            <i data-lucide="qr-code" class="qr-placeholder-icon"></i>
            <span class="qr-upload-text">คลิกเพื่ออัปโหลด QR Code</span>
        `,e.removeQrBtn.classList.add("hidden"),B())}function W(){localStorage.getItem("is_authenticated")==="true"||sessionStorage.getItem("is_authenticated")==="true"?(n.isAuthenticated=!0,e.loginOverlay.classList.add("hidden"),e.logoutBtn.classList.remove("hidden")):(n.isAuthenticated=!1,e.loginOverlay.classList.remove("hidden"),e.logoutBtn.classList.add("hidden"))}function H(){const t=localStorage.getItem("theme");t?n.theme=t:window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches&&(n.theme="light"),F()}function F(){n.theme==="light"?(e.body.classList.remove("dark-theme"),e.body.classList.add("light-theme")):(e.body.classList.remove("light-theme"),e.body.classList.add("dark-theme")),localStorage.setItem("theme",n.theme)}function Q(){e.themeToggleBtn.addEventListener("click",()=>{n.theme=n.theme==="dark"?"light":"dark",F()}),e.loginForm.addEventListener("submit",async o=>{o.preventDefault();const i=e.loginUsername.value.trim(),r=e.loginPassword.value;try{const l=await fetch("http://localhost:5000/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:i,password:r})}),d=await l.json();l.ok?(n.isAuthenticated=!0,e.loginError.classList.add("hidden"),e.rememberMe.checked?localStorage.setItem("is_authenticated","true"):sessionStorage.setItem("is_authenticated","true"),e.loginOverlay.classList.add("hidden"),e.logoutBtn.classList.remove("hidden"),e.loginUsername.value="",e.loginPassword.value=""):(e.loginError.querySelector("span").textContent=d.message||"ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง!",e.loginError.classList.remove("hidden"),e.loginCard.classList.add("shake"),setTimeout(()=>{e.loginCard.classList.remove("shake")},400))}catch(l){console.error("Login error:",l),e.loginError.querySelector("span").textContent="ไม่สามารถเชื่อมต่อฐานข้อมูลเซิร์ฟเวอร์ได้",e.loginError.classList.remove("hidden"),e.loginCard.classList.add("shake"),setTimeout(()=>{e.loginCard.classList.remove("shake")},400)}}),e.togglePasswordBtn.addEventListener("click",()=>{const o=e.loginPassword.getAttribute("type")==="password"?"text":"password";e.loginPassword.setAttribute("type",o),o==="text"?e.eyeIcon.setAttribute("data-lucide","eye-off"):e.eyeIcon.setAttribute("data-lucide","eye"),B()}),e.toggleRegPasswordBtn.addEventListener("click",()=>{const i=e.registerPassword.getAttribute("type")==="password"?"text":"password";e.registerPassword.setAttribute("type",i),e.registerConfirmPassword.setAttribute("type",i),i==="text"?e.regEyeIcon.setAttribute("data-lucide","eye-off"):e.regEyeIcon.setAttribute("data-lucide","eye"),B()}),e.logoutBtn.addEventListener("click",()=>{e.logoutModal.classList.add("open")});const t=()=>{e.logoutModal.classList.remove("open")};e.cancelLogoutBtn.addEventListener("click",t),e.logoutModalOverlay.addEventListener("click",t),e.confirmLogoutBtn.addEventListener("click",()=>{n.isAuthenticated=!1,localStorage.removeItem("is_authenticated"),sessionStorage.removeItem("is_authenticated"),e.loginOverlay.classList.remove("hidden"),e.logoutBtn.classList.add("hidden"),$(),t()}),e.goToRegisterLink.addEventListener("click",()=>{e.loginForm.classList.add("hidden"),e.registerForm.classList.remove("hidden"),e.goToRegisterText.classList.add("hidden"),e.goToLoginText.classList.remove("hidden"),e.loginTitle.innerHTML="สมัครสมาชิก <span>Pro</span>",e.loginSubtitle.textContent="สร้างบัญชีผู้ใช้ใหม่สำหรับประเมินหน้าเอกสาร",e.loginError.classList.add("hidden"),e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden")}),e.goToLoginLink.addEventListener("click",()=>{e.registerForm.classList.add("hidden"),e.loginForm.classList.remove("hidden"),e.goToLoginText.classList.add("hidden"),e.goToRegisterText.classList.remove("hidden"),e.loginTitle.innerHTML="PageCounter <span>Pro</span>",e.loginSubtitle.textContent="เข้าสู่ระบบเพื่อใช้งานระบบแยกหน้าเอกสาร",e.loginError.classList.add("hidden"),e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden")}),e.registerForm.addEventListener("submit",async o=>{o.preventDefault();const i=e.registerUsername.value.trim(),r=e.registerPassword.value,l=e.registerConfirmPassword.value;if(e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden"),i.length<3){s("ชื่อผู้ใช้งานต้องมีความยาวอย่างน้อย 3 ตัวอักษร");return}if(r.length<6){s("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");return}if(r!==l){s("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");return}try{const d=await fetch("http://localhost:5000/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:i,password:r})}),c=await d.json();d.ok?(e.registerSuccess.classList.remove("hidden"),e.registerUsername.value="",e.registerPassword.value="",e.registerConfirmPassword.value="",setTimeout(()=>{e.goToLoginLink.click(),e.loginUsername.value=i,e.loginPassword.focus()},1500)):s(c.message||"เกิดข้อผิดพลาดในการลงทะเบียน")}catch(d){console.error("Registration error:",d),s("ไม่สามารถเชื่อมต่อฐานข้อมูลเซิร์ฟเวอร์ได้")}});function s(o){e.registerErrorText.textContent=o,e.registerError.classList.remove("hidden"),e.loginCard.classList.add("shake"),setTimeout(()=>{e.loginCard.classList.remove("shake")},400)}const a=o=>{o.preventDefault(),o.stopPropagation()};["dragenter","dragover","dragleave","drop"].forEach(o=>{e.dropZone.addEventListener(o,a,!1)}),["dragenter","dragover"].forEach(o=>{e.dropZone.addEventListener(o,()=>e.dropZone.classList.add("dragover"),!1)}),["dragleave","drop"].forEach(o=>{e.dropZone.addEventListener(o,()=>e.dropZone.classList.remove("dragover"),!1)}),e.dropZone.addEventListener("drop",o=>{const i=o.dataTransfer,r=Array.from(i.files).filter(l=>l.type==="application/pdf");r.length>0&&q(r)}),e.dropZone.addEventListener("click",()=>{e.fileInput.click()}),e.fileInput.addEventListener("change",o=>{const i=Array.from(o.target.files).filter(r=>r.type==="application/pdf");i.length>0&&q(i)}),e.colorThreshold.addEventListener("input",o=>{e.thresholdVal.textContent=o.target.value,n.settings.colorThreshold=parseInt(o.target.value)}),e.minColorPercent.addEventListener("input",o=>{e.percentVal.textContent=parseFloat(o.target.value).toFixed(2)+"%",n.settings.minColorPercent=parseFloat(o.target.value)}),e.ignoreBackground.addEventListener("change",o=>{n.settings.ignoreBackground=o.target.checked}),e.priceBW.addEventListener("input",o=>{n.settings.priceBW=parseFloat(o.target.value)||0,w()}),e.priceColor.addEventListener("input",o=>{n.settings.priceColor=parseFloat(o.target.value)||0,w()}),e.applySettingsBtn.addEventListener("click",()=>{n.pages.length!==0&&V()}),e.cancelProcessBtn.addEventListener("click",()=>{n.cancelRequested=!0,e.statusTitle.textContent="กำลังยกเลิกการทำงาน..."}),e.clearAllBtn.addEventListener("click",$),e.exportReportBtn.addEventListener("click",K),e.qrPreviewBox.addEventListener("click",()=>{e.qrInput.click()}),e.qrInput.addEventListener("change",o=>{const i=o.target.files[0];if(i){const r=new FileReader;r.onload=l=>{const d=l.target.result;n.qrCodeDataUrl=d,localStorage.setItem("qr_code_data_url",d),k()},r.readAsDataURL(i)}}),e.removeQrBtn.addEventListener("click",o=>{o.stopPropagation(),n.qrCodeDataUrl=null,localStorage.removeItem("qr_code_data_url"),e.qrInput.value="",k()}),e.modalCloseBtn.addEventListener("click",S),e.modalOverlay.addEventListener("click",S)}function q(t){n.isProcessing||(t.forEach(s=>{n.files.some(a=>a.name===s.name&&a.size===s.size)||n.files.push(s)}),P(),_())}function P(){n.files.length>0?(e.fileQueue.classList.remove("hidden"),e.queueList.innerHTML="",n.files.forEach((t,s)=>{const a=(t.size/1048576).toFixed(2),o=document.createElement("div");o.className="queue-item",o.innerHTML=`
                <div class="queue-item-name" title="${t.name}">
                    <i data-lucide="file-text"></i>
                    <span>${t.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="queue-item-size">${a} MB</span>
                    ${n.isProcessing?"":`<button class="queue-item-remove" onclick="removeQueueItem(${s})"><i data-lucide="trash-2"></i></button>`}
                </div>
            `,e.queueList.appendChild(o)}),B()):e.fileQueue.classList.add("hidden")}window.removeQueueItem=function(t){if(n.isProcessing)return;const s=n.files[t].name;n.pages=n.pages.filter(a=>a.fileName!==s),n.files.splice(t,1),P(),n.pages.length===0?$():(G(),w())};async function _(){if(n.files.length===0||n.isProcessing)return;n.isProcessing=!0,n.cancelRequested=!1,e.statusAlert.classList.remove("hidden"),e.applySettingsBtn.disabled=!0,e.clearAllBtn.classList.add("hidden"),e.exportReportBtn.classList.add("hidden"),P();const t=new Set(n.pages.map(r=>r.fileName)),s=n.files.filter(r=>!t.has(r.name));if(s.length===0){I();return}let a=0;const o=[];e.statusTitle.textContent="กำลังโหลดและเตรียมไฟล์...",e.statusDetail.textContent="โปรดรอสักครู่ขณะระบบตรวจสอบจำนวนหน้าทั้งหมด";try{for(let r=0;r<s.length&&!n.cancelRequested;r++){const l=s[r],d=await j(l),c=await pdfjsLib.getDocument({data:d}).promise;o.push({file:l,pdf:c,numPages:c.numPages}),a+=c.numPages}}catch(r){console.error("Error pre-loading PDFs:",r),alert("ไม่สามารถอ่านไฟล์ PDF บางไฟล์ได้ กรุณาตรวจสอบว่าไฟล์ไม่เสียหายและไม่มีรหัสผ่าน"),I();return}let i=0;e.emptyState.classList.add("hidden"),e.pageGrid.classList.remove("hidden");for(let r=0;r<o.length&&!n.cancelRequested;r++){const{file:l,pdf:d,numPages:c}=o[r];for(let p=1;p<=c&&!n.cancelRequested;p++){i++;const u=i/a*100;e.statusTitle.textContent=`กำลังวิเคราะห์หน้าเอกสาร... (${i}/${a})`,e.statusDetail.textContent=`ไฟล์: ${l.name} (หน้า ${p}/${c})`,e.progressBar.style.width=`${u}%`;try{const g=await d.getPage(p),m=g.getViewport({scale:1}),E=150/m.width,x=g.getViewport({scale:E}),v=document.createElement("canvas"),y=v.getContext("2d");v.width=x.width,v.height=x.height,await g.render({canvasContext:y,viewport:x}).promise;const f=y.getImageData(0,0,v.width,v.height),b=O(f,n.settings.colorThreshold,n.settings.minColorPercent,n.settings.ignoreBackground),C={id:`${l.name.replace(/[^a-z0-9]/gi,"_")}_${p}_${Date.now()}`,fileName:l.name,pageNum:p,width:m.width,height:m.height,imgData:f,isColor:b.isColor,colorPercent:b.colorPercent,colorPixelCount:b.colorPixelCount,userOverride:null};n.pages.push(C),R(C),w()}catch(g){console.error(`Error processing page ${p} of ${l.name}:`,g)}}}I()}function I(){n.isProcessing=!1,e.statusAlert.classList.add("hidden"),e.progressBar.style.width="0%",e.applySettingsBtn.disabled=!1,n.pages.length>0?(e.clearAllBtn.classList.remove("hidden"),e.exportReportBtn.classList.remove("hidden"),e.exportReportBtn.disabled=!1):(e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden")),P(),w()}function j(t){return new Promise((s,a)=>{const o=new FileReader;o.onload=()=>s(o.result),o.onerror=()=>a(o.error),o.readAsArrayBuffer(t)})}function O(t,s,a,o){const i=t.data;let r=0,l=0;for(let u=0;u<i.length;u+=4){const g=i[u],m=i[u+1],h=i[u+2];if(i[u+3]<10)continue;if(o){if(g>215&&m>215&&h>195){const b=g-m,M=m-h,C=g-h;if(b<25&&M<25&&C<35)continue}if(g<25&&m<25&&h<25)continue}l++;const x=Math.abs(g-m),v=Math.abs(m-h),y=Math.abs(h-g);Math.max(x,v,y)>s&&r++}const d=l>0?l:i.length/4,c=r/d*100;return{isColor:c>=a,colorPercent:parseFloat(c.toFixed(2)),colorPixelCount:r}}function w(){let t=n.pages.length,s=0,a=0;n.pages.forEach(l=>{(l.userOverride!==null?l.userOverride==="color":l.isColor)?a++:s++});const o=t>0?Math.round(s/t*100):0,i=t>0?Math.round(a/t*100):0,r=s*n.settings.priceBW+a*n.settings.priceColor;T(e.statTotalPages,t),e.statTotalFiles.textContent=`${n.files.length} ไฟล์`,T(e.statBWPages,s),e.statBWPercent.textContent=`${o}%`,T(e.statColorPages,a),e.statColorPercent.textContent=`${i}%`,e.statTotalCost.textContent=`฿${r.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function T(t,s){const a=parseInt(t.textContent)||0;if(a===s){t.textContent=s;return}const o=400,i=performance.now();function r(l){const d=Math.min((l-i)/o,1),c=d*(2-d),p=Math.floor(a+c*(s-a));t.textContent=p,d<1?requestAnimationFrame(r):t.textContent=s}requestAnimationFrame(r)}function G(){if(e.pageGrid.innerHTML="",n.pages.length===0){e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden");return}e.emptyState.classList.add("hidden"),e.pageGrid.classList.remove("hidden"),n.pages.forEach(t=>{R(t)})}function R(t){const s=t.userOverride!==null?t.userOverride==="color":t.isColor,a=document.createElement("div");a.className=`page-item ${s?"page-color":"page-bw"}`,a.id=`grid-page-${t.id}`;let o=t.fileName;o.length>18&&(o=o.substring(0,15)+"..."),a.innerHTML=`
        <div class="page-thumbnail-wrapper">
            <canvas id="canvas-${t.id}"></canvas>
            <span class="page-number">หน้า ${t.pageNum}</span>
        </div>
        <div class="page-info">
            <span class="page-name" title="${t.fileName}">${o}</span>
            <div class="page-badge-wrapper">
                <span class="badge ${s?"badge-color":"badge-bw"}" id="badge-${t.id}">
                    ${s?"หน้าสี":"ขาวดำ"}
                </span>
            </div>
        </div>
    `,a.addEventListener("click",r=>{r.target.classList.contains("badge")?A(t):Z(t)}),e.pageGrid.appendChild(a);const i=document.getElementById(`canvas-${t.id}`);i&&(i.width=t.imgData.width,i.height=t.imgData.height,i.getContext("2d").putImageData(t.imgData,0,0))}function A(t){const s=t.userOverride!==null?t.userOverride==="color":t.isColor;t.userOverride=s?"bw":"color",N(t),w()}function N(t){const s=t.userOverride!==null?t.userOverride==="color":t.isColor,a=document.getElementById(`grid-page-${t.id}`),o=document.getElementById(`badge-${t.id}`);a&&o&&(a.className=`page-item ${s?"page-color":"page-bw"}`,o.className=`badge ${s?"badge-color":"badge-bw"}`,o.textContent=s?"หน้าสี":"ขาวดำ"),e.previewModal.classList.contains("open")&&L&&L.id===t.id&&z(t)}function V(){n.pages.length!==0&&(e.applySettingsBtn.innerHTML='<div class="spinner" style="width:14px; height:14px; margin:0; display:inline-block; vertical-align:middle;"></div> กำลังวิเคราะห์ใหม่...',e.applySettingsBtn.disabled=!0,setTimeout(()=>{n.pages.forEach(t=>{const s=O(t.imgData,n.settings.colorThreshold,n.settings.minColorPercent,n.settings.ignoreBackground);t.isColor=s.isColor,t.colorPercent=s.colorPercent,t.colorPixelCount=s.colorPixelCount,N(t)}),w(),e.applySettingsBtn.innerHTML='<i data-lucide="refresh-cw"></i> วิเคราะห์ไฟล์ใหม่อีกครั้ง',e.applySettingsBtn.disabled=!1,B()},100))}function $(){n.files=[],n.pages=[],e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden"),e.pageGrid.innerHTML="",e.fileQueue.classList.add("hidden"),e.queueList.innerHTML="",e.exportReportBtn.classList.add("hidden"),e.clearAllBtn.classList.add("hidden"),e.fileInput.value="",w()}let L=null;function Z(t){L=t,e.previewModal.classList.add("open"),e.modalCanvas.width=t.imgData.width,e.modalCanvas.height=t.imgData.height,e.modalCanvas.getContext("2d").putImageData(t.imgData,0,0),z(t)}function z(t){const s=t.userOverride!==null?t.userOverride==="color":t.isColor;e.modalPageTitle.textContent=`${t.fileName} (หน้า ${t.pageNum})`;const a=(t.width/72).toFixed(2),o=(t.height/72).toFixed(2);e.modalPageSize.textContent=`${Math.round(t.width)} x ${Math.round(t.height)} px (${a}" x ${o}")`,e.modalColorPercent.textContent=`${t.colorPercent}% (${t.colorPixelCount.toLocaleString()} พิกเซล)`,e.modalStatusBadge.textContent=s?"หน้าสี (Color)":"ขาวดำ (Black & White)",e.modalStatusBadge.className=`info-val badge ${s?"badge-color":"badge-bw"}`,e.modalToggleBtn.innerHTML=`<i data-lucide="shuffle"></i> สลับเป็นหน้า${s?"ขาวดำ":"สี"}`,B()}e.modalToggleBtn.addEventListener("click",()=>{L&&A(L)});function S(){e.previewModal.classList.remove("open"),L=null}window.addEventListener("keydown",t=>{t.key==="Escape"&&S()});function D(t){if(!t||t.length===0)return"-";const s=[...t].sort((r,l)=>r-l),a=[];let o=s[0],i=s[0];for(let r=1;r<s.length;r++)s[r]===i+1||(o===i?a.push(`${o}`):a.push(`${o}-${i}`),o=s[r]),i=s[r];return o===i?a.push(`${o}`):a.push(`${o}-${i}`),a.join(", ")}function K(){if(n.pages.length===0)return;const t=new Map;n.pages.forEach(c=>{t.has(c.fileName)||t.set(c.fileName,[]),t.get(c.fileName).push(c)});let s=n.pages.length,a=0,o=0,i="";for(const[c,p]of t.entries()){p.sort((f,b)=>f.pageNum-b.pageNum);const u=[],g=[];p.forEach(f=>{(f.userOverride!==null?f.userOverride==="color":f.isColor)?g.push(f.pageNum):u.push(f.pageNum)});const m=u.length,h=g.length;a+=m,o+=h;const E=m*n.settings.priceBW,x=h*n.settings.priceColor,v=E+x;let y="";m>0&&(y+=`
                <div class="detail-row">
                    <span class="detail-label">หน้าขาวดำ: <span class="detail-pages">${D(u)}</span></span>
                    <span class="detail-price">${m} หน้า x ฿${n.settings.priceBW.toFixed(2)} = ฿${E.toFixed(2)}</span>
                </div>
            `),h>0&&(y+=`
                <div class="detail-row">
                    <span class="detail-label">หน้าสี: <span class="detail-pages">${D(g)}</span></span>
                    <span class="detail-price">${h} หน้า x ฿${n.settings.priceColor.toFixed(2)} = ฿${x.toFixed(2)}</span>
                </div>
            `),i+=`
            <div class="file-item">
                <div class="file-name">${Y(c)}</div>
                ${y}
                <div class="file-subtotal">
                    <span>รวมไฟล์นี้: ${p.length} หน้า</span>
                    <strong>฿${v.toFixed(2)}</strong>
                </div>
            </div>
            <div class="divider-dashed"></div>
        `}const r=a*n.settings.priceBW+o*n.settings.priceColor,l="REC-"+new Date().toISOString().slice(2,10).replace(/-/g,"")+"-"+Math.floor(1e3+Math.random()*9e3),d=window.open("","_blank");d.document.write(`
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
                    <div><strong>เลขที่ใบเสร็จ:</strong> ${l}</div>
                    <div class="metadata-right"><strong>วันที่:</strong> ${new Date().toLocaleDateString("th-TH",{dateStyle:"medium"})}</div>
                    <div><strong>เวลา:</strong> ${new Date().toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</div>
                    <div class="metadata-right"><strong>ผู้ประเมิน:</strong> เจ้าหน้าที่ระบบ</div>
                </div>
                
                <div class="section-title">รายการวิเคราะห์เอกสาร</div>
                
                <div class="items-container">
                    ${i}
                </div>
                
                <div class="total-row">
                    <span>จำนวนไฟล์ทั้งหมด:</span>
                    <span>${t.size} ไฟล์</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าขาวดำรวม:</span>
                    <span>${a} หน้า (@ ฿${n.settings.priceBW.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าสีรวม:</span>
                    <span>${o} หน้า (@ ฿${n.settings.priceColor.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าทั้งหมด:</span>
                    <span>${s} หน้า</span>
                </div>
                
                <div class="divider-double"></div>
                
                <div class="total-row grand-total">
                    <span>ยอดสุทธิรวมทั้งสิ้น:</span>
                    <span class="total-price">฿${r.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
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
                    <div style="font-size: 10px; margin-top: 5px; color: #cbd5e1;">* ${l} *</div>
                    `}
                </div>
            </div>
        </body>
        </html>
    `),d.document.close()}function Y(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
