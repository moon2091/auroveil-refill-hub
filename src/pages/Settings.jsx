import React, { useState } from 'react';
import { MessageCircle, Mail, Key, Shield, Sparkles } from 'lucide-react';

export default function Settings() {
  const [whatsappApi, setWhatsappApi] = useState('cloud_api');
  const [senderName, setSenderName] = useState('Auroveil Skincare');
  const [defaultCoupon, setDefaultCoupon] = useState('REFILL10');
  const [defaultDiscount, setDefaultDiscount] = useState('10');

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Channels & Store Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure WhatsApp Business API credentials, transactional email sender, and default discount promotions.
        </p>
      </div>

      {/* WhatsApp Configuration */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">WhatsApp Notification Channel</h3>
            <p className="text-xs text-slate-500">Choose how customer WhatsApp refill reminders are dispatched</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="whatsapp"
              checked={whatsappApi === 'cloud_api'}
              onChange={() => setWhatsappApi('cloud_api')}
              className="text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">Meta WhatsApp Cloud API (Automated)</p>
              <p className="text-[11px] text-slate-500">Sends directly from Auroveil official verified business number</p>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
            <input
              type="radio"
              name="whatsapp"
              checked={whatsappApi === 'web_manual'}
              onChange={() => setWhatsappApi('web_manual')}
              className="text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">1-Click WhatsApp Web Assist (Zero API Cost)</p>
              <p className="text-[11px] text-slate-500">Opens WhatsApp Web with pre-filled message for instant staff sending</p>
            </div>
          </label>
        </div>
      </div>

      {/* Promotion & Coupon Defaults */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
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
