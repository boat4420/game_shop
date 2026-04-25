import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root', // Default XAMPP user
  password: '',   // Default XAMPP password is empty
  database: 'game_shop1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
