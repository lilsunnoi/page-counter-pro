(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=o(i);fetch(i.href,a)}})();pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";const n={theme:"dark",isAuthenticated:!1,files:[],pages:[],isProcessing:!1,cancelRequested:!1,qrCodeDataUrl:null,settings:{colorThreshold:18,minColorPercent:.3,ignoreBackground:!0,priceBW:1,priceColor:5}},e={body:document.body,themeToggleBtn:document.getElementById("themeToggleBtn"),dropZone:document.getElementById("dropZone"),fileInput:document.getElementById("fileInput"),fileQueue:document.getElementById("fileQueue"),queueList:document.getElementById("queueList"),statusAlert:document.getElementById("statusAlert"),statusTitle:document.getElementById("statusTitle"),statusDetail:document.getElementById("statusDetail"),progressBar:document.getElementById("progressBar"),cancelProcessBtn:document.getElementById("cancelProcessBtn"),colorThreshold:document.getElementById("colorThreshold"),minColorPercent:document.getElementById("minColorPercent"),ignoreBackground:document.getElementById("ignoreBackground"),thresholdVal:document.getElementById("thresholdVal"),percentVal:document.getElementById("percentVal"),priceBW:document.getElementById("priceBW"),priceColor:document.getElementById("priceColor"),applySettingsBtn:document.getElementById("applySettingsBtn"),qrInput:document.getElementById("qrInput"),qrPreviewBox:document.getElementById("qrPreviewBox"),removeQrBtn:document.getElementById("removeQrBtn"),statTotalPages:document.getElementById("statTotalPages"),statTotalFiles:document.getElementById("statTotalFiles"),statBWPages:document.getElementById("statBWPages"),statBWPercent:document.getElementById("statBWPercent"),statColorPages:document.getElementById("statColorPages"),statColorPercent:document.getElementById("statColorPercent"),statTotalCost:document.getElementById("statTotalCost"),emptyState:document.getElementById("emptyState"),pageGrid:document.getElementById("pageGrid"),exportReportBtn:document.getElementById("exportReportBtn"),clearAllBtn:document.getElementById("clearAllBtn"),previewModal:document.getElementById("previewModal"),modalOverlay:document.getElementById("modalOverlay"),modalCloseBtn:document.getElementById("modalCloseBtn"),modalCanvas:document.getElementById("modalCanvas"),modalPageTitle:document.getElementById("modalPageTitle"),modalPageSize:document.getElementById("modalPageSize"),modalColorPercent:document.getElementById("modalColorPercent"),modalStatusBadge:document.getElementById("modalStatusBadge"),modalToggleBtn:document.getElementById("modalToggleBtn"),loginOverlay:document.getElementById("loginOverlay"),loginCard:document.getElementById("loginCard"),loginTitle:document.getElementById("loginTitle"),loginSubtitle:document.getElementById("loginSubtitle"),loginForm:document.getElementById("loginForm"),loginUsername:document.getElementById("loginUsername"),loginPassword:document.getElementById("loginPassword"),togglePasswordBtn:document.getElementById("togglePasswordBtn"),eyeIcon:document.getElementById("eyeIcon"),rememberMe:document.getElementById("rememberMe"),helpCredentialsBtn:document.getElementById("helpCredentialsBtn"),credentialsInfoBox:document.getElementById("credentialsInfoBox"),loginError:document.getElementById("loginError"),logoutBtn:document.getElementById("logoutBtn"),registerForm:document.getElementById("registerForm"),registerUsername:document.getElementById("registerUsername"),registerPassword:document.getElementById("registerPassword"),registerConfirmPassword:document.getElementById("registerConfirmPassword"),toggleRegPasswordBtn:document.getElementById("toggleRegPasswordBtn"),regEyeIcon:document.getElementById("regEyeIcon"),registerError:document.getElementById("registerError"),registerErrorText:document.getElementById("registerErrorText"),registerSuccess:document.getElementById("registerSuccess"),goToRegisterLink:document.getElementById("goToRegisterLink"),goToLoginLink:document.getElementById("goToLoginLink"),goToRegisterText:document.getElementById("goToRegisterText"),goToLoginText:document.getElementById("goToLoginText")};document.addEventListener("DOMContentLoaded",()=>{W(),_(),H(),U(),B()});function B(){window.lucide&&window.lucide.createIcons()}function U(){const t=localStorage.getItem("qr_code_data_url");t&&(n.qrCodeDataUrl=t,k())}function k(){n.qrCodeDataUrl?(e.qrPreviewBox.innerHTML=`<img src="${n.qrCodeDataUrl}" class="qr-preview-img" alt="QR Code Preview">`,e.removeQrBtn.classList.remove("hidden")):(e.qrPreviewBox.innerHTML=`
            <i data-lucide="qr-code" class="qr-placeholder-icon"></i>
            <span class="qr-upload-text">คลิกเพื่ออัปโหลด QR Code</span>
        `,e.removeQrBtn.classList.add("hidden"),B())}function _(){localStorage.getItem("is_authenticated")==="true"||sessionStorage.getItem("is_authenticated")==="true"?(n.isAuthenticated=!0,e.loginOverlay.classList.add("hidden"),e.logoutBtn.classList.remove("hidden")):(n.isAuthenticated=!1,e.loginOverlay.classList.remove("hidden"),e.logoutBtn.classList.add("hidden"))}function W(){const t=localStorage.getItem("theme");t?n.theme=t:window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches&&(n.theme="light"),F()}function F(){n.theme==="light"?(e.body.classList.remove("dark-theme"),e.body.classList.add("light-theme")):(e.body.classList.remove("light-theme"),e.body.classList.add("dark-theme")),localStorage.setItem("theme",n.theme)}function H(){e.themeToggleBtn.addEventListener("click",()=>{n.theme=n.theme==="dark"?"light":"dark",F()}),e.loginForm.addEventListener("submit",o=>{o.preventDefault();const s=e.loginUsername.value.trim(),i=e.loginPassword.value;let a=!1;if(s==="admin"&&i==="password123")a=!0;else{const l=localStorage.getItem("user_creds_"+s);if(l)try{const d=JSON.parse(l);d&&d.password===i&&(a=!0)}catch(d){console.error("Error parsing user credentials:",d)}}a?(n.isAuthenticated=!0,e.loginError.classList.add("hidden"),e.rememberMe.checked?localStorage.setItem("is_authenticated","true"):sessionStorage.setItem("is_authenticated","true"),e.loginOverlay.classList.add("hidden"),e.logoutBtn.classList.remove("hidden"),e.loginUsername.value="",e.loginPassword.value=""):(e.loginError.classList.remove("hidden"),e.loginCard.classList.add("shake"),setTimeout(()=>{e.loginCard.classList.remove("shake")},400))}),e.togglePasswordBtn.addEventListener("click",()=>{const o=e.loginPassword.getAttribute("type")==="password"?"text":"password";e.loginPassword.setAttribute("type",o),o==="text"?e.eyeIcon.setAttribute("data-lucide","eye-off"):e.eyeIcon.setAttribute("data-lucide","eye"),B()}),e.toggleRegPasswordBtn.addEventListener("click",()=>{const s=e.registerPassword.getAttribute("type")==="password"?"text":"password";e.registerPassword.setAttribute("type",s),e.registerConfirmPassword.setAttribute("type",s),s==="text"?e.regEyeIcon.setAttribute("data-lucide","eye-off"):e.regEyeIcon.setAttribute("data-lucide","eye"),B()}),e.helpCredentialsBtn.addEventListener("click",()=>{e.credentialsInfoBox.classList.toggle("hidden")}),e.logoutBtn.addEventListener("click",()=>{n.isAuthenticated=!1,localStorage.removeItem("is_authenticated"),sessionStorage.removeItem("is_authenticated"),e.loginOverlay.classList.remove("hidden"),e.logoutBtn.classList.add("hidden"),e.credentialsInfoBox.classList.add("hidden"),$()}),e.goToRegisterLink.addEventListener("click",()=>{e.loginForm.classList.add("hidden"),e.registerForm.classList.remove("hidden"),e.goToRegisterText.classList.add("hidden"),e.goToLoginText.classList.remove("hidden"),e.loginTitle.innerHTML="สมัครสมาชิก <span>Pro</span>",e.loginSubtitle.textContent="สร้างบัญชีผู้ใช้ใหม่สำหรับประเมินหน้าเอกสาร",e.loginError.classList.add("hidden"),e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden")}),e.goToLoginLink.addEventListener("click",()=>{e.registerForm.classList.add("hidden"),e.loginForm.classList.remove("hidden"),e.goToLoginText.classList.add("hidden"),e.goToRegisterText.classList.remove("hidden"),e.loginTitle.innerHTML="PageCounter <span>Pro</span>",e.loginSubtitle.textContent="เข้าสู่ระบบเพื่อใช้งานระบบแยกหน้าเอกสาร",e.loginError.classList.add("hidden"),e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden")}),e.registerForm.addEventListener("submit",o=>{o.preventDefault();const s=e.registerUsername.value.trim(),i=e.registerPassword.value,a=e.registerConfirmPassword.value;if(e.registerError.classList.add("hidden"),e.registerSuccess.classList.add("hidden"),s.length<3){t("ชื่อผู้ใช้งานต้องมีความยาวอย่างน้อย 3 ตัวอักษร");return}if(i.length<6){t("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");return}if(i!==a){t("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");return}if(s.toLowerCase()==="admin"||localStorage.getItem("user_creds_"+s)){t("ชื่อผู้ใช้งานนี้ถูกใช้งานแล้ว กรุณาใช้ชื่ออื่น");return}const l={username:s,password:i};localStorage.setItem("user_creds_"+s,JSON.stringify(l)),e.registerSuccess.classList.remove("hidden"),e.registerUsername.value="",e.registerPassword.value="",e.registerConfirmPassword.value="",setTimeout(()=>{e.goToLoginLink.click(),e.loginUsername.value=s,e.loginPassword.focus()},1500)});function t(o){e.registerErrorText.textContent=o,e.registerError.classList.remove("hidden"),e.loginCard.classList.add("shake"),setTimeout(()=>{e.loginCard.classList.remove("shake")},400)}const r=o=>{o.preventDefault(),o.stopPropagation()};["dragenter","dragover","dragleave","drop"].forEach(o=>{e.dropZone.addEventListener(o,r,!1)}),["dragenter","dragover"].forEach(o=>{e.dropZone.addEventListener(o,()=>e.dropZone.classList.add("dragover"),!1)}),["dragleave","drop"].forEach(o=>{e.dropZone.addEventListener(o,()=>e.dropZone.classList.remove("dragover"),!1)}),e.dropZone.addEventListener("drop",o=>{const s=o.dataTransfer,i=Array.from(s.files).filter(a=>a.type==="application/pdf");i.length>0&&M(i)}),e.dropZone.addEventListener("click",()=>{e.fileInput.click()}),e.fileInput.addEventListener("change",o=>{const s=Array.from(o.target.files).filter(i=>i.type==="application/pdf");s.length>0&&M(s)}),e.colorThreshold.addEventListener("input",o=>{e.thresholdVal.textContent=o.target.value,n.settings.colorThreshold=parseInt(o.target.value)}),e.minColorPercent.addEventListener("input",o=>{e.percentVal.textContent=parseFloat(o.target.value).toFixed(2)+"%",n.settings.minColorPercent=parseFloat(o.target.value)}),e.ignoreBackground.addEventListener("change",o=>{n.settings.ignoreBackground=o.target.checked}),e.priceBW.addEventListener("input",o=>{n.settings.priceBW=parseFloat(o.target.value)||0,w()}),e.priceColor.addEventListener("input",o=>{n.settings.priceColor=parseFloat(o.target.value)||0,w()}),e.applySettingsBtn.addEventListener("click",()=>{n.pages.length!==0&&V()}),e.cancelProcessBtn.addEventListener("click",()=>{n.cancelRequested=!0,e.statusTitle.textContent="กำลังยกเลิกการทำงาน..."}),e.clearAllBtn.addEventListener("click",$),e.exportReportBtn.addEventListener("click",K),e.qrPreviewBox.addEventListener("click",()=>{e.qrInput.click()}),e.qrInput.addEventListener("change",o=>{const s=o.target.files[0];if(s){const i=new FileReader;i.onload=a=>{const l=a.target.result;n.qrCodeDataUrl=l,localStorage.setItem("qr_code_data_url",l),k()},i.readAsDataURL(s)}}),e.removeQrBtn.addEventListener("click",o=>{o.stopPropagation(),n.qrCodeDataUrl=null,localStorage.removeItem("qr_code_data_url"),e.qrInput.value="",k()}),e.modalCloseBtn.addEventListener("click",S),e.modalOverlay.addEventListener("click",S)}function M(t){n.isProcessing||(t.forEach(r=>{n.files.some(o=>o.name===r.name&&o.size===r.size)||n.files.push(r)}),P(),Q())}function P(){n.files.length>0?(e.fileQueue.classList.remove("hidden"),e.queueList.innerHTML="",n.files.forEach((t,r)=>{const o=(t.size/1048576).toFixed(2),s=document.createElement("div");s.className="queue-item",s.innerHTML=`
                <div class="queue-item-name" title="${t.name}">
                    <i data-lucide="file-text"></i>
                    <span>${t.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="queue-item-size">${o} MB</span>
                    ${n.isProcessing?"":`<button class="queue-item-remove" onclick="removeQueueItem(${r})"><i data-lucide="trash-2"></i></button>`}
                </div>
            `,e.queueList.appendChild(s)}),B()):e.fileQueue.classList.add("hidden")}window.removeQueueItem=function(t){if(n.isProcessing)return;const r=n.files[t].name;n.pages=n.pages.filter(o=>o.fileName!==r),n.files.splice(t,1),P(),n.pages.length===0?$():(j(),w())};async function Q(){if(n.files.length===0||n.isProcessing)return;n.isProcessing=!0,n.cancelRequested=!1,e.statusAlert.classList.remove("hidden"),e.applySettingsBtn.disabled=!0,e.clearAllBtn.classList.add("hidden"),e.exportReportBtn.classList.add("hidden"),P();const t=new Set(n.pages.map(a=>a.fileName)),r=n.files.filter(a=>!t.has(a.name));if(r.length===0){I();return}let o=0;const s=[];e.statusTitle.textContent="กำลังโหลดและเตรียมไฟล์...",e.statusDetail.textContent="โปรดรอสักครู่ขณะระบบตรวจสอบจำนวนหน้าทั้งหมด";try{for(let a=0;a<r.length&&!n.cancelRequested;a++){const l=r[a],d=await G(l),c=await pdfjsLib.getDocument({data:d}).promise;s.push({file:l,pdf:c,numPages:c.numPages}),o+=c.numPages}}catch(a){console.error("Error pre-loading PDFs:",a),alert("ไม่สามารถอ่านไฟล์ PDF บางไฟล์ได้ กรุณาตรวจสอบว่าไฟล์ไม่เสียหายและไม่มีรหัสผ่าน"),I();return}let i=0;e.emptyState.classList.add("hidden"),e.pageGrid.classList.remove("hidden");for(let a=0;a<s.length&&!n.cancelRequested;a++){const{file:l,pdf:d,numPages:c}=s[a];for(let p=1;p<=c&&!n.cancelRequested;p++){i++;const u=i/o*100;e.statusTitle.textContent=`กำลังวิเคราะห์หน้าเอกสาร... (${i}/${o})`,e.statusDetail.textContent=`ไฟล์: ${l.name} (หน้า ${p}/${c})`,e.progressBar.style.width=`${u}%`;try{const g=await d.getPage(p),m=g.getViewport({scale:1}),E=150/m.width,x=g.getViewport({scale:E}),v=document.createElement("canvas"),y=v.getContext("2d");v.width=x.width,v.height=x.height,await g.render({canvasContext:y,viewport:x}).promise;const h=y.getImageData(0,0,v.width,v.height),b=A(h,n.settings.colorThreshold,n.settings.minColorPercent,n.settings.ignoreBackground),C={id:`${l.name.replace(/[^a-z0-9]/gi,"_")}_${p}_${Date.now()}`,fileName:l.name,pageNum:p,width:m.width,height:m.height,imgData:h,isColor:b.isColor,colorPercent:b.colorPercent,colorPixelCount:b.colorPixelCount,userOverride:null};n.pages.push(C),R(C),w()}catch(g){console.error(`Error processing page ${p} of ${l.name}:`,g)}}}I()}function I(){n.isProcessing=!1,e.statusAlert.classList.add("hidden"),e.progressBar.style.width="0%",e.applySettingsBtn.disabled=!1,n.pages.length>0?(e.clearAllBtn.classList.remove("hidden"),e.exportReportBtn.classList.remove("hidden"),e.exportReportBtn.disabled=!1):(e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden")),P(),w()}function G(t){return new Promise((r,o)=>{const s=new FileReader;s.onload=()=>r(s.result),s.onerror=()=>o(s.error),s.readAsArrayBuffer(t)})}function A(t,r,o,s){const i=t.data;let a=0,l=0;for(let u=0;u<i.length;u+=4){const g=i[u],m=i[u+1],f=i[u+2];if(i[u+3]<10)continue;if(s){if(g>215&&m>215&&f>195){const b=g-m,D=m-f,C=g-f;if(b<25&&D<25&&C<35)continue}if(g<25&&m<25&&f<25)continue}l++;const x=Math.abs(g-m),v=Math.abs(m-f),y=Math.abs(f-g);Math.max(x,v,y)>r&&a++}const d=l>0?l:i.length/4,c=a/d*100;return{isColor:c>=o,colorPercent:parseFloat(c.toFixed(2)),colorPixelCount:a}}function w(){let t=n.pages.length,r=0,o=0;n.pages.forEach(l=>{(l.userOverride!==null?l.userOverride==="color":l.isColor)?o++:r++});const s=t>0?Math.round(r/t*100):0,i=t>0?Math.round(o/t*100):0,a=r*n.settings.priceBW+o*n.settings.priceColor;T(e.statTotalPages,t),e.statTotalFiles.textContent=`${n.files.length} ไฟล์`,T(e.statBWPages,r),e.statBWPercent.textContent=`${s}%`,T(e.statColorPages,o),e.statColorPercent.textContent=`${i}%`,e.statTotalCost.textContent=`฿${a.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function T(t,r){const o=parseInt(t.textContent)||0;if(o===r){t.textContent=r;return}const s=400,i=performance.now();function a(l){const d=Math.min((l-i)/s,1),c=d*(2-d),p=Math.floor(o+c*(r-o));t.textContent=p,d<1?requestAnimationFrame(a):t.textContent=r}requestAnimationFrame(a)}function j(){if(e.pageGrid.innerHTML="",n.pages.length===0){e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden");return}e.emptyState.classList.add("hidden"),e.pageGrid.classList.remove("hidden"),n.pages.forEach(t=>{R(t)})}function R(t){const r=t.userOverride!==null?t.userOverride==="color":t.isColor,o=document.createElement("div");o.className=`page-item ${r?"page-color":"page-bw"}`,o.id=`grid-page-${t.id}`;let s=t.fileName;s.length>18&&(s=s.substring(0,15)+"..."),o.innerHTML=`
        <div class="page-thumbnail-wrapper">
            <canvas id="canvas-${t.id}"></canvas>
            <span class="page-number">หน้า ${t.pageNum}</span>
        </div>
        <div class="page-info">
            <span class="page-name" title="${t.fileName}">${s}</span>
            <div class="page-badge-wrapper">
                <span class="badge ${r?"badge-color":"badge-bw"}" id="badge-${t.id}">
                    ${r?"หน้าสี":"ขาวดำ"}
                </span>
            </div>
        </div>
    `,o.addEventListener("click",a=>{a.target.classList.contains("badge")?O(t):Z(t)}),e.pageGrid.appendChild(o);const i=document.getElementById(`canvas-${t.id}`);i&&(i.width=t.imgData.width,i.height=t.imgData.height,i.getContext("2d").putImageData(t.imgData,0,0))}function O(t){const r=t.userOverride!==null?t.userOverride==="color":t.isColor;t.userOverride=r?"bw":"color",N(t),w()}function N(t){const r=t.userOverride!==null?t.userOverride==="color":t.isColor,o=document.getElementById(`grid-page-${t.id}`),s=document.getElementById(`badge-${t.id}`);o&&s&&(o.className=`page-item ${r?"page-color":"page-bw"}`,s.className=`badge ${r?"badge-color":"badge-bw"}`,s.textContent=r?"หน้าสี":"ขาวดำ"),e.previewModal.classList.contains("open")&&L&&L.id===t.id&&z(t)}function V(){n.pages.length!==0&&(e.applySettingsBtn.innerHTML='<div class="spinner" style="width:14px; height:14px; margin:0; display:inline-block; vertical-align:middle;"></div> กำลังวิเคราะห์ใหม่...',e.applySettingsBtn.disabled=!0,setTimeout(()=>{n.pages.forEach(t=>{const r=A(t.imgData,n.settings.colorThreshold,n.settings.minColorPercent,n.settings.ignoreBackground);t.isColor=r.isColor,t.colorPercent=r.colorPercent,t.colorPixelCount=r.colorPixelCount,N(t)}),w(),e.applySettingsBtn.innerHTML='<i data-lucide="refresh-cw"></i> วิเคราะห์ไฟล์ใหม่อีกครั้ง',e.applySettingsBtn.disabled=!1,B()},100))}function $(){n.files=[],n.pages=[],e.emptyState.classList.remove("hidden"),e.pageGrid.classList.add("hidden"),e.pageGrid.innerHTML="",e.fileQueue.classList.add("hidden"),e.queueList.innerHTML="",e.exportReportBtn.classList.add("hidden"),e.clearAllBtn.classList.add("hidden"),e.fileInput.value="",w()}let L=null;function Z(t){L=t,e.previewModal.classList.add("open"),e.modalCanvas.width=t.imgData.width,e.modalCanvas.height=t.imgData.height,e.modalCanvas.getContext("2d").putImageData(t.imgData,0,0),z(t)}function z(t){const r=t.userOverride!==null?t.userOverride==="color":t.isColor;e.modalPageTitle.textContent=`${t.fileName} (หน้า ${t.pageNum})`;const o=(t.width/72).toFixed(2),s=(t.height/72).toFixed(2);e.modalPageSize.textContent=`${Math.round(t.width)} x ${Math.round(t.height)} px (${o}" x ${s}")`,e.modalColorPercent.textContent=`${t.colorPercent}% (${t.colorPixelCount.toLocaleString()} พิกเซล)`,e.modalStatusBadge.textContent=r?"หน้าสี (Color)":"ขาวดำ (Black & White)",e.modalStatusBadge.className=`info-val badge ${r?"badge-color":"badge-bw"}`,e.modalToggleBtn.innerHTML=`<i data-lucide="shuffle"></i> สลับเป็นหน้า${r?"ขาวดำ":"สี"}`,B()}e.modalToggleBtn.addEventListener("click",()=>{L&&O(L)});function S(){e.previewModal.classList.remove("open"),L=null}window.addEventListener("keydown",t=>{t.key==="Escape"&&S()});function q(t){if(!t||t.length===0)return"-";const r=[...t].sort((a,l)=>a-l),o=[];let s=r[0],i=r[0];for(let a=1;a<r.length;a++)r[a]===i+1||(s===i?o.push(`${s}`):o.push(`${s}-${i}`),s=r[a]),i=r[a];return s===i?o.push(`${s}`):o.push(`${s}-${i}`),o.join(", ")}function K(){if(n.pages.length===0)return;const t=new Map;n.pages.forEach(c=>{t.has(c.fileName)||t.set(c.fileName,[]),t.get(c.fileName).push(c)});let r=n.pages.length,o=0,s=0,i="";for(const[c,p]of t.entries()){p.sort((h,b)=>h.pageNum-b.pageNum);const u=[],g=[];p.forEach(h=>{(h.userOverride!==null?h.userOverride==="color":h.isColor)?g.push(h.pageNum):u.push(h.pageNum)});const m=u.length,f=g.length;o+=m,s+=f;const E=m*n.settings.priceBW,x=f*n.settings.priceColor,v=E+x;let y="";m>0&&(y+=`
                <div class="detail-row">
                    <span class="detail-label">หน้าขาวดำ: <span class="detail-pages">${q(u)}</span></span>
                    <span class="detail-price">${m} หน้า x ฿${n.settings.priceBW.toFixed(2)} = ฿${E.toFixed(2)}</span>
                </div>
            `),f>0&&(y+=`
                <div class="detail-row">
                    <span class="detail-label">หน้าสี: <span class="detail-pages">${q(g)}</span></span>
                    <span class="detail-price">${f} หน้า x ฿${n.settings.priceColor.toFixed(2)} = ฿${x.toFixed(2)}</span>
                </div>
            `),i+=`
            <div class="file-item">
                <div class="file-name">${J(c)}</div>
                ${y}
                <div class="file-subtotal">
                    <span>รวมไฟล์นี้: ${p.length} หน้า</span>
                    <strong>฿${v.toFixed(2)}</strong>
                </div>
            </div>
            <div class="divider-dashed"></div>
        `}const a=o*n.settings.priceBW+s*n.settings.priceColor,l="REC-"+new Date().toISOString().slice(2,10).replace(/-/g,"")+"-"+Math.floor(1e3+Math.random()*9e3),d=window.open("","_blank");d.document.write(`
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
                    <span>${o} หน้า (@ ฿${n.settings.priceBW.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าสีรวม:</span>
                    <span>${s} หน้า (@ ฿${n.settings.priceColor.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าทั้งหมด:</span>
                    <span>${r} หน้า</span>
                </div>
                
                <div class="divider-double"></div>
                
                <div class="total-row grand-total">
                    <span>ยอดสุทธิรวมทั้งสิ้น:</span>
                    <span class="total-price">฿${a.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
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
    `),d.document.close()}function J(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
