import React, { useState } from 'react';
import { Package, Plus, Save } from 'lucide-react';

export default function ProductRules({ products, onUpdateProducts }) {
  const [productList, setProductList] = useState(products);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleDaysChange = (id, newDays) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, typicalUsageDays: parseInt(newDays, 10) || 0 } : p))
    );
  };

  const handleSave = () => {
    onUpdateProducts(productList);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Product Usage Lifespans & Rules</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure how many days of daily use each product typically lasts. Used to automatically compute customer refill dates upon Shopify CSV import.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{savedSuccess ? 'Saved Rules!' : 'Save Lifespan Rules'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {productList.map((prod) => (
          <div key={prod.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                  {prod.category}
                </span>
                <span className="font-mono text-xs text-slate-400 font-bold">{prod.sku}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm">{prod.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{prod.description}</p>
              <p className="text-xs font-bold text-emerald-700 mt-2">Price: ৳ {prod.price}</p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Estimated Depletion:</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={prod.typicalUsageDays}
                    onChange={(e) => handleDaysChange(prod.id, e.target.value)}
                    className="w-20 px-2 py-1 text-xs font-bold text-center bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                  <span className="text-xs font-medium text-slate-500">Days</span>
                </div>
              </div>

              <div className="text-[11px] bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-600">
                <span className="font-semibold text-slate-800">Upsell Pairing:</span> {prod.companionSuggestion}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
