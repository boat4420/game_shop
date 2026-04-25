'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    if (res.ok) {
      window.location.href = '/'; // Refresh to update user state
    } else {
      setError(result.error);
    }
  };

  return (
    <main className="min-h-screen bg-[#1A1D24] flex items-center justify-center p-6">
      <div className="bg-[#23272F] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
        <h1 className="text-3xl font-black text-white mb-6 text-center italic">
          WELCOME <span className="text-amber-500">BACK</span>
        </h1>
        
        {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="email" type="email" placeholder="Email Address" required className="bg-[#1A1D24] border border-gray-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
          <input name="password" type="password" placeholder="Password" required className="bg-[#1A1D24] border border-gray-700 text-white p-3 rounded-lg focus:border-amber-500 outline-none" />
          <button type="submit" className="bg-amber-500 text-black py-3 rounded-lg font-black uppercase tracking-widest mt-2 hover:bg-amber-400 transition">
            Login Now
          </button>
        </form>

        <p className="text-gray-500 text-center mt-6 text-sm">
          New adventurer? <Link href="/register" className="text-amber-500 hover:underline">Create account</Link>
        </p>
      </div>
    </main>
  );
}
