import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BellRing, 
  ShoppingBag, 
  Package, 
  Settings, 
  UploadCloud,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ onOpenImport }) {
  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/reminders', label: 'Review Queue', icon: BellRing, badge: '3' },
    { to: '/orders', label: 'Shopify Orders', icon: ShoppingBag },
    { to: '/products', label: 'Product Lifespans', icon: Package },
    { to: '/settings', label: 'Channels & Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            AV
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Auroveil</h1>
            <p className="text-xs text-emerald-700 font-medium">Refill Hub</p>
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="p-4">
        <button
          onClick={onOpenImport}
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Import Shopify CSV</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Multi-Tenant Badge */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Store: Auroveil Official</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Shopify Plan • Multi-Tenant Ready</p>
        </div>
      </div>
    </aside>
  );
}
