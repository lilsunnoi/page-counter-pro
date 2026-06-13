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
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
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
        
        // 3. Set role (username 'admin' gets admin role, others get 'user')
        const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';
        
        // 4. Save user to database
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, hashedPassword)
            .input('role', sql.NVarChar, role)
            .query('INSERT INTO Users (Username, PasswordHash, Role) VALUES (@username, @password, @role)');
            
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
            username: user.Username,
            role: user.Role || 'user'
        });
        
    } catch (err) {
        console.error('Error during login: ', err);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์บนฐานข้อมูล' });
    }
});

// API endpoint: Add service usage log
app.post('/api/logs', async (req, res) => {
    const { username, fileName, totalPages, bwPages, colorPages, estimatedCost } = req.body;
    
    if (!username || !fileName || totalPages === undefined || bwPages === undefined || colorPages === undefined || estimatedCost === undefined) {
        return res.status(400).json({ message: 'ข้อมูลประวัติการใช้งานไม่ครบถ้วน' });
    }
    
    try {
        const pool = await poolPromise;
        
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('fileName', sql.NVarChar, fileName)
            .input('totalPages', sql.Int, totalPages)
            .input('bwPages', sql.Int, bwPages)
            .input('colorPages', sql.Int, colorPages)
            .input('estimatedCost', sql.Decimal(10, 2), estimatedCost)
            .query('INSERT INTO UsageLogs (Username, FileName, TotalPages, BWPages, ColorPages, EstimatedCost) VALUES (@username, @fileName, @totalPages, @bwPages, @colorPages, @estimatedCost)');
            
        return res.status(201).json({ message: 'บันทึกประวัติการใช้บริการสำเร็จ' });
    } catch (err) {
        console.error('Error saving usage log:', err);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกประวัติการใช้บริการบนฐานข้อมูล' });
    }
});

// API endpoint: Get admin dashboard statistics (Role restricted)
app.post('/api/admin/dashboard', async (req, res) => {
    const { requestorUsername } = req.body;
    
    if (!requestorUsername) {
        return res.status(400).json({ message: 'กรุณาระบุชื่อผู้ร้องขอข้อมูล' });
    }
    
    try {
        const pool = await poolPromise;
        
        // 1. Verify if the requestor is an admin
        const userResult = await pool.request()
            .input('username', sql.NVarChar, requestorUsername)
            .query('SELECT Role FROM Users WHERE Username = @username');
            
        if (userResult.recordset.length === 0 || userResult.recordset[0].Role !== 'admin') {
            return res.status(403).json({ message: 'คุณไม่มีสิทธิ์ในการเข้าถึงข้อมูลแผงควบคุมนี้' });
        }
        
        // 2. Fetch stats
        const statsQuery = `
            SELECT 
                ISNULL(COUNT(*), 0) AS TotalFiles, 
                ISNULL(SUM(TotalPages), 0) AS TotalPages, 
                ISNULL(SUM(BWPages), 0) AS TotalBWPages,
                ISNULL(SUM(ColorPages), 0) AS TotalColorPages,
                ISNULL(SUM(EstimatedCost), 0) AS TotalRevenue 
            FROM UsageLogs
        `;
        const statsResult = await pool.request().query(statsQuery);
        const stats = statsResult.recordset[0];
        
        // 3. Fetch recent logs (last 50)
        const logsQuery = `
            SELECT TOP 50 * 
            FROM UsageLogs 
            ORDER BY CreatedAt DESC
        `;
        const logsResult = await pool.request().query(logsQuery);
        
        // 4. Fetch users list
        const usersQuery = `
            SELECT Username, Role, CreatedAt 
            FROM Users 
            ORDER BY CreatedAt DESC
        `;
        const usersResult = await pool.request().query(usersQuery);
        
        return res.status(200).json({
            stats: {
                totalFiles: stats.TotalFiles,
                totalPages: stats.TotalPages,
                totalBWPages: stats.TotalBWPages,
                totalColorPages: stats.TotalColorPages,
                totalRevenue: stats.TotalRevenue
            },
            recentLogs: logsResult.recordset.map(log => ({
                id: log.Id,
                username: log.Username,
                fileName: log.FileName,
                totalPages: log.TotalPages,
                bwPages: log.BWPages,
                colorPages: log.ColorPages,
                estimatedCost: log.EstimatedCost,
                createdAt: log.CreatedAt
            })),
            users: usersResult.recordset.map(user => ({
                username: user.Username,
                role: user.Role,
                createdAt: user.CreatedAt
            }))
        });
        
    } catch (err) {
        console.error('Error fetching admin dashboard statistics:', err);
        return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลแผงควบคุมบนฐานข้อมูล' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend API Server running on port ${PORT}`);
});
