import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simple authentication with hardcoded credentials
      if (credentials.username === 'Josh' && credentials.password === 'lalala14') {
        // Store login state in localStorage
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminLoginTime', Date.now().toString());
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0b0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#111110]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <img src="/images/logo_icon.png" alt="JM²" className="h-12 w-auto mx-auto" />
            </Link>
            <h1 className="text-2xl font-black text-[#f5f0e8] uppercase tracking-wider">Admin Login</h1>
            <p className="text-[#a8a39a] mt-2 text-sm">JM² Tiling Co</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b6560] block mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full bg-[#0c0b0a] border-b-2 border-white/20 text-[#f5f0e8] placeholder-[#3a3730] px-0 py-3 focus:outline-none focus:border-[#c9a84c] transition-all"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#6b6560] block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full bg-[#0c0b0a] border-b-2 border-white/20 text-[#f5f0e8] placeholder-[#3a3730] px-0 py-3 pr-10 focus:outline-none focus:border-[#c9a84c] transition-all"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6b6560] hover:text-[#f5f0e8] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center py-2 rounded">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a84c] hover:bg-[#e2c97e] disabled:bg-[#3a3730] text-[#0c0b0a] font-black uppercase tracking-[0.2em] px-6 py-4 transition-all duration-300 flex items-center justify-center gap-3 text-sm shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_35px_rgba(201,168,76,0.5)]"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
