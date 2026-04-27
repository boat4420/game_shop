// ==========================================
// DATABASE CONFIGURATION & CONNECTION
// ==========================================
import mysql from 'mysql2/promise';

// สร้าง Connection Pool เพื่อจัดการการเชื่อมต่อ MySQL
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root', // User มาตรฐานของ XAMPP
  password: '',   // Password มาตรฐานของ XAMPP (ปกติจะว่างไว้)
  database: 'game_shop1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
