(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";const n={theme:"dark",files:[],pages:[],isProcessing:!1,cancelRequested:!1,settings:{colorThreshold:18,minColorPercent:.3,ignoreBackground:!0,priceBW:1,priceColor:5}},t={body:document.body,themeToggleBtn:document.getElementById("themeToggleBtn"),dropZone:document.getElementById("dropZone"),fileInput:document.getElementById("fileInput"),fileQueue:document.getElementById("fileQueue"),queueList:document.getElementById("queueList"),statusAlert:document.getElementById("statusAlert"),statusTitle:document.getElementById("statusTitle"),statusDetail:document.getElementById("statusDetail"),progressBar:document.getElementById("progressBar"),cancelProcessBtn:document.getElementById("cancelProcessBtn"),colorThreshold:document.getElementById("colorThreshold"),minColorPercent:document.getElementById("minColorPercent"),ignoreBackground:document.getElementById("ignoreBackground"),thresholdVal:document.getElementById("thresholdVal"),percentVal:document.getElementById("percentVal"),priceBW:document.getElementById("priceBW"),priceColor:document.getElementById("priceColor"),applySettingsBtn:document.getElementById("applySettingsBtn"),statTotalPages:document.getElementById("statTotalPages"),statTotalFiles:document.getElementById("statTotalFiles"),statBWPages:document.getElementById("statBWPages"),statBWPercent:document.getElementById("statBWPercent"),statColorPages:document.getElementById("statColorPages"),statColorPercent:document.getElementById("statColorPercent"),statTotalCost:document.getElementById("statTotalCost"),emptyState:document.getElementById("emptyState"),pageGrid:document.getElementById("pageGrid"),exportReportBtn:document.getElementById("exportReportBtn"),clearAllBtn:document.getElementById("clearAllBtn"),previewModal:document.getElementById("previewModal"),modalOverlay:document.getElementById("modalOverlay"),modalCloseBtn:document.getElementById("modalCloseBtn"),modalCanvas:document.getElementById("modalCanvas"),modalPageTitle:document.getElementById("modalPageTitle"),modalPageSize:document.getElementById("modalPageSize"),modalColorPercent:document.getElementById("modalColorPercent"),modalStatusBadge:document.getElementById("modalStatusBadge"),modalToggleBtn:document.getElementById("modalToggleBtn")};document.addEventListener("DOMContentLoaded",()=>{A(),q(),L()});function L(){window.lucide&&window.lucide.createIcons()}function A(){const e=localStorage.getItem("theme");e?n.theme=e:window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches&&(n.theme="light"),D()}function D(){n.theme==="light"?(t.body.classList.remove("dark-theme"),t.body.classList.add("light-theme")):(t.body.classList.remove("light-theme"),t.body.classList.add("dark-theme")),localStorage.setItem("theme",n.theme)}function q(){t.themeToggleBtn.addEventListener("click",()=>{n.theme=n.theme==="dark"?"light":"dark",D()});const e=o=>{o.preventDefault(),o.stopPropagation()};["dragenter","dragover","dragleave","drop"].forEach(o=>{t.dropZone.addEventListener(o,e,!1)}),["dragenter","dragover"].forEach(o=>{t.dropZone.addEventListener(o,()=>t.dropZone.classList.add("dragover"),!1)}),["dragleave","drop"].forEach(o=>{t.dropZone.addEventListener(o,()=>t.dropZone.classList.remove("dragover"),!1)}),t.dropZone.addEventListener("drop",o=>{const i=o.dataTransfer,a=Array.from(i.files).filter(s=>s.type==="application/pdf");a.length>0&&M(a)}),t.dropZone.addEventListener("click",()=>{t.fileInput.click()}),t.fileInput.addEventListener("change",o=>{const i=Array.from(o.target.files).filter(a=>a.type==="application/pdf");i.length>0&&M(i)}),t.colorThreshold.addEventListener("input",o=>{t.thresholdVal.textContent=o.target.value,n.settings.colorThreshold=parseInt(o.target.value)}),t.minColorPercent.addEventListener("input",o=>{t.percentVal.textContent=parseFloat(o.target.value).toFixed(2)+"%",n.settings.minColorPercent=parseFloat(o.target.value)}),t.ignoreBackground.addEventListener("change",o=>{n.settings.ignoreBackground=o.target.checked}),t.priceBW.addEventListener("input",o=>{n.settings.priceBW=parseFloat(o.target.value)||0,y()}),t.priceColor.addEventListener("input",o=>{n.settings.priceColor=parseFloat(o.target.value)||0,y()}),t.applySettingsBtn.addEventListener("click",()=>{n.pages.length!==0&&Q()}),t.cancelProcessBtn.addEventListener("click",()=>{n.cancelRequested=!0,t.statusTitle.textContent="กำลังยกเลิกการทำงาน..."}),t.clearAllBtn.addEventListener("click",W),t.exportReportBtn.addEventListener("click",Z),t.modalCloseBtn.addEventListener("click",k),t.modalOverlay.addEventListener("click",k)}function M(e){n.isProcessing||(e.forEach(o=>{n.files.some(i=>i.name===o.name&&i.size===o.size)||n.files.push(o)}),E(),H())}function E(){n.files.length>0?(t.fileQueue.classList.remove("hidden"),t.queueList.innerHTML="",n.files.forEach((e,o)=>{const i=(e.size/1048576).toFixed(2),a=document.createElement("div");a.className="queue-item",a.innerHTML=`
                <div class="queue-item-name" title="${e.name}">
                    <i data-lucide="file-text"></i>
                    <span>${e.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="queue-item-size">${i} MB</span>
                    ${n.isProcessing?"":`<button class="queue-item-remove" onclick="removeQueueItem(${o})"><i data-lucide="trash-2"></i></button>`}
                </div>
            `,t.queueList.appendChild(a)}),L()):t.fileQueue.classList.add("hidden")}window.removeQueueItem=function(e){if(n.isProcessing)return;const o=n.files[e].name;n.pages=n.pages.filter(i=>i.fileName!==o),n.files.splice(e,1),E(),n.pages.length===0?W():(j(),y())};async function H(){if(n.files.length===0||n.isProcessing)return;n.isProcessing=!0,n.cancelRequested=!1,t.statusAlert.classList.remove("hidden"),t.applySettingsBtn.disabled=!0,t.clearAllBtn.classList.add("hidden"),t.exportReportBtn.classList.add("hidden"),E();const e=new Set(n.pages.map(r=>r.fileName)),o=n.files.filter(r=>!e.has(r.name));if(o.length===0){I();return}let i=0;const a=[];t.statusTitle.textContent="กำลังโหลดและเตรียมไฟล์...",t.statusDetail.textContent="โปรดรอสักครู่ขณะระบบตรวจสอบจำนวนหน้าทั้งหมด";try{for(let r=0;r<o.length&&!n.cancelRequested;r++){const l=o[r],m=await G(l),d=await pdfjsLib.getDocument({data:m}).promise;a.push({file:l,pdf:d,numPages:d.numPages}),i+=d.numPages}}catch(r){console.error("Error pre-loading PDFs:",r),alert("ไม่สามารถอ่านไฟล์ PDF บางไฟล์ได้ กรุณาตรวจสอบว่าไฟล์ไม่เสียหายและไม่มีรหัสผ่าน"),I();return}let s=0;t.emptyState.classList.add("hidden"),t.pageGrid.classList.remove("hidden");for(let r=0;r<a.length&&!n.cancelRequested;r++){const{file:l,pdf:m,numPages:d}=a[r];for(let g=1;g<=d&&!n.cancelRequested;g++){s++;const u=s/i*100;t.statusTitle.textContent=`กำลังวิเคราะห์หน้าเอกสาร... (${s}/${i})`,t.statusDetail.textContent=`ไฟล์: ${l.name} (หน้า ${g}/${d})`,t.progressBar.style.width=`${u}%`;try{const c=await m.getPage(g),p=c.getViewport({scale:1}),C=150/p.width,v=c.getViewport({scale:C}),x=document.createElement("canvas"),b=x.getContext("2d");x.width=v.width,x.height=v.height,await c.render({canvasContext:b,viewport:v}).promise;const h=b.getImageData(0,0,x.width,x.height),w=F(h,n.settings.colorThreshold,n.settings.minColorPercent,n.settings.ignoreBackground),P={id:`${l.name.replace(/[^a-z0-9]/gi,"_")}_${g}_${Date.now()}`,fileName:l.name,pageNum:g,width:p.width,height:p.height,imgData:h,isColor:w.isColor,colorPercent:w.colorPercent,colorPixelCount:w.colorPixelCount,userOverride:null};n.pages.push(P),z(P),y()}catch(c){console.error(`Error processing page ${g} of ${l.name}:`,c)}}}I()}function I(){n.isProcessing=!1,t.statusAlert.classList.add("hidden"),t.progressBar.style.width="0%",t.applySettingsBtn.disabled=!1,n.pages.length>0?(t.clearAllBtn.classList.remove("hidden"),t.exportReportBtn.classList.remove("hidden"),t.exportReportBtn.disabled=!1):(t.emptyState.classList.remove("hidden"),t.pageGrid.classList.add("hidden")),E(),y()}function G(e){return new Promise((o,i)=>{const a=new FileReader;a.onload=()=>o(a.result),a.onerror=()=>i(a.error),a.readAsArrayBuffer(e)})}function F(e,o,i,a){const s=e.data;let r=0,l=0;for(let u=0;u<s.length;u+=4){const c=s[u],p=s[u+1],f=s[u+2];if(s[u+3]<10)continue;if(a){if(c>215&&p>215&&f>195){const w=c-p,T=p-f,P=c-f;if(w<25&&T<25&&P<35)continue}if(c<25&&p<25&&f<25)continue}l++;const v=Math.abs(c-p),x=Math.abs(p-f),b=Math.abs(f-c);Math.max(v,x,b)>o&&r++}const m=l>0?l:s.length/4,d=r/m*100;return{isColor:d>=i,colorPercent:parseFloat(d.toFixed(2)),colorPixelCount:r}}function y(){let e=n.pages.length,o=0,i=0;n.pages.forEach(l=>{(l.userOverride!==null?l.userOverride==="color":l.isColor)?i++:o++});const a=e>0?Math.round(o/e*100):0,s=e>0?Math.round(i/e*100):0,r=o*n.settings.priceBW+i*n.settings.priceColor;$(t.statTotalPages,e),t.statTotalFiles.textContent=`${n.files.length} ไฟล์`,$(t.statBWPages,o),t.statBWPercent.textContent=`${a}%`,$(t.statColorPages,i),t.statColorPercent.textContent=`${s}%`,t.statTotalCost.textContent=`฿${r.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}`}function $(e,o){const i=parseInt(e.textContent)||0;if(i===o){e.textContent=o;return}const a=400,s=performance.now();function r(l){const m=Math.min((l-s)/a,1),d=m*(2-m),g=Math.floor(i+d*(o-i));e.textContent=g,m<1?requestAnimationFrame(r):e.textContent=o}requestAnimationFrame(r)}function j(){if(t.pageGrid.innerHTML="",n.pages.length===0){t.emptyState.classList.remove("hidden"),t.pageGrid.classList.add("hidden");return}t.emptyState.classList.add("hidden"),t.pageGrid.classList.remove("hidden"),n.pages.forEach(e=>{z(e)})}function z(e){const o=e.userOverride!==null?e.userOverride==="color":e.isColor,i=document.createElement("div");i.className=`page-item ${o?"page-color":"page-bw"}`,i.id=`grid-page-${e.id}`;let a=e.fileName;a.length>18&&(a=a.substring(0,15)+"..."),i.innerHTML=`
        <div class="page-thumbnail-wrapper">
            <canvas id="canvas-${e.id}"></canvas>
            <span class="page-number">หน้า ${e.pageNum}</span>
        </div>
        <div class="page-info">
            <span class="page-name" title="${e.fileName}">${a}</span>
            <div class="page-badge-wrapper">
                <span class="badge ${o?"badge-color":"badge-bw"}" id="badge-${e.id}">
                    ${o?"หน้าสี":"ขาวดำ"}
                </span>
            </div>
        </div>
    `,i.addEventListener("click",r=>{r.target.classList.contains("badge")?N(e):V(e)}),t.pageGrid.appendChild(i);const s=document.getElementById(`canvas-${e.id}`);s&&(s.width=e.imgData.width,s.height=e.imgData.height,s.getContext("2d").putImageData(e.imgData,0,0))}function N(e){const o=e.userOverride!==null?e.userOverride==="color":e.isColor;e.userOverride=o?"bw":"color",O(e),y()}function O(e){const o=e.userOverride!==null?e.userOverride==="color":e.isColor,i=document.getElementById(`grid-page-${e.id}`),a=document.getElementById(`badge-${e.id}`);i&&a&&(i.className=`page-item ${o?"page-color":"page-bw"}`,a.className=`badge ${o?"badge-color":"badge-bw"}`,a.textContent=o?"หน้าสี":"ขาวดำ"),t.previewModal.classList.contains("open")&&B&&B.id===e.id&&R(e)}function Q(){n.pages.length!==0&&(t.applySettingsBtn.innerHTML='<div class="spinner" style="width:14px; height:14px; margin:0; display:inline-block; vertical-align:middle;"></div> กำลังวิเคราะห์ใหม่...',t.applySettingsBtn.disabled=!0,setTimeout(()=>{n.pages.forEach(e=>{const o=F(e.imgData,n.settings.colorThreshold,n.settings.minColorPercent,n.settings.ignoreBackground);e.isColor=o.isColor,e.colorPercent=o.colorPercent,e.colorPixelCount=o.colorPixelCount,O(e)}),y(),t.applySettingsBtn.innerHTML='<i data-lucide="refresh-cw"></i> วิเคราะห์ไฟล์ใหม่อีกครั้ง',t.applySettingsBtn.disabled=!1,L()},100))}function W(){n.files=[],n.pages=[],t.emptyState.classList.remove("hidden"),t.pageGrid.classList.add("hidden"),t.pageGrid.innerHTML="",t.fileQueue.classList.add("hidden"),t.queueList.innerHTML="",t.exportReportBtn.classList.add("hidden"),t.clearAllBtn.classList.add("hidden"),t.fileInput.value="",y()}let B=null;function V(e){B=e,t.previewModal.classList.add("open"),t.modalCanvas.width=e.imgData.width,t.modalCanvas.height=e.imgData.height,t.modalCanvas.getContext("2d").putImageData(e.imgData,0,0),R(e)}function R(e){const o=e.userOverride!==null?e.userOverride==="color":e.isColor;t.modalPageTitle.textContent=`${e.fileName} (หน้า ${e.pageNum})`;const i=(e.width/72).toFixed(2),a=(e.height/72).toFixed(2);t.modalPageSize.textContent=`${Math.round(e.width)} x ${Math.round(e.height)} px (${i}" x ${a}")`,t.modalColorPercent.textContent=`${e.colorPercent}% (${e.colorPixelCount.toLocaleString()} พิกเซล)`,t.modalStatusBadge.textContent=o?"หน้าสี (Color)":"ขาวดำ (Black & White)",t.modalStatusBadge.className=`info-val badge ${o?"badge-color":"badge-bw"}`,t.modalToggleBtn.innerHTML=`<i data-lucide="shuffle"></i> สลับเป็นหน้า${o?"ขาวดำ":"สี"}`,L()}t.modalToggleBtn.addEventListener("click",()=>{B&&N(B)});function k(){t.previewModal.classList.remove("open"),B=null}window.addEventListener("keydown",e=>{e.key==="Escape"&&k()});function S(e){if(!e||e.length===0)return"-";const o=[...e].sort((r,l)=>r-l),i=[];let a=o[0],s=o[0];for(let r=1;r<o.length;r++)o[r]===s+1||(a===s?i.push(`${a}`):i.push(`${a}-${s}`),a=o[r]),s=o[r];return a===s?i.push(`${a}`):i.push(`${a}-${s}`),i.join(", ")}function Z(){if(n.pages.length===0)return;const e=new Map;n.pages.forEach(d=>{e.has(d.fileName)||e.set(d.fileName,[]),e.get(d.fileName).push(d)});let o=n.pages.length,i=0,a=0,s="";for(const[d,g]of e.entries()){g.sort((h,w)=>h.pageNum-w.pageNum);const u=[],c=[];g.forEach(h=>{(h.userOverride!==null?h.userOverride==="color":h.isColor)?c.push(h.pageNum):u.push(h.pageNum)});const p=u.length,f=c.length;i+=p,a+=f;const C=p*n.settings.priceBW,v=f*n.settings.priceColor,x=C+v;let b="";p>0&&(b+=`
                <div class="detail-row">
                    <span class="detail-label">หน้าขาวดำ: <span class="detail-pages">${S(u)}</span></span>
                    <span class="detail-price">${p} หน้า x ฿${n.settings.priceBW.toFixed(2)} = ฿${C.toFixed(2)}</span>
                </div>
            `),f>0&&(b+=`
                <div class="detail-row">
                    <span class="detail-label">หน้าสี: <span class="detail-pages">${S(c)}</span></span>
                    <span class="detail-price">${f} หน้า x ฿${n.settings.priceColor.toFixed(2)} = ฿${v.toFixed(2)}</span>
                </div>
            `),s+=`
            <div class="file-item">
                <div class="file-name">${U(d)}</div>
                ${b}
                <div class="file-subtotal">
                    <span>รวมไฟล์นี้: ${g.length} หน้า</span>
                    <strong>฿${x.toFixed(2)}</strong>
                </div>
            </div>
            <div class="divider-dashed"></div>
        `}const r=i*n.settings.priceBW+a*n.settings.priceColor,l="REC-"+new Date().toISOString().slice(2,10).replace(/-/g,"")+"-"+Math.floor(1e3+Math.random()*9e3),m=window.open("","_blank");m.document.write(`
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
                    ${s}
                </div>
                
                <div class="total-row">
                    <span>จำนวนไฟล์ทั้งหมด:</span>
                    <span>${e.size} ไฟล์</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าขาวดำรวม:</span>
                    <span>${i} หน้า (@ ฿${n.settings.priceBW.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าสีรวม:</span>
                    <span>${a} หน้า (@ ฿${n.settings.priceColor.toFixed(2)})</span>
                </div>
                <div class="total-row">
                    <span>จำนวนหน้าทั้งหมด:</span>
                    <span>${o} หน้า</span>
                </div>
                
                <div class="divider-double"></div>
                
                <div class="total-row grand-total">
                    <span>ยอดสุทธิรวมทั้งสิ้น:</span>
                    <span class="total-price">฿${r.toLocaleString("th-TH",{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                </div>
                
                <div class="receipt-footer">
                    <div class="thanks-msg">ขอบคุณที่ใช้บริการ PageCounter Pro</div>
                    <div>ความถูกต้องผ่านการคำนวณแบบแยกหน้าตามสีพิกเซลจริง</div>
                    <div class="barcode-placeholder"></div>
                    <div style="font-size: 10px; margin-top: 5px; color: #cbd5e1;">* ${l} *</div>
                </div>
            </div>
        </body>
        </html>
    `),m.document.close()}function U(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
