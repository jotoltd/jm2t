import React, { useState } from 'react';
import { LogOut, ImageIcon, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageManager from './ImageManager';
import SubmissionsManager from './SubmissionsManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'images' | 'submissions'>('images');

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0c0b0a]">
      {/* Header */}
      <div className="bg-[#111110] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
                <img src="/images/logo_icon.png" alt="JM²" className="h-6 sm:h-8 w-auto" />
              </Link>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div>
                <h1 className="text-base sm:text-xl font-black text-[#f5f0e8] uppercase tracking-wider">Admin</h1>
                <p className="text-[#a8a39a] text-[10px] sm:text-xs hidden xs:block">Manage content</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#0c0b0a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'images'
                  ? 'text-[#c9a84c] border-[#c9a84c]'
                  : 'text-[#6b6560] border-transparent hover:text-[#a8a39a]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Images</span>
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === 'submissions'
                  ? 'text-[#c9a84c] border-[#c9a84c]'
                  : 'text-[#6b6560] border-transparent hover:text-[#a8a39a]'
              }`}
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Submissions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {activeTab === 'images' && <ImageManager />}
        {activeTab === 'submissions' && <SubmissionsManager />}
      </div>
    </div>
  );
}
