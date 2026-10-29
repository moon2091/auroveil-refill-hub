import Papa from 'papaparse';

/**
 * Standard Shopify Orders CSV Export Parser
 * Parses customer, line items, and calculates estimated replenishment date
 */
export function parseShopifyOrdersCsv(file, productsCatalog = []) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsedOrders = [];
          const rows = results.data;

          // Group by Order Name / ID
          const orderGroups = {};

          rows.forEach((row) => {
            const orderNumber = row['Name'] || row['Order ID'] || row['Id'];
            if (!orderNumber) return;

            if (!orderGroups[orderNumber]) {
              orderGroups[orderNumber] = {
                orderNumber,
                customerName: (row['Billing Name'] || `${row['First Name'] || ''} ${row['Last Name'] || ''}`).trim() || 'Valued Customer',
                email: row['Email'] || '',
                phone: row['Phone'] || row['Billing Phone'] || row['Shipping Phone'] || '',
                city: row['Billing City'] || row['Shipping City'] || 'Dhaka',
                orderDate: row['Created at'] ? row['Created at'].split('T')[0] : new Date().toISOString().split('T')[0],
                total: parseFloat(row['Total'] || '0') || 0,
                items: []
              };
            }

            const itemTitle = row['Lineitem name'] || row['Line Item Name'] || row['Title'];
            const sku = row['Lineitem sku'] || '';
            const quantity = parseInt(row['Lineitem quantity'] || '1', 10);
            const price = parseFloat(row['Lineitem price'] || '0');

            if (itemTitle) {
              orderGroups[orderNumber].items.push({
                productTitle: itemTitle,
                sku,
                quantity,
                price
              });
            }
          });

          // Generate reminders based on catalog usage days
          Object.values(orderGroups).forEach((order, index) => {
            let maxUsageDays = 45; // default fallback

            order.items.forEach((item) => {
              const matchedProduct = productsCatalog.find(
                (p) => p.title.toLowerCase() === item.productTitle.toLowerCase() || (item.sku && p.sku === item.sku)
              );
              if (matchedProduct && matchedProduct.typicalUsageDays) {
                maxUsageDays = Math.max(maxUsageDays, matchedProduct.typicalUsageDays);
              }
            });

            const orderDateObj = new Date(order.orderDate);
            const dueDateObj = new Date(orderDateObj);
            dueDateObj.setDate(dueDateObj.getDate() + maxUsageDays);
            const refillDueDate = dueDateObj.toISOString().split('T')[0];

            parsedOrders.push({
              id: `imported-${Date.now()}-${index}`,
              ...order,
              refillDueDate,
              reminderStatus: 'pending'
            });
          });

          resolve(parsedOrders);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error)
    });
  });
}
