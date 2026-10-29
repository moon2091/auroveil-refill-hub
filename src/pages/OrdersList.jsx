import React from 'react';
import { Calendar, ShoppingBag, Clock, CheckCircle } from 'lucide-react';

export default function OrdersList({ orders, onOpenImport }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ingested Shopify Orders</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Orders imported from your Shopify CSV export, with automatically calculated product depletion dates.
          </p>
        </div>

        <button
          onClick={onOpenImport}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          Import New Batch
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Ordered Products</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Refill Run-Out Date</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{order.orderNumber}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900">{order.customerName}</p>
                    <p className="text-slate-400 text-[11px]">{order.phone} • {order.city}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="font-medium text-slate-800">
                        {item.quantity}x {item.productTitle}
                      </div>
                    ))}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">{order.orderDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-3 h-3 mr-1 text-amber-600" />
                      {order.refillDueDate}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">৳ {order.total.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      order.reminderStatus === 'approved' || order.reminderStatus === 'sent'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.reminderStatus === 'sent' ? 'Dispatched' : 'Active Cycle'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
