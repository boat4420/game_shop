'use client';
/**
 * ============================================================
 * CART SIDEBAR COMPONENT
 * ============================================================
 * ส่วนแสดงผลตะกร้าสินค้าแบบแถบด้านข้าง (Sidebar)
 * Props:
 * - isCartOpen: สถานะเปิด/ปิดตะกร้า
 * - setIsCartOpen: ฟังก์ชันเปลี่ยนสถานะเปิด/ปิด
 * - cart: รายการสินค้าในตะกร้า
 * - removeFromCart: ฟังก์ชันลบสินค้าออกจากตะกร้า
 * - cartTotal: ราคารวมทั้งหมด
 */
import Link from 'next/link';

export default function CartSidebar({ isCartOpen, setIsCartOpen, cart, removeFromCart, cartTotal }) {
  // หากไม่ได้เปิดตะกร้า ไม่ต้อง Render อะไร
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] animate-in fade-in duration-500">
      {/* Background Overlay: พื้นหลังโปร่งแสงสำหรับปิดตะกร้าเมื่อคลิกภายนอก */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" onClick={() => setIsCartOpen(false)}></div>
      
      {/* Sidebar Content Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-[500px] bg-[#1a0a0a] border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col animate-in slide-in-from-right duration-700 rounded-l-[4rem]">
        
        {/* Header Section */}
        <div className="p-12 flex justify-between items-center">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-rose-500">Inventory</h2>
          <button onClick={() => setIsCartOpen(false)} className="bg-white/5 p-4 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-all text-2xl">×</button>
        </div>
        
        {/* Items List Area: ส่วนแสดงรายการสินค้าแบบ Scrollable */}
        <div className="flex-grow overflow-y-auto px-12 flex flex-col gap-10">
          {cart.length === 0 ? (
            /* Empty Cart View */
            <div className="h-full flex flex-col items-center justify-center text-gray-700">
              <span className="text-8xl mb-6 opacity-20 text-rose-500">📡</span>
              <p className="text-xs font-black tracking-[0.3em] uppercase">No Signals Detected</p>
            </div>
          ) : (
            /* Map Cart Items */
            cart.map((item) => (
              <div key={item.id} className="flex gap-8 items-center p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-rose-500/30 transition-all">
                {/* Item Thumbnail */}
                <img src={item.image_url} className="w-24 h-28 object-cover rounded-2xl shadow-2xl" alt="" />
                
                {/* Item Details */}
                <div className="flex-grow">
                  <h4 className="font-black text-lg mb-1 uppercase tracking-tight text-white">{item.name}</h4>
                  <p className="text-[10px] font-black text-rose-500/60 mb-4 tracking-widest uppercase">Unit x{item.quantity}</p>
                  
                  {/* Remove Button */}
                  <button onClick={() => removeFromCart(item.id)} className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500/50 hover:text-rose-500 transition-colors">Discard</button>
                </div>
                
                {/* Item Total Price */}
                <span className="text-lg font-black text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
        </div>

        {/* Footer Section: แสดงยอดรวมและปุ่มไปหน้า Checkout */}
        {cart.length > 0 && (
          <div className="p-12 bg-white/5 rounded-tl-[4rem] border-t border-white/5 backdrop-blur-3xl">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xs font-black text-gray-500 tracking-[0.3em] uppercase">Credits Required</span>
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-400">${cartTotal.toFixed(2)}</span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center bg-rose-600 text-white py-8 rounded-[2rem] font-black text-xs tracking-[0.4em] hover:bg-orange-300 hover:text-black transition-all shadow-2xl shadow-rose-600/20"
            >
              INITIALIZE CHECKOUT
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
