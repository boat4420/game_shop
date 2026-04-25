import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { name, price, original_price, category, image_url, is_new } = await request.json();
    await pool.query(
      'UPDATE games SET name = ?, price = ?, original_price = ?, category = ?, image_url = ?, is_new = ? WHERE id = ?',
      [name, price, original_price, category, image_url, is_new ? 1 : 0, id]
    );
    return NextResponse.json({ message: 'Game updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await pool.query('DELETE FROM games WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Game deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
