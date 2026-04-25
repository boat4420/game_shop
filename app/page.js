'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ShopPage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchGames();
    fetchUser();
    const savedCart = localStorage.getItem('game_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

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

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    const data = await res.json();
    setUser(data.user);
  };

  const fetchGames = async () => {
    try {
      const res = await fetch('/api/games');
      const data = await res.json();
      if (Array.isArray(data)) setGames(data);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section with Vibrant Game Collage */}
      <section className="mb-24 relative">
        <div className="relative h-[400px] md:h-[500px] w-full rounded-[3.5rem] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(244,63,94,0.2)] mb-12 group">
          {/* Guaranteed-to-Load Vibrant Gaming Image */}
          <div className="absolute inset-0 h-full w-full transition-all duration-1000 group-hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1600" 
              className="w-full h-full object-cover" 
              alt="High-End Gaming Experience" 
            />
          </div>
          
          {/* Very Light Overlay to keep it vibrant */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a] via-transparent to-transparent opacity-80"></div>
          <div className="absolute inset-0 bg-rose-500/5 mix-blend-screen"></div>
          
          {/* Content inside Hero */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6">
            <div className="inline-block px-5 py-2 rounded-full border border-rose-400/50 bg-rose-400/20 backdrop-blur-md text-rose-300 text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse">
              Level Up Your Game
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-2xl">
              <div className="relative w-full group/search">
                <input 
                  type="text" 
                  placeholder="SEARCH THE UNIVERSE..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 px-8 py-5 rounded-2xl focus:border-rose-400 focus:bg-black/60 outline-none transition-all text-sm tracking-widest font-black backdrop-blur-xl text-white shadow-2xl placeholder:text-white/30"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-400 animate-ping"></div>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-5 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white rounded-2xl hover:scale-110 hover:shadow-[0_0_40px_rgba(244,63,94,0.5)] transition-all group overflow-hidden shrink-0 border border-white/20"
              >
                <span className="relative z-10 text-xl font-black flex items-center gap-2 tracking-tighter">
                  BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
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
              <div key={game.id} className="group flex flex-col relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5 rounded-[2.5rem] mb-8 border border-white/10 group-hover:border-rose-500/50 transition-all duration-700 shadow-2xl">
                  <img 
                    src={game.image_url || 'https://via.placeholder.com/600x800'} 
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  {/* Glowing Edge */}
                  <div className="absolute inset-0 border-[3px] border-rose-500/0 group-hover:border-rose-500/20 rounded-[2.5rem] transition-all duration-700"></div>

                  <button 
                    onClick={() => addToCart(game)}
                    className="absolute bottom-6 left-6 right-6 bg-rose-500 text-white py-5 rounded-[1.5rem] font-black text-[11px] tracking-[0.2em] opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:bg-orange-300 hover:text-black hover:shadow-orange-300/20"
                  >
                    ACQUIRE — ${parseFloat(game.price).toFixed(2)}
                  </button>
                </div>
                <div className="px-4 flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-black text-xl mb-2 tracking-tight group-hover:text-rose-400 transition-colors uppercase">{game.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{game.category}</p>
                    </div>
                  </div>
                  <span className="font-black text-xl text-white group-hover:text-rose-400 transition-all">${parseFloat(game.price).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 w-full max-w-[500px] bg-[#1a0a0a] border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col animate-in slide-in-from-right duration-700 rounded-l-[4rem]">
            <div className="p-12 flex justify-between items-center">
              <h2 className="text-4xl font-black tracking-tighter uppercase italic text-rose-500">Inventory</h2>
              <button onClick={() => setIsCartOpen(false)} className="bg-white/5 p-4 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-all text-2xl">×</button>
            </div>
            
            <div className="flex-grow overflow-y-auto px-12 flex flex-col gap-10">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-700">
                  <span className="text-8xl mb-6 opacity-20 text-rose-500">📡</span>
                  <p className="text-xs font-black tracking-[0.3em] uppercase">No Signals Detected</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-8 items-center p-6 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-rose-500/30 transition-all">
                    <img src={item.image_url} className="w-24 h-28 object-cover rounded-2xl shadow-2xl" alt="" />
                    <div className="flex-grow">
                      <h4 className="font-black text-lg mb-1 uppercase tracking-tight text-white">{item.name}</h4>
                      <p className="text-[10px] font-black text-rose-500/60 mb-4 tracking-widest uppercase">Unit x{item.quantity}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500/50 hover:text-rose-500 transition-colors">Discard</button>
                    </div>
                    <span className="text-lg font-black text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

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
      )}

      {/* Neon Toast */}
      {toast && (
        <div className="fixed bottom-12 right-12 bg-rose-600 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-[0_0_50px_rgba(244,63,94,0.4)] animate-in slide-in-from-bottom-10 duration-500 z-[110] border border-white/20 uppercase">
          ⚡ System: {toast}
        </div>
      )}
    </div>
  );
}
