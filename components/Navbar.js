'use client';
/**
 * ============================================================
 * NAVBAR COMPONENT
 * ============================================================
 * แถบเมนูนำทางหลักของเว็บไซต์ (Navigation Bar)
 * หน้าที่:
 * 1. แสดงโลโก้และลิงก์ไปยังหน้าหลัก
 * 2. ตรวจสอบและแสดงสถานะผู้ใช้ (Login/Register/Logout)
 * 3. แสดงเมนูพิเศษสำหรับ Admin
 */
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  /**
   * ------------------------------------------------------------
   * USER STATUS MANAGEMENT (การจัดการสถานะผู้ใช้)
   * ------------------------------------------------------------
   */
  
  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ปัจจุบันจาก API
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    }
  }, []);

  // เรียกใช้ fetchUser เมื่อ Component ถูกโหลดครั้งแรก
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ฟังก์ชันสำหรับการออกจากระบบ
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/'; // กลับไปหน้าแรกและ Refresh
  };

  /**
   * ------------------------------------------------------------
   * RENDER NAVIGATION BAR (การแสดงผลแถบเมนู)
   * ------------------------------------------------------------
   */
  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-2xl border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section: 7799 SHOP */}
        <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
          <span className="bg-gradient-to-br from-rose-500 via-pink-500 to-orange-300 text-white px-3 py-1 rounded-xl shadow-[0_0_25px_rgba(244,63,94,0.5)]">7799</span>
          <span className="tracking-[0.15em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">SHOP</span>
        </Link>
        
        {/* Navigation Links & User Menu */}
        <div className="flex items-center gap-6 md:gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
          <Link href="/" className="text-white hover:text-rose-400 transition-all">Home</Link>
          
          {user ? (
            /* กรณีผู้ใช้เข้าสู่ระบบแล้ว */
            <>
              {/* ถ้าเป็น Admin ให้แสดงปุ่มทางลัดไปหน้าจัดการระบบ */}
              {user.role === 'admin' && (
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition-all">Admin</Link>
              )}
              
              <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                <span className="text-rose-400 hidden md:inline">{user.username}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-white/5 hover:bg-rose-500/20 text-white border border-white/10 px-4 py-2 rounded-full transition-all"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            /* กรณีผู้ใช้ยังไม่ได้เข้าสู่ระบบ */
            <>
              <Link href="/login" className="text-white/70 hover:text-white transition-all">Login</Link>
              <Link href="/register" className="bg-gradient-to-r from-rose-600 to-orange-400 text-white px-7 py-3 rounded-full hover:scale-110 hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] transition-all active:scale-95">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
