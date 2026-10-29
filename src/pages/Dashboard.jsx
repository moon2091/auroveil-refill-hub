import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BellRing, Sparkles, UploadCloud } from 'lucide-react';
import StatsOverview from '../components/StatsOverview';
import ReminderCard from '../components/ReminderCard';

export default function Dashboard({ reminders, orders, onApprove, onSnooze, onOpenImport }) {
  const pendingReminders = reminders.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-2xl p-7 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Auroveil Retention & Refill Engine</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Today's Replenishment Approvals</h2>
          <p className="text-emerald-100/80 text-xs max-w-xl mt-1 leading-relaxed">
            {pendingReminders.length} customers have reached their estimated consumable product usage cycle. Review their personalized WhatsApp or Email reminder copy before sending.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenImport}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/20 flex items-center space-x-2 transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Daily CSV</span>
          </button>
          <Link
            to="/reminders"
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <span>Open Full Queue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <StatsOverview pendingCount={pendingReminders.length} sentCount={32} revenueRecovered={38400} />

      {/* Immediate Action Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BellRing className="w-4 h-4 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">High-Priority Reminders Requiring Authorization</h3>
          </div>
          <Link to="/reminders" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1">
            <span>View All ({pendingReminders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingReminders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">All caught up! No pending reminders for today.</p>
            <p className="text-xs text-slate-400 mt-1">Import new Shopify orders or adjust product lifespans to populate upcoming cycles.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingReminders.slice(0, 3).map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onApprove={onApprove}
                onSnooze={onSnooze}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
