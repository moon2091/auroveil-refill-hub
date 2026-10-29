import React from 'react';
import { Clock, Send, ShoppingCart, TrendingUp } from 'lucide-react';

export default function StatsOverview({ pendingCount = 3, sentCount = 28, revenueRecovered = 34500 }) {
  const cards = [
    {
      label: 'Pending Staff Approval',
      value: pendingCount,
      subtext: 'Needs review before dispatch',
      icon: Clock,
      color: 'bg-amber-500 text-white',
      badge: 'Action Required',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      label: 'Dispatched Reminders',
      value: sentCount,
      subtext: 'Sent via WhatsApp & Email',
      icon: Send,
      color: 'bg-emerald-600 text-white',
      badge: 'This Month',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      label: 'Est. Refill Re-orders',
      value: `৳ ${revenueRecovered.toLocaleString()}`,
      subtext: 'Attributed repeat purchases',
      icon: ShoppingCart,
      color: 'bg-blue-600 text-white',
      badge: '+22.4%',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'Refill Retention Rate',
      value: '31.8%',
      subtext: 'Industry benchmark: 18%',
      icon: TrendingUp,
      color: 'bg-purple-600 text-white',
      badge: 'High Impact',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                {card.badge}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}</p>
              <h3 className="text-xs font-semibold text-slate-700 mt-0.5">{card.label}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
