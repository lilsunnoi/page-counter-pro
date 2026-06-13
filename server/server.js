const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow Frontend requests (CORS)

// SQL Server Connection Configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Used for Azure SQL or secure connections
        trustServerCertificate: true, // Crucial for local development / testing
        instanceName: process.env.DB_INSTANCE || undefined // Support for named instances
    }
};

// Establish connection pool
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MS SQL Server successfully.');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed! error: ', err);
        process.exit(1);
    });

// API endpoint: Register new user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน' });
    }
    
    try {
        const pool = await poolPromise;
        
        // 1. Check if user already exists
        const checkResult = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE Username = @username');
            
        if (checkResult.recordset.length > 0) {
            return res.status(400).json({ message: 'ชื่อผู้ใช้งานนี้ถูกใช้งานแล้ว กรุณาใช้ชื่ออื่น' });
        }
        
        // 2. Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // 3. Save user to database
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO Users (Username, PasswordHash) VALUES (@username, @password)');
            
        return res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ' });
        
    } catch (err) {
        console.error('Error during registration: ', err);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสมัครสมาชิกบนฐานข้อมูล' });
    }
});

// API endpoint: Login user
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน' });
    }
    
    try {
        const pool = await poolPromise;
        
        // 1. Find user by username
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE Username = @username');
            
        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
        }
        
        const user = result.recordset[0];
        
        // 2. Validate password
        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
        }
        
        return res.status(200).json({ 
            message: 'เข้าสู่ระบบสำเร็จ', 
            username: user.Username 
        });
        
    } catch (err) {
        console.error('Error during login: ', err);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์บนฐานข้อมูล' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend API Server running on port ${PORT}`);
});
