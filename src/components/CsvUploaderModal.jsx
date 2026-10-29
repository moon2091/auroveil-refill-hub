import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { parseShopifyOrdersCsv } from '../lib/shopifyCsvParser';

export default function CsvUploaderModal({ isOpen, onClose, onImportSuccess, productsCatalog }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewOrders, setPreviewOrders] = useState([]);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please select a valid Shopify Orders CSV export file.');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setIsProcessing(true);

    try {
      const orders = await parseShopifyOrdersCsv(selectedFile, productsCatalog);
      setPreviewOrders(orders);
    } catch (err) {
      console.error('CSV Parsing Error:', err);
      setError('Failed to parse CSV. Make sure it is exported from Shopify Admin → Orders.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = () => {
    if (previewOrders.length > 0) {
      onImportSuccess(previewOrders);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Import Shopify Orders</h3>
              <p className="text-xs text-slate-500">Upload your orders export to auto-calculate refill dates</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {!file ? (
            <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-emerald-50/30 transition-all">
              <FileText className="w-10 h-10 text-slate-400 mb-2" />
              <p className="text-sm font-semibold text-slate-700">Click to select or drag and drop Shopify Orders CSV</p>
              <p className="text-xs text-slate-400 mt-1">Export from Shopify Admin → Orders → Export → CSV</p>
              <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
            </label>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-emerald-600" />
                <div>
                  <p className="text-sm font-bold text-slate-800">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB • {previewOrders.length} Orders detected</p>
                </div>
              </div>
              <button onClick={() => { setFile(null); setPreviewOrders([]); }} className="text-xs font-semibold text-rose-600 hover:text-rose-700">
                Choose Different File
              </button>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center space-x-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {previewOrders.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700">
                Preview Ingested Orders ({previewOrders.length})
              </div>
              <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                {previewOrders.slice(0, 5).map((ord, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{ord.customerName} ({ord.orderNumber})</p>
                      <p className="text-slate-500 text-[11px]">{ord.items.map(i => i.productTitle).join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded text-[10px]">
                        Refill: {ord.refillDueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={handleConfirmImport}
            disabled={previewOrders.length === 0 || isProcessing}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center space-x-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirm & Import {previewOrders.length > 0 ? `(${previewOrders.length})` : ''}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
