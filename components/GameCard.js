'use client';
/**
 * ============================================================
 * GAME CARD COMPONENT
 * ============================================================
 * ส่วนแสดงผลข้อมูลเกมแต่ละรายการในรูปแบบ Card
 * Props:
 * - game: ข้อมูลเกม (ชื่อ, ราคา, หมวดหมู่, URL รูปภาพ)
 * - addToCart: ฟังก์ชันสำหรับกดเพิ่มสินค้าลงในตะกร้า
 */
export default function GameCard({ game, addToCart }) {
  return (
    <div className="group flex flex-col relative">
      {/* 
          Image Container 
          - ใช้ aspect-[4/5] เพื่อให้รูปทรงเป็นการ์ดแนวตั้ง
          - มีการใช้ Mask (Overlay) และ Glowing Edge เมื่อ Hover
      */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white/5 rounded-[2.5rem] mb-8 border border-white/10 group-hover:border-rose-500/50 transition-all duration-700 shadow-2xl">
        <img 
          src={game.image_url || 'https://via.placeholder.com/600x800'} 
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Glowing Edge Border: แสดงเมื่อเอาเมาส์วาง */}
        <div className="absolute inset-0 border-[3px] border-rose-500/0 group-hover:border-rose-500/20 rounded-[2.5rem] transition-all duration-700"></div>

        {/* 
            Buy Button (ACQUIRE)
            - จะเลื่อนขึ้นมาและปรากฏขึ้นเมื่อ Hover ที่ตัวการ์ด
        */}
        <button 
          onClick={() => addToCart(game)}
          className="absolute bottom-6 left-6 right-6 bg-rose-500 text-white py-5 rounded-[1.5rem] font-black text-[11px] tracking-[0.2em] opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:bg-orange-300 hover:text-black hover:shadow-orange-300/20"
        >
          ACQUIRE — ${parseFloat(game.price).toFixed(2)}
        </button>
      </div>

      {/* Info Section: แสดงชื่อเกม, หมวดหมู่ และราคา */}
      <div className="px-4 flex justify-between items-start gap-4">
        <div>
          <h3 className="font-black text-xl mb-2 tracking-tight group-hover:text-rose-400 transition-colors uppercase">
            {game.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              {game.category}
            </p>
          </div>
        </div>
        {/* Price Tag */}
        <span className="font-black text-xl text-white group-hover:text-rose-400 transition-all">
          ${parseFloat(game.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
