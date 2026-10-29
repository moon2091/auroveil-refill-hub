import React, { useState } from 'react';
import { MessageCircle, Mail, Sparkles, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { sendGreenApiMessage } from '../lib/greenApi';

export default function Settings() {
  const [whatsappApi, setWhatsappApi] = useState('green_api');
  const [defaultCoupon, setDefaultCoupon] = useState('REFILL10');
  const [defaultDiscount, setDefaultDiscount] = useState('10');

  // Test tool state
  const [testNumber, setTestNumber] = useState('8801816480712');
  const [testMessage, setTestMessage] = useState('🌿 Assalamu Alaikum from Auroveil! Your WhatsApp Green-API integration is live and working perfectly.');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleSendTest = async (e) => {
    e.preventDefault();
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await sendGreenApiMessage(testNumber, testMessage);
      setTestResult({
        success: true,
        message: `Success! Message delivered via Green-API (Message ID: ${res.idMessage})`,
      });
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message || 'Failed to send message via Green-API.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Channels & Store Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure WhatsApp Business API credentials, transactional email sender, and default discount promotions.
        </p>
      </div>

      {/* WhatsApp Configuration */}
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

        {/* Green-API Status Card */}
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

        {/* Live Test Form */}
        <form onSubmit={handleSendTest} className="pt-2 border-t border-slate-100 space-y-3">
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
            disabled={isTesting}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            {isTesting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isTesting ? 'Sending via Green-API...' : 'Send Test WhatsApp Message'}</span>
          </button>

          {testResult && (
            <div className={`p-3 rounded-lg text-xs flex items-center space-x-2 ${
              testResult.success ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
              <span>{testResult.message}</span>
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
