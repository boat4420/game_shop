import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Find user
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Create session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({ id: user.id, username: user.username, role: user.role, expires });

    // Save session in cookie
    const cookieStore = await cookies();
    cookieStore.set('session', session, { 
      expires, 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/' 
    });

    return NextResponse.json({ 
      user: { id: user.id, username: user.username, role: user.role } 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
