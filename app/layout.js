import "./globals.css";

export const metadata = {
  title: "7799 Shop - Premium Game Store",
  description: "Vibrant & Dark Minimalist Game Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-[#1a0a0a] text-white min-h-screen flex flex-col font-sans selection:bg-rose-400 selection:text-white">
        {/* Intense Vibrant Red & Peach Background Glows */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-rose-600/30 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-300/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-2xl border-b border-white/10">
          <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 text-2xl font-black tracking-tighter">
              <span className="bg-gradient-to-br from-rose-500 via-pink-500 to-orange-300 text-white px-3 py-1 rounded-xl shadow-[0_0_25px_rgba(244,63,94,0.5)]">7799</span>
              <span className="tracking-[0.15em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">SHOP</span>
            </div>
            <div className="flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
              <a href="/" className="text-white hover:text-rose-400 transition-all hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]">Home</a>
              <a href="/login" className="text-white/70 hover:text-white transition-all">Login</a>
              <a href="/register" className="bg-gradient-to-r from-rose-600 to-orange-400 text-white px-7 py-3 rounded-full hover:scale-110 hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] transition-all active:scale-95 font-black uppercase tracking-widest">Register</a>
            </div>
          </nav>
        </header>

        <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-12">
          {children}
        </main>

        <footer className="py-20 bg-black/60 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-4"></div>
            <div className="text-[10px] font-black text-gray-500 tracking-[0.5em] uppercase">
              © 2026 7799 SHOP — NO LIMITS
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
