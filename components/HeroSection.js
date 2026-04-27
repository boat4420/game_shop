'use client';
/**
 * ============================================================
 * HERO SECTION COMPONENT
 * ============================================================
 * ส่วนแสดงผลแบนเนอร์หลักด้านบน (Hero Banner)
 * ประกอบด้วย:
 * 1. รูปภาพพื้นหลังพร้อมเอฟเฟกต์ Overlay
 * 2. ช่องค้นหาเกม (Search Input)
 * 3. ปุ่มเปิดตะกร้าสินค้า (Cart Button) พร้อมจำนวนสินค้า
 */
import Link from 'next/link';

export default function HeroSection({ searchTerm, setSearchTerm, setIsCartOpen, cartCount }) {
  return (
    <section className="mb-24 relative">
      {/* 
          Main Hero Container 
          - ใช้ border โปร่งแสงและ shadow สีชมพูเพื่อสร้างความโดดเด่น
          - มีเอฟเฟกต์ Scale เมื่อเอาเมาส์ไปวาง (Hover)
      */}
      <div className="relative h-[400px] md:h-[500px] w-full rounded-[3.5rem] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(244,63,94,0.2)] mb-12 group">
        
        {/* Background Image with Hover Animation */}
        <div className="absolute inset-0 h-full w-full transition-all duration-1000 group-hover:scale-105">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover" 
            alt="High-End Gaming Experience" 
          />
        </div>
        
        {/* Overlay Filters: ไล่โทนสีดำจากล่างขึ้นบน และฟิลเตอร์สีชมพูบางๆ */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a] via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 bg-rose-500/5 mix-blend-screen"></div>
        
        {/* Content Area: ข้อความและปุ่มต่างๆ */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6">
          
          {/* Badge: แสดงข้อความ Level Up */}
          <div className="inline-block px-5 py-2 rounded-full border border-rose-400/50 bg-rose-400/20 backdrop-blur-md text-rose-300 text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse">
            Level Up Your Game
          </div>
          
          {/* Interaction Controls: กล่องค้นหาและปุ่มตะกร้า */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl">
            
            {/* Search Input Field */}
            <div className="relative w-full group/search">
              <input 
                type="text" 
                placeholder="SEARCH THE UNIVERSE..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/20 px-8 py-5 rounded-2xl focus:border-rose-400 focus:bg-black/60 outline-none transition-all text-sm tracking-widest font-black backdrop-blur-xl text-white shadow-2xl placeholder:text-white/30"
              />
              {/* Animated Dot: จุดสีชมพูกะพริบเพื่อความสวยงาม */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-400 animate-ping"></div>
            </div>

            {/* Bag Button: ปุ่มเปิดตะกร้าสินค้า */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-5 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white rounded-2xl hover:scale-110 hover:shadow-[0_0_40px_rgba(244,63,94,0.5)] transition-all group overflow-hidden shrink-0 border border-white/20"
            >
              <span className="relative z-10 text-xl font-black flex items-center gap-2 tracking-tighter">
                BAG ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
