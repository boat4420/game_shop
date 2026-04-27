'use client';
// ==========================================
// SHOP PAGE COMPONENT
// ==========================================
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import GameCard from '@/components/GameCard';
import CartSidebar from '@/components/CartSidebar';

export default function ShopPage() {
  // ------------------------------------------
  // STATE MANAGEMENT (การจัดการสถานะ)
  // ------------------------------------------
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // ------------------------------------------
  // API CALLS (การเรียกใช้ API)
  // ------------------------------------------
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }, []);

  const fetchGames = useCallback(async () => {
    try {
      const res = await fetch('/api/games');
      const data = await res.json();
      if (Array.isArray(data)) setGames(data);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.reload();
  };

  // ------------------------------------------
  // INITIALIZATION (การเริ่มต้นโหลดข้อมูล)
  // ------------------------------------------
  useEffect(() => {
    fetchGames();
    fetchUser();
    const savedCart = localStorage.getItem('game_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, [fetchGames, fetchUser]);

  // ------------------------------------------
  // HELPER FUNCTIONS (ฟังก์ชันช่วยเหลือ)
  // ------------------------------------------
  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (game) => {
    const newCart = [...cart];
    const existingItem = newCart.find(item => item.id === game.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ ...game, quantity: 1 });
    }
    setCart(newCart);
    localStorage.setItem('game_cart', JSON.stringify(newCart));
    showToast(`Added ${game.name} to bag`);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('game_cart', JSON.stringify(newCart));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  // ------------------------------------------
  // RENDER UI (การแสดงผลหน้าจอ)
  // ------------------------------------------
  return (
    <div className="animate-in fade-in duration-1000">
      <HeroSection 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        setIsCartOpen={setIsCartOpen} 
        cartCount={cartCount} 
      />

      <section className="relative">
        <div className="flex items-center justify-between mb-12 px-4">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">
            Select <span className="text-rose-500 text-shadow-glow">Game</span>
          </h2>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Welcome, {user.username}</span>
                <button onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-white transition-colors">Logout</button>
              </div>
            ) : (
              <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Login to Account</Link>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 aspect-[4/5] rounded-[2.5rem] mb-6 border border-white/5"></div>
                <div className="h-4 bg-white/5 w-2/3 mb-3 rounded-full"></div>
                <div className="h-4 bg-white/5 w-1/3 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="py-40 text-center bg-white/5 rounded-[3rem] border border-white/5 backdrop-blur-sm">
            <p className="text-gray-500 font-black tracking-widest uppercase text-xs">No signals detected in this sector</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} addToCart={addToCart} /> //Add games to bags
            ))}
          </div>
        )}
      </section>

      <CartSidebar 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen} 
        cart={cart} 
        removeFromCart={removeFromCart} 
        cartTotal={cartTotal} 
      />

      {/* Neon Toast */}
      {toast && (
        <div className="fixed bottom-12 right-12 bg-rose-600 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-[0_0_50px_rgba(244,63,94,0.4)] animate-in slide-in-from-bottom-10 duration-500 z-[110] border border-white/20 uppercase">
          ⚡ System: {toast}
        </div>
      )}
    </div>
  );
}
