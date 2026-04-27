'use client';
// ==========================================
// CHECKOUT & PAYMENT PAGE
// ==========================================
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  // ------------------------------------------
  // STATE MANAGEMENT (การจัดการสถานะ)
  // ------------------------------------------
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [orderId, setOrderId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // ------------------------------------------
  // AUTH & DATA FETCHING (เช็คสิทธิ์และดึงข้อมูล)
  // ------------------------------------------
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      } else {
        // ถ้าไม่ได้ Login ให้เด้งไปหน้า Login พร้อมส่ง parameter เพื่อกลับมาหน้าเดิม
        router.push('/login?redirect=/checkout');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      router.push('/login?redirect=/checkout');
    }
  }, [router]);

  // ------------------------------------------
  // INITIALIZATION (ดึงข้อมูลตะกร้าและผู้ใช้)
  // ------------------------------------------
  useEffect(() => {
    const savedCart = localStorage.getItem('game_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
        router.push('/');
      }
    } else {
      router.push('/');
    }
    fetchUser();
  }, [router, fetchUser]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ------------------------------------------
  // CHECKOUT HANDLER (ฟังก์ชันส่งคำสั่งซื้อ)
  // ------------------------------------------
  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total_amount: cartTotal,
          payment_method: paymentMethod,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrderId(data.orderId);
        setIsSuccess(true);
        localStorage.removeItem('game_cart'); // ล้างตะกร้าเมื่อสั่งซื้อสำเร็จ
      } else {
        alert(data.error || 'Checkout failed');
      }
    } catch (error) {
      alert('An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // RENDER UI (การแสดงผลหน้าชำระเงิน)
  // ------------------------------------------
  if (cart.length === 0 && !isSuccess) {
    return <div className="min-h-screen bg-[#1A1D24] text-white flex items-center justify-center">Redirecting...</div>;
  }

  return (
    <main className="min-h-screen bg-[#1A1D24] text-white p-8">
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl font-black mb-8 italic text-center">SECURE <span className="text-amber-500">CHECKOUT</span></h1>
        
        {!isSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 bg-[#23272F] p-8 rounded-2xl border border-gray-800 shadow-2xl">
              <form onSubmit={handleCheckout}>
                  <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold mb-6 text-amber-500 border-b border-gray-800 pb-4">Payment Method</h2>
                    
                    {/* User Info Display */}
                    {user && (
                      <div className="bg-[#1A1D24] p-4 rounded-xl border border-gray-700 mb-8 flex items-center justify-between">
                        <div>
                          <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Billing to</p>
                          <p className="text-white font-bold">{user.username}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                        <div className="text-amber-500 text-2xl">👤</div>
                      </div>
                    )}

                    <div className="flex flex-col gap-4 mb-8">
                      <label className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 transition ${paymentMethod === 'credit_card' ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700 bg-[#1A1D24]'}`}>
                        <input type="radio" name="payment" value="credit_card" checked={paymentMethod === 'credit_card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-amber-500" />
                        <div>
                          <div className="font-bold text-white">Credit / Debit Card</div>
                          <div className="text-xs text-gray-500">Visa, Mastercard, JCB</div>
                        </div>
                      </label>

                      <label className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 transition ${paymentMethod === 'promptpay' ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700 bg-[#1A1D24]'}`}>
                        <input type="radio" name="payment" value="promptpay" checked={paymentMethod === 'promptpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-amber-500" />
                        <div>
                          <div className="font-bold text-white">PromptPay QR</div>
                          <div className="text-xs text-gray-500">Scan to pay instantly</div>
                        </div>
                      </label>
                    </div>

                    {paymentMethod === 'credit_card' && (
                      <div className="bg-[#1A1D24] p-6 rounded-xl border border-gray-700 mb-8">
                        <input required placeholder="Card Number (Mock: 4242 4242 4242)" className="bg-[#23272F] border border-gray-600 text-white p-3 rounded focus:border-amber-500 outline-none w-full mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <input required placeholder="MM/YY" className="bg-[#23272F] border border-gray-600 text-white p-3 rounded focus:border-amber-500 outline-none w-full" />
                          <input required placeholder="CVC" type="password" maxLength="3" className="bg-[#23272F] border border-gray-600 text-white p-3 rounded focus:border-amber-500 outline-none w-full" />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'promptpay' && (
                      <div className="bg-[#1A1D24] p-6 rounded-xl border border-gray-700 mb-8 text-center flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg inline-block mb-4">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="Mock QR" className="w-40 h-40 opacity-80" />
                        </div>
                        <p className="text-sm text-amber-500 font-bold">This is a mock QR Code</p>
                        <p className="text-xs text-gray-500">Click Place Order to simulate successful scan.</p>
                      </div>
                    )}

                    <button disabled={loading} type="submit" className="w-full bg-amber-500 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-amber-400 transition shadow-[0_0_20px_rgba(255,193,7,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? 'Processing Payment...' : `Complete Order - $${cartTotal.toFixed(2)}`}
                    </button>
                  </div>
              </form>
            </div>

            {/* Order Summary Section */}
            <div className="bg-[#23272F] p-8 rounded-2xl border border-gray-800 shadow-2xl h-fit sticky top-10">
              <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-4">Order Summary</h2>
              <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-800 pb-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 bg-gray-800 rounded overflow-hidden">
                        <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-sm line-clamp-1">{item.name}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-amber-500">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 flex justify-between text-2xl font-black">
                <span>TOTAL</span>
                <span className="text-amber-500">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Success Step */
          <div className="bg-[#23272F] p-12 rounded-2xl border border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.1)] text-center max-w-2xl mx-auto animate-fade-in">
            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
              ✓
            </div>
            <h2 className="text-4xl font-black text-white mb-2">PAYMENT SUCCESSFUL</h2>
            <p className="text-gray-400 mb-8">Thank you for your purchase. Your digital keys have been sent to your email.</p>
            <div className="bg-[#1A1D24] border border-gray-800 rounded-lg p-4 inline-block mb-10 text-left">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Order Reference ID</p>
              <p className="text-2xl text-amber-500 font-mono tracking-widest">#{orderId?.toString().padStart(6, '0')}</p>
            </div>
            <br />
            <Link href="/" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
              Return to Store
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
