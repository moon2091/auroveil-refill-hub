import Papa from 'papaparse';

/**
 * Standard Shopify Orders CSV Export Parser
 * Robust parsing for Safari (macOS/iOS) and Chrome (Android/Desktop)
 */
export function parseShopifyOrdersCsv(file, productsCatalog = []) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        try {
          const parsedOrders = [];
          const rows = results.data;

          if (!rows || rows.length === 0) {
            throw new Error('No rows found in CSV.');
          }

          // Group by Order Name / ID
          const orderGroups = {};

          rows.forEach((row) => {
            const orderNumber = (row['Name'] || row['Order ID'] || row['Id'] || '').trim();
            if (!orderNumber) return;

            if (!orderGroups[orderNumber]) {
              // Extract and normalize date safely for Safari
              const rawCreated = (row['Created at'] || '').trim();
              let dateStr = new Date().toISOString().split('T')[0];

              if (rawCreated) {
                // Handle "2026-10-29 09:16:37 -0400" or ISO format
                const firstPart = rawCreated.split(' ')[0].split('T')[0];
                if (/^\d{4}-\d{2}-\d{2}$/.test(firstPart)) {
                  dateStr = firstPart;
                } else {
                  const d = new Date(rawCreated);
                  if (!isNaN(d.getTime())) {
                    dateStr = d.toISOString().split('T')[0];
                  }
                }
              }

              const customerName = (
                row['Billing Name'] ||
                row['Shipping Name'] ||
                `${row['First Name'] || ''} ${row['Last Name'] || ''}`
              ).trim() || 'Valued Customer';

              const phone = (
                row['Phone'] ||
                row['Billing Phone'] ||
                row['Shipping Phone'] ||
                ''
              ).trim();

              const email = (row['Email'] || '').trim();
              const city = (row['Billing City'] || row['Shipping City'] || 'Dhaka').trim();
              const total = parseFloat(row['Total'] || '0') || 0;

              orderGroups[orderNumber] = {
                orderNumber,
                customerName,
                email,
                phone,
                city,
                orderDate: dateStr,
                total,
                items: []
              };
            }

            const itemTitle = (row['Lineitem name'] || row['Line Item Name'] || row['Title'] || '').trim();
            const sku = (row['Lineitem sku'] || '').trim();
            const quantity = parseInt(row['Lineitem quantity'] || '1', 10) || 1;
            const price = parseFloat(row['Lineitem price'] || '0') || 0;

            if (itemTitle) {
              orderGroups[orderNumber].items.push({
                productTitle: itemTitle,
                sku,
                quantity,
                price
              });
            }
          });

          // Generate replenishment cycles based on product rules
          Object.values(orderGroups).forEach((order, index) => {
            let maxUsageDays = 45; // default fallback

            order.items.forEach((item) => {
              const matchedProduct = productsCatalog.find(
                (p) =>
                  p.title.toLowerCase().includes(item.productTitle.toLowerCase()) ||
                  item.productTitle.toLowerCase().includes(p.title.toLowerCase()) ||
                  (item.sku && p.sku === item.sku)
              );
              if (matchedProduct && matchedProduct.typicalUsageDays) {
                maxUsageDays = Math.max(maxUsageDays, matchedProduct.typicalUsageDays);
              }
            });

            // Calculate replenishment due date safely
            const [year, month, day] = order.orderDate.split('-').map(Number);
            const dateObj = new Date(year, (month || 1) - 1, day || 1);
            dateObj.setDate(dateObj.getDate() + maxUsageDays);
            
            const refillDueYear = dateObj.getFullYear();
            const refillDueMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
            const refillDueDay = String(dateObj.getDate()).padStart(2, '0');
            const refillDueDate = `${refillDueYear}-${refillDueMonth}-${refillDueDay}`;

            parsedOrders.push({
              id: `imported-${Date.now()}-${index}`,
              ...order,
              refillDueDate,
              reminderStatus: 'pending'
            });
          });

          if (parsedOrders.length === 0) {
            throw new Error('No valid orders found in the uploaded file.');
          }

          resolve(parsedOrders);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error)
    });
  });
}
