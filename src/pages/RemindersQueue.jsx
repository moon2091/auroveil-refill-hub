import React, { useState } from 'react';
import ReminderCard from '../components/ReminderCard';
import { Filter, CheckCircle, Clock } from 'lucide-react';

export default function RemindersQueue({ reminders, onApprove, onSnooze }) {
  const [filter, setFilter] = useState('pending'); // all, pending, sent, snoozed

  const filteredReminders = reminders.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Human-in-the-Loop Review Queue</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review customer orders nearing product completion, edit suggested companion products, and approve WhatsApp or Email dispatch.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'pending', label: 'Pending Approval', count: reminders.filter(r => r.status === 'pending').length },
            { id: 'sent', label: 'Dispatched', count: reminders.filter(r => r.status === 'sent').length },
            { id: 'snoozed', label: 'Snoozed', count: reminders.filter(r => r.status === 'snoozed').length },
            { id: 'all', label: 'All Reminders', count: reminders.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200/60 font-bold">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filteredReminders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No reminders found in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReminders.map((reminder) => (
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
  );
}
