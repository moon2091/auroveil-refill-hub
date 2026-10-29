import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Tag, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function ReminderCard({ reminder, onApprove, onSnooze }) {
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [isEditing, setIsEditing] = useState(false);
  const [whatsappText, setWhatsappText] = useState(reminder.whatsappDraft);
  const [couponCode, setCouponCode] = useState(reminder.couponCode || 'REFILL10');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApprove = () => {
    onApprove(reminder.id, {
      whatsappText,
      couponCode,
      channel: activeTab
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300">
      {/* Top Bar: Customer & Product Info */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-slate-900 text-sm">{reminder.customerName}</h4>
            <span className="text-xs text-slate-400 font-mono">{reminder.orderNumber}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">
              <Clock className="w-3 h-3 mr-1" />
              Due Today
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Ordered <span className="font-semibold text-slate-800">{reminder.productOrdered}</span> on {reminder.orderedDate}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500">Contact:</span>
          <span className="font-medium text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200">
            {reminder.phone}
          </span>
          <span className="font-medium text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200">
            {reminder.email}
          </span>
        </div>
      </div>

      {/* Channel Switcher */}
      <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Message</span>
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'email'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Reminder</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs bg-white px-2 py-1 rounded border border-slate-200">
            <Tag className="w-3 h-3 text-emerald-600" />
            <span className="text-slate-500">Coupon:</span>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-20 font-bold text-emerald-700 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center space-x-1 px-2 py-1 rounded hover:bg-slate-200/60"
          >
            <Edit3 className="w-3 h-3" />
            <span>{isEditing ? 'Done Editing' : 'Edit Copy'}</span>
          </button>
        </div>
      </div>

      {/* Message Preview / Editor Body */}
      <div className="p-5">
        {activeTab === 'whatsapp' ? (
          <div>
            {isEditing ? (
              <textarea
                value={whatsappText}
                onChange={(e) => setWhatsappText(e.target.value)}
                rows={6}
                className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            ) : (
              <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
                {whatsappText}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <p className="font-semibold text-slate-700 mb-2">Subject: {reminder.emailSubject}</p>
            <div 
              className="text-slate-800 leading-relaxed" 
              dangerouslySetInnerHTML={{ __html: reminder.emailDraft }} 
            />
          </div>
        )}

        {/* Recommended Upsell Products Accordion */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            <span>Recommended Products Included in Offer (2 Items)</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isExpanded && (
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {reminder.recommendedProducts?.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <span className="font-medium text-slate-800">{item}</span>
                  <a href={`https://auroveil.com/search?q=${encodeURIComponent(item)}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:text-emerald-800">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onSnooze(reminder.id)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded hover:bg-slate-200/60 transition-colors"
        >
          Snooze 7 Days
        </button>

        <div className="flex items-center space-x-2">
          <a
            href={`https://wa.me/${reminder.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center space-x-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Open in WhatsApp Web</span>
          </a>

          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve & Dispatch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
