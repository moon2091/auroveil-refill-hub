import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import RemindersQueue from './pages/RemindersQueue';
import OrdersList from './pages/OrdersList';
import ProductRules from './pages/ProductRules';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CsvUploaderModal from './components/CsvUploaderModal';
import { AuthProvider } from './context/AuthContext';
import { initialProducts, initialOrders, initialReminders } from './lib/mockData';

function DashboardLayout({ children, onOpenImport, pendingCount }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        onOpenImport={onOpenImport}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          pendingCount={pendingCount}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState(initialProducts);

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('auroveil_real_orders_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return initialOrders;
  });

  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('auroveil_real_reminders_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return initialReminders;
  });

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('auroveil_real_orders_v2', JSON.stringify(orders));
    } catch (e) {
      console.warn(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('auroveil_real_reminders_v2', JSON.stringify(reminders));
    } catch (e) {
      console.warn(e);
    }
  }, [reminders]);

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
        ord.items[0]?.productTitle || 'Auroveil Care Product',
        ord.items[1]?.productTitle || 'Auroveil Protection Product'
      ],
      whatsappDraft: `Assalamu Alaikum ${ord.customerName}! 🌿\n\nChecking in from Auroveil. It's time for your refill of ${ord.items[0]?.productTitle || 'your recent order'}.\n\nUse code REFILL10 for 10% OFF your replenishment order: https://auroveil.com/discount/REFILL10\n\nTeam Auroveil`,
      emailSubject: `Time for your Auroveil Refill (+10% OFF)`,
      emailDraft: `<p>Dear ${ord.customerName},</p><p>We hope you are enjoying your Auroveil order! Here is a 10% discount on your next refill: <strong>REFILL10</strong>.</p>`
    }));

    setReminders((prev) => [...newReminders, ...prev]);
  };

  const pendingCount = reminders.filter((r) => r.status === 'pending').length;

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Team Dashboard Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout
                  onOpenImport={() => setIsImportModalOpen(true)}
                  pendingCount={pendingCount}
                >
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
                </DashboardLayout>

                {/* CSV Uploader Modal */}
                <CsvUploaderModal
                  isOpen={isImportModalOpen}
                  onClose={() => setIsImportModalOpen(false)}
                  onImportSuccess={handleImportSuccess}
                  productsCatalog={products}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
