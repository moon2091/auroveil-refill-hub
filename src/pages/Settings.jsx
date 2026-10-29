import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  AtSign 
} from 'lucide-react';
import { sendGreenApiMessage } from '../lib/greenApi';
import { sendGmailEmail } from '../lib/gmailApi';

export default function Settings() {
  const [defaultCoupon, setDefaultCoupon] = useState('REFILL10');
  const [defaultDiscount, setDefaultDiscount] = useState('10');

  // WhatsApp Green-API Test State
  const [testNumber, setTestNumber] = useState('8801816480712');
  const [testMessage, setTestMessage] = useState('🌿 Assalamu Alaikum from Auroveil! Your WhatsApp Green-API integration is live and working.');
  const [isTestingWa, setIsTestingWa] = useState(false);
  const [testResultWa, setTestResultWa] = useState(null);

  // Gmail API Test State
  const [testEmailTo, setTestEmailTo] = useState('auroveilshop@gmail.com');
  const [testEmailSubject, setTestEmailSubject] = useState('Auroveil Refill Hub: Gmail API Dispatch Connected');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testResultEmail, setTestResultEmail] = useState(null);

  const handleSendTestWa = async (e) => {
    e.preventDefault();
    setIsTestingWa(true);
    setTestResultWa(null);

    try {
      const res = await sendGreenApiMessage(testNumber, testMessage);
      setTestResultWa({
        success: true,
        message: `Success! Message delivered via Green-API (Message ID: ${res.idMessage})`,
      });
    } catch (err) {
      setTestResultWa({
        success: false,
        message: err.message || 'Failed to send message via Green-API.',
      });
    } finally {
      setIsTestingWa(false);
    }
  };

  const handleSendTestEmail = async (e) => {
    e.preventDefault();
    setIsTestingEmail(true);
    setTestResultEmail(null);

    try {
      const htmlBody = `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b; max-width: 550px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #047857; margin-top: 0;">🌿 Auroveil Refill Hub</h2>
          <p>This is a live test email sent directly through the <strong>Gmail API</strong> from <strong>auroveilshop@gmail.com</strong>.</p>
          <div style="background: #f8fafc; padding: 12px; border-radius: 8px; font-weight: bold; text-align: center; margin: 16px 0;">
            Replenishment Engine Connected Successfully
          </div>
          <p style="font-size: 13px; color: #64748b;">Auroveil Customer Retention & Automated Refills</p>
        </div>
      `;

      const res = await sendGmailEmail({
        to: testEmailTo,
        subject: testEmailSubject,
        htmlBody,
      });

      setTestResultEmail({
        success: true,
        message: `Success! Email delivered via Gmail API (Message ID: ${res.id})`,
      });
    } catch (err) {
      setTestResultEmail({
        success: false,
        message: err.message || 'Failed to send email via Gmail API.',
      });
    } finally {
      setIsTestingEmail(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Channels & Store Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your WhatsApp Green-API, Gmail API sending service, and default replenishment incentives.
        </p>
      </div>

      {/* Gmail API Configuration */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Gmail API Dispatch Channel</h3>
            <p className="text-xs text-slate-500">Official Gmail API OAuth 2.0 connected for auroveilshop@gmail.com</p>
          </div>
        </div>

        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Gmail API Authorized</span>
            <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full text-[10px] font-bold">OAuth 2.0 Active</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-700">
            <div><span className="text-slate-400">Sender Account:</span> auroveilshop@gmail.com</div>
            <div><span className="text-slate-400">OAuth Scope:</span> gmail.send</div>
          </div>
        </div>

        {/* Live Email Test Tool */}
        <form onSubmit={handleSendTestEmail} className="pt-2 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-bold text-slate-800">Send Test Email via Gmail API</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Recipient Email</label>
              <input
                type="email"
                value={testEmailTo}
                onChange={(e) => setTestEmailTo(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email Subject</label>
              <input
                type="text"
                value={testEmailSubject}
                onChange={(e) => setTestEmailSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isTestingEmail}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            {isTestingEmail ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isTestingEmail ? 'Sending via Gmail API...' : 'Send Test Email'}</span>
          </button>

          {testResultEmail && (
            <div className={`p-3 rounded-lg text-xs flex items-center space-x-2 ${
              testResultEmail.success ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {testResultEmail.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
              <span>{testResultEmail.message}</span>
            </div>
          )}
        </form>
      </div>

      {/* WhatsApp Green-API Configuration */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">WhatsApp Notification Channel</h3>
            <p className="text-xs text-slate-500">Green-API credentials configured for automated WhatsApp dispatch</p>
          </div>
        </div>

        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Green-API Connected</span>
            <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full text-[10px] font-bold">Active Instance</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-700">
            <div><span className="text-slate-400">Instance ID:</span> 710722743201</div>
            <div><span className="text-slate-400">Target Chat:</span> 8801816480712@c.us</div>
          </div>
        </div>

        {/* Live WhatsApp Test Form */}
        <form onSubmit={handleSendTestWa} className="pt-2 border-t border-slate-100 space-y-3">
          <h4 className="text-xs font-bold text-slate-800">Test Live WhatsApp Dispatch</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone Number</label>
              <input
                type="text"
                value={testNumber}
                onChange={(e) => setTestNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Test Message</label>
              <input
                type="text"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isTestingWa}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            {isTestingWa ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isTestingWa ? 'Sending via Green-API...' : 'Send Test WhatsApp Message'}</span>
          </button>

          {testResultWa && (
            <div className={`p-3 rounded-lg text-xs flex items-center space-x-2 ${
              testResultWa.success ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {testResultWa.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
              <span>{testResultWa.message}</span>
            </div>
          )}
        </form>
      </div>

      {/* Promotion & Coupon Defaults */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Default Incentive Offer</h3>
            <p className="text-xs text-slate-500">Auto-injected into newly generated reminder copies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Default Shopify Coupon Code</label>
            <input
              type="text"
              value={defaultCoupon}
              onChange={(e) => setDefaultCoupon(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Discount Amount</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={defaultDiscount}
                onChange={(e) => setDefaultDiscount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
              <span className="font-bold text-slate-500">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
