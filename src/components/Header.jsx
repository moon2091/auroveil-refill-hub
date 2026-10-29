import React from 'react';
import { Bell, Search, ShieldCheck, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header({ pendingCount = 3, onOpenSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
      <div className="flex items-center space-x-3 flex-1 max-w-md">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, customer, or phone..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-5">
        <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Hostinger Live</span>
        </div>

        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-slate-600 hover:text-slate-900 transition-colors" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AV'}
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs font-semibold text-slate-900 truncate max-w-[140px]">{user?.email || 'Auroveil Team'}</p>
            <p className="text-[10px] text-slate-500">{user?.role || 'Store Manager'}</p>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
