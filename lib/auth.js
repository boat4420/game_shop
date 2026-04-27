// ==========================================
// AUTHENTICATION & JWT UTILITIES
// ==========================================
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// ตั้งค่า Secret Key สำหรับเข้ารหัส Token
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-very-secret-key-change-this'
);

// ------------------------------------------
// ฟังก์ชันสำหรับการเข้ารหัส (Encrypt)
// ------------------------------------------
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
}

// ------------------------------------------
// ฟังก์ชันสำหรับการถอดรหัส (Decrypt)
// ------------------------------------------
export async function decrypt(input) {
  const { payload } = await jwtVerify(input, secret, {
    algorithms: ['HS256'],
  });
  return payload;
}

// ------------------------------------------
// ฟังก์ชันสำหรับดึงข้อมูล Session ปัจจุบัน
// ------------------------------------------
export async function getSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (err) {
    return null;
  }
}
