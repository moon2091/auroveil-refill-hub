import React from 'react';
import { Bell, Search, ShieldCheck } from 'lucide-react';

export default function Header({ pendingCount = 3 }) {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer, order #, or phone number..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Hostinger Live Connected</span>
        </div>

        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-slate-600 hover:text-slate-900 transition-colors" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
            MA
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-900">Auroveil Team</p>
            <p className="text-[10px] text-slate-500">Store Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
