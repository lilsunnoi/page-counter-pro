# PDF Page Color Counter (PageCounter Pro)

[English Version Below / ภาษาอังกฤษอยู่ด้านล่าง]

แอปพลิเคชันเว็บแบบ Single Page Application (SPA) สำหรับวิเคราะห์หน้าเอกสาร PDF เพื่อตรวจสอบความแตกต่างของสีพิกเซล คัดแยกหน้าสีและขาวดำโดยอัตโนมัติ คำนวณราคาค่าพิมพ์ และส่งออกรายงานสรุปผลการวิเคราะห์

---

## 🇹🇭 ภาษาไทย

### คุณสมบัติเด่น (Features)
- 📂 **ลากและวางไฟล์ (Drag & Drop)**: สามารถเลือกและนำไฟล์ PDF หลายไฟล์มาวิเคราะห์พร้อมกันได้อย่างง่ายดาย
- ⚡ **ประมวลผลบนเบราว์เซอร์ 100%**: มั่นใจได้ในความปลอดภัยของข้อมูล ไฟล์ PDF จะประมวลผลบนคอมพิวเตอร์ของคุณโดยตรง ไม่มีการอัปโหลดขึ้นเซิร์ฟเวอร์
- 🔬 **อัลกอริทึมจำแนกสีที่ยืดหยุ่น**:
  - ตรวจสอบความแตกต่างระหว่างช่องสี (RGB Variance)
  - มีระบบข้ามสีพื้นหลังของกระดาษสแกน (Ignore Scan Paper Background) ช่วยลดข้อผิดพลาดจากกระดาษสีเหลือง/ครีม/เทาอ่อน
  - สามารถปรับความเข้มข้นของสี (Threshold) และสัดส่วนสีขั้นต่ำต่อหน้า (%) ได้แบบเรียลไทม์
- 🔄 **ปรับค่าใหม่ได้ทันที (Instant Re-analysis)**: เปลี่ยนค่ากำหนดแล้วประมวลผลใหม่จากข้อมูลพิกเซลที่แคชไว้ในทันทีโดยไม่ต้องโหลดหรือประมวลผลไฟล์ PDF ซ้ำ
- ✏️ **เปลี่ยนประเภทเองด้วยมือ (Manual Override)**: ผู้ใช้สามารถคลิกเพื่อสลับประเภทหน้าสี/ขาวดำได้เองหากระบบจำแนกผิดพลาด ยอดราคารวมและสถิติจะอัปเดตแบบเรียลไทม์
- 💰 **คำนวณราคารวม (Pricing Calculator)**: ตั้งราคาต่อหน้าแยกตามหน้าขาวดำและหน้าสีเพื่อประเมินงบประมาณการพิมพ์
- 🖨️ **ออกรายงาน (Export HTML & PDF)**: สามารถเปิดหน้าพิมพ์รายงานสรุปผลการวิเคราะห์ที่สวยงาม เพื่อสั่งพิมพ์หรือบันทึกเป็นไฟล์ PDF ได้ทันที
- 🌓 **ระบบธีม (Dark/Light Theme)**: รองรับการสลับธีมมืดและธีมสว่างตามความต้องการ

### วิธีการเริ่มใช้งาน (How to Run)

#### ทางเลือกที่ 1: รันด้วย Vite (แนะนำ)
ต้องการ Node.js ติดตั้งอยู่ในเครื่องของคุณ:
```bash
# ติดตั้ง dependencies (Vite)
npm install

# รันเซิร์ฟเวอร์สำหรับพัฒนา
npm run dev
```
จากนั้นเปิดบราวเซอร์ไปที่: **http://localhost:5173**

#### ทางเลือกที่ 2: รันผ่าน http-server (ไม่ต้องติดตั้งในเครื่อง)
```bash
# รันเซิร์ฟเวอร์แบบทางเลือกด่วนผ่าน npx
npx http-server -p 8080
```
จากนั้นเปิดบราวเซอร์ไปที่: **http://localhost:8080**

---

## 🇺🇸 English

A lightweight client-side Single Page Application (SPA) that scans PDF documents, analyzes pixel-level colors to automatically classify pages as either **Color** or **Black & White**, estimates printing costs, and exports summaries.

### Features
- 📂 **Drag & Drop**: Easily select and analyze multiple PDF files simultaneously.
- ⚡ **100% Client-Side Processing**: High privacy. Your PDF files are processed directly on your browser and are never uploaded to any server.
- 🔬 **Advanced Color Classification**:
  - Checks RGB channel variance at the pixel level.
  - Optional **Ignore Scan Paper Background** filter to ignore aged, yellow, cream, or light grey scan background noises.
  - Adjustable color detection sensitivity (Threshold) and minimum color ratio per page (%).
- 🔄 **Instant Re-analysis**: Adjust settings and re-classify cached pixels instantly without re-rendering the PDF.
- ✏️ **Manual Override**: Toggle page classifications manually (Color <-> B&W) directly from the dashboard grid or page preview. Stats and price calculations update in real-time.
- 💰 **Pricing Calculator**: Set individual printing rates for black & white and color pages.
- 🖨️ **Export Report (HTML & PDF)**: Generate and print a professional, clean invoice/summary report or save it as a PDF.
- 🌓 **Dark & Light Mode**: Seamless UI theme toggling support.

### How to Run

#### Option 1: Run with Vite (Recommended)
Requires Node.js installed on your machine:
```bash
# Install dependencies (Vite)
npm install

# Run dev server
npm run dev
```
Then open your browser at: **http://localhost:5173**

#### Option 2: Run via http-server (Quick start)
```bash
# Spin up a quick local server
npx http-server -p 8080
```
Then open your browser at: **http://localhost:8080**

---

## 🛠️ Technology Stack
- **HTML5 & Vanilla CSS**: Clean layouts with glassmorphic cards and modern variable-driven theme engine.
- **JavaScript (ES6+)**: Core logic, image parsing, and color variance algorithms.
- **PDF.js**: Mozilla's robust PDF rendering library.
- **Lucide Icons**: Modern vector icon pack.
