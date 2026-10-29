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
  ChevronUp,
  Send,
  Loader2
} from 'lucide-react';
import { sendGreenApiMessage } from '../lib/greenApi';

export default function ReminderCard({ reminder, onApprove, onSnooze }) {
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [isEditing, setIsEditing] = useState(false);
  const [whatsappText, setWhatsappText] = useState(reminder.whatsappDraft);
  const [couponCode, setCouponCode] = useState(reminder.couponCode || 'REFILL10');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSendingGreenApi, setIsSendingGreenApi] = useState(false);
  const [greenApiStatus, setGreenApiStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  const handleApprove = () => {
    onApprove(reminder.id, {
      whatsappText,
      couponCode,
      channel: activeTab
    });
  };

  // Automated dispatch using Green-API credentials
  const handleSendViaGreenApi = async () => {
    setIsSendingGreenApi(true);
    setGreenApiStatus(null);
    setStatusMessage('');

    try {
      const response = await sendGreenApiMessage(reminder.phone, whatsappText);
      setGreenApiStatus('success');
      setStatusMessage(`Message sent via Green-API! (ID: ${response.idMessage || 'OK'})`);
      
      // Automatically mark reminder as approved/sent
      onApprove(reminder.id, {
        whatsappText,
        couponCode,
        channel: 'whatsapp_green_api',
        greenApiId: response.idMessage
      });
    } catch (err) {
      console.error('Green-API dispatch failed:', err);
      setGreenApiStatus('error');
      setStatusMessage(err.message || 'Failed to dispatch via Green API. You can still use 1-Click WhatsApp Web.');
    } finally {
      setIsSendingGreenApi(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300">
      {/* Top Bar: Customer & Product Info */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
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

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500">Contact:</span>
          <span className="font-medium text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200">
            {reminder.phone}
          </span>
          <span className="font-medium text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200 truncate max-w-[180px]">
            {reminder.email}
          </span>
        </div>
      </div>

      {/* Channel Switcher */}
      <div className="bg-slate-50 px-4 sm:px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
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
            <span>Email</span>
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
            <span>{isEditing ? 'Done' : 'Edit Copy'}</span>
          </button>
        </div>
      </div>

      {/* Message Preview / Editor Body */}
      <div className="p-4 sm:p-5">
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

        {/* Green-API Status Banner */}
        {greenApiStatus && (
          <div className={`mt-3 p-3 rounded-lg text-xs font-medium flex items-center space-x-2 ${
            greenApiStatus === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Recommended Upsell Products Accordion */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            <span>Recommended Companion Products (2 Items)</span>
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
      <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => onSnooze(reminder.id)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded hover:bg-slate-200/60 transition-colors text-left sm:text-center"
        >
          Snooze 7 Days
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Green API Direct WhatsApp Button */}
          <button
            onClick={handleSendViaGreenApi}
            disabled={isSendingGreenApi}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            {isSendingGreenApi ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Send via Green-API</span>
          </button>

          {/* Fallback 1-Click WhatsApp Web link */}
          <a
            href={`https://wa.me/${reminder.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors flex items-center space-x-1"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Web</span>
          </a>

          {/* Standard Approve */}
          <button
            onClick={handleApprove}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mark Sent</span>
          </button>
        </div>
      </div>
    </div>
  );
}
