// ==========================================
// GAMES API ROUTE
// ==========================================
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// ------------------------------------------
// [GET] ดึงข้อมูลเกมทั้งหมดจากฐานข้อมูล
// ------------------------------------------
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM games ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ------------------------------------------
// [POST] เพิ่มข้อมูลเกมใหม่ลงในฐานข้อมูล
// ------------------------------------------
export async function POST(request) {
  try {
    const { name, price, original_price, category, image_url, is_new } = await request.json();
    const [result] = await pool.query(
      'INSERT INTO games (name, price, original_price, category, image_url, is_new) VALUES (?, ?, ?, ?, ?, ?)',
      [name, price, original_price || price, category, image_url, is_new ? 1 : 0]
    );
    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
