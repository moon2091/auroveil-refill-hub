import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import RemindersQueue from './pages/RemindersQueue';
import OrdersList from './pages/OrdersList';
import ProductRules from './pages/ProductRules';
import Settings from './pages/Settings';
import CsvUploaderModal from './components/CsvUploaderModal';
import { initialProducts, initialOrders, initialReminders } from './lib/mockData';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [reminders, setReminders] = useState(initialReminders);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Approve action (human-in-the-loop)
  const handleApprove = (reminderId, details) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === reminderId
          ? { ...r, status: 'sent', sentAt: new Date().toISOString() }
          : r
      )
    );
  };

  // Snooze action
  const handleSnooze = (reminderId) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === reminderId ? { ...r, status: 'snoozed' } : r
      )
    );
  };

  // CSV Ingestion success
  const handleImportSuccess = (newOrders) => {
    setOrders((prev) => [...newOrders, ...prev]);

    // Automatically generate pending reminders for the imported orders
    const newReminders = newOrders.map((ord, idx) => ({
      id: `rem-gen-${Date.now()}-${idx}`,
      orderId: ord.id,
      orderNumber: ord.orderNumber,
      customerName: ord.customerName,
      phone: ord.phone,
      email: ord.email,
      productOrdered: ord.items[0]?.productTitle || 'Auroveil Skincare Product',
      orderedDate: ord.orderDate,
      dueDate: ord.refillDueDate,
      status: 'pending',
      couponCode: 'REFILL10',
      discountPercent: 10,
      recommendedProducts: [
        ord.items[0]?.productTitle || 'Auroveil Face Wash',
        'Auroveil Hydro-Boost Moisturizer (50ml)'
      ],
      whatsappDraft: `Assalamu Alaikum ${ord.customerName}! 🌿\n\nChecking in from Auroveil. It's time for your refill of ${ord.items[0]?.productTitle || 'your favorite product'}.\n\nUse code REFILL10 for 10% OFF your replenishment order: https://auroveil.com/discount/REFILL10\n\nTeam Auroveil`,
      emailSubject: `Time for your Auroveil Refill (+10% OFF)`,
      emailDraft: `<p>Dear ${ord.customerName},</p><p>We hope you are enjoying your Auroveil order! Here is a 10% discount on your next refill: <strong>REFILL10</strong>.</p>`
    }));

    setReminders((prev) => [...newReminders, ...prev]);
  };

  const pendingCount = reminders.filter((r) => r.status === 'pending').length;

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar onOpenImport={() => setIsImportModalOpen(true)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header pendingCount={pendingCount} />

          <main className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    reminders={reminders}
                    orders={orders}
                    onApprove={handleApprove}
                    onSnooze={handleSnooze}
                    onOpenImport={() => setIsImportModalOpen(true)}
                  />
                }
              />
              <Route
                path="/reminders"
                element={
                  <RemindersQueue
                    reminders={reminders}
                    onApprove={handleApprove}
                    onSnooze={handleSnooze}
                  />
                }
              />
              <Route
                path="/orders"
                element={
                  <OrdersList
                    orders={orders}
                    onOpenImport={() => setIsImportModalOpen(true)}
                  />
                }
              />
              <Route
                path="/products"
                element={
                  <ProductRules
                    products={products}
                    onUpdateProducts={setProducts}
                  />
                }
              />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>

        {/* CSV Uploader Modal */}
        <CsvUploaderModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImportSuccess={handleImportSuccess}
          productsCatalog={products}
        />
      </div>
    </BrowserRouter>
  );
}
