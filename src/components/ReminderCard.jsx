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
  Loader2,
  AlertCircle
} from 'lucide-react';
import { sendGreenApiMessage } from '../lib/greenApi';
import { sendGmailEmail } from '../lib/gmailApi';

export default function ReminderCard({ reminder, onApprove, onSnooze }) {
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [isEditing, setIsEditing] = useState(false);
  const [whatsappText, setWhatsappText] = useState(reminder.whatsappDraft);
  const [emailSubject, setEmailSubject] = useState(reminder.emailSubject || `Time for your Auroveil Refill`);
  const [couponCode, setCouponCode] = useState(reminder.couponCode || 'REFILL10');
  const [isExpanded, setIsExpanded] = useState(false);

  // WhatsApp State
  const [isSendingGreenApi, setIsSendingGreenApi] = useState(false);
  const [greenApiStatus, setGreenApiStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  // Email State
  const [isSendingGmail, setIsSendingGmail] = useState(false);
  const [gmailStatus, setGmailStatus] = useState(null); // 'success' | 'error' | null
  const [gmailMessage, setGmailMessage] = useState('');

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
      setStatusMessage(`Message sent to test WhatsApp (8801816480712)! [Target Customer: ${reminder.customerName} (${reminder.phone})] (ID: ${response.idMessage || 'OK'})`);
      
      onApprove(reminder.id, {
        whatsappText,
        couponCode,
        channel: 'whatsapp_green_api',
        greenApiId: response.idMessage
      });
    } catch (err) {
      console.error('Green-API dispatch failed:', err);
      setGreenApiStatus('error');
      
      if (err.message && (err.message.includes('466') || err.message.includes('CORRESPONDENTS_QUOTE_EXCEEDED'))) {
        setStatusMessage(
          'Green-API Developer Plan: You can only auto-send to your test number (8801816480712). Use the "WhatsApp Web" button below to message this customer directly, or upgrade your Green-API tariff to Business.'
        );
      } else {
        setStatusMessage(err.message || 'Failed to dispatch via Green API. Use WhatsApp Web button instead.');
      }
    } finally {
      setIsSendingGreenApi(false);
    }
  };

  // Direct dispatch using Gmail API
  const handleSendViaGmail = async () => {
    if (!reminder.email || !reminder.email.includes('@')) {
      setGmailStatus('error');
      setGmailMessage('This customer does not have an email address attached to their order.');
      return;
    }

    setIsSendingGmail(true);
    setGmailStatus(null);
    setGmailMessage('');

    try {
      const res = await sendGmailEmail({
        to: reminder.email,
        subject: emailSubject,
        htmlBody: reminder.emailDraft || `<p>Dear ${reminder.customerName},</p><p>It's time to refill your ${reminder.productOrdered}! Use coupon code <strong>${couponCode}</strong> for a discount on your order at <a href="https://auroveil.com">auroveil.com</a>.</p>`,
      });

      setGmailStatus('success');
      setGmailMessage(`Email sent successfully via Gmail API from auroveilshop@gmail.com! (ID: ${res.id})`);

      onApprove(reminder.id, {
        couponCode,
        channel: 'gmail_api',
        emailId: res.id
      });
    } catch (err) {
      console.error('Gmail API send failed:', err);
      setGmailStatus('error');
      setGmailMessage(err.message || 'Failed to send email via Gmail API.');
    } finally {
      setIsSendingGmail(false);
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
            {reminder.phone || 'No phone'}
          </span>
          <span className="font-medium text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200 truncate max-w-[200px]">
            {reminder.email || 'No email'}
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
          <div className="space-y-3">
            {isEditing ? (
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email Subject:</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 mb-2 font-medium"
                />
              </div>
            ) : null}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <p className="font-semibold text-slate-700 mb-2">Subject: {emailSubject}</p>
              <div 
                className="text-slate-800 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: reminder.emailDraft || `<p>Dear ${reminder.customerName},</p><p>Time to replenish your ${reminder.productOrdered}! Use coupon code <strong>${couponCode}</strong> for a discount on your order at <a href="https://auroveil.com">auroveil.com</a>.</p>` }} 
              />
            </div>
          </div>
        )}

        {/* WhatsApp Green-API Status Banner */}
        {greenApiStatus && (
          <div className={`mt-3 p-3 rounded-lg text-xs font-medium flex items-start space-x-2 ${
            greenApiStatus === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {greenApiStatus === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
            <span className="leading-relaxed">{statusMessage}</span>
          </div>
        )}

        {/* Gmail API Status Banner */}
        {gmailStatus && (
          <div className={`mt-3 p-3 rounded-lg text-xs font-medium flex items-start space-x-2 ${
            gmailStatus === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {gmailStatus === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
            <span className="leading-relaxed">{gmailMessage}</span>
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
          {activeTab === 'whatsapp' ? (
            <>
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

              {/* 1-Click WhatsApp Web link (free, works for ANY customer number) */}
              <a
                href={`https://wa.me/${(reminder.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors flex items-center space-x-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Web</span>
              </a>
            </>
          ) : (
            <>
              {/* Direct Gmail API Button */}
              <button
                onClick={handleSendViaGmail}
                disabled={isSendingGmail || !reminder.email}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                {isSendingGmail ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Mail className="w-3.5 h-3.5" />
                )}
                <span>Send via Gmail API</span>
              </button>
            </>
          )}

          {/* Manual Mark Sent */}
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
