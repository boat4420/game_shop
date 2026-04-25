import "./globals.css";
import Navbar from "@/components/Navbar";

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

        <Navbar />

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
