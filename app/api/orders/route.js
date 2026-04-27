// ==========================================
// ORDERS API ROUTE
// ==========================================
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

// ------------------------------------------
// [POST] สร้างคำสั่งซื้อใหม่ (Checkout)
// ------------------------------------------
export async function POST(request) {
  try {
    // 1. ดึงข้อมูล Session เพื่อดูว่าเป็น User คนไหน (ถ้ามี)
    const session = await getSession();
    const userId = session ? session.id : null;

    const { items, total_amount, payment_method, shipping_details } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // 2. บันทึกข้อมูล Order หลักลงในฐานข้อมูล
    const [orderResult] = await pool.query(
      'INSERT INTO orders (user_id, total_amount, payment_method, status) VALUES (?, ?, ?, ?)',
      [userId, total_amount, payment_method, 'completed'] // สมมติว่าชำระเงินสำเร็จทันที
    );
    
    const orderId = orderResult.insertId;

    // 3. บันทึกรายการสินค้าแต่ละชิ้นใน Order (Order Items)
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, game_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.quantity, item.price]
      );
    }

    return NextResponse.json({ message: 'Order placed successfully', orderId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
