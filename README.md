# ระบบจัดการร้านชา (Tea Shop Management System)

ระบบจุดขาย (POS) และแผงควบคุม (Dashboard) สำหรับร้านขายชาและเครื่องดื่ม รองรับระบบพนักงาน การจัดการสินค้า และการดูยอดขายแบบเรียลไทม์

## ความสามารถหลัก
- **POS System:** ระบบสั่งซื้อและคำนวณเงิน
- **Dashboard:** ดูยอดขาย, จำนวนบิล และออเดอร์ล่าสุดแบบเรียลไทม์ พร้อมกราฟสวยงาม
- **PDF Export:** สามารถกรองช่วงวันที่ที่ต้องการและส่งออกยอดขายเป็นไฟล์ PDF ได้
- **User Management:** ระบบเข้าสู่ระบบ (Login) การจัดการพนักงาน และการกำหนดสิทธิ์
- **Dark Mode:** รองรับทั้งโหมดสว่างและโหมดมืด เพื่อการใช้งานที่สบายตา

## วิธีการรันระบบในเครื่อง (Local)

1. ติดตั้ง Dependencies ฝั่ง Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

2. รัน Frontend (Vite)
```bash
# (ในโฟลเดอร์นอกสุด)
npm install
npm run dev
```
