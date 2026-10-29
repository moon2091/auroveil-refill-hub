export const initialProducts = [
  {
    id: 'prod-1',
    sku: 'IR261018001',
    title: 'Care Plus 20% Icaridin Insect Repellent Spray 200ml',
    category: 'Protection',
    price: 1850,
    typicalUsageDays: 45,
    recommendedRefill: 'Care Plus 20% Icaridin Insect Repellent Spray 200ml',
    companionSuggestion: 'Life Brand DEET Free Insect Repellent II 20% Icaridin 100ml',
    description: 'Long-lasting insect and mosquito repellent spray.'
  },
  {
    id: 'prod-2',
    sku: 'IR261021001',
    title: 'Life Brand DEET Free Insect Repellent II 20% Icaridin 100ml',
    category: 'Protection',
    price: 1520,
    typicalUsageDays: 45,
    recommendedRefill: 'Life Brand DEET Free Insect Repellent II 20% Icaridin 100ml',
    companionSuggestion: 'Care Plus 20% Icaridin Insect Repellent Spray 200ml',
    description: 'Compact travel-size DEET-free repellent.'
  },
  {
    id: 'prod-3',
    sku: 'BL261016001',
    title: 'Aveeno Baby Calming Comfort Lotion 227g (8 oz)',
    category: 'Baby Care',
    price: 2010,
    typicalUsageDays: 45,
    recommendedRefill: 'Aveeno Baby Calming Comfort Lotion 227g (8 oz)',
    companionSuggestion: 'Aveeno Baby Daily Moisture Wash & Shampoo (354ml)',
    description: 'Moisturizing lavender and vanilla calming lotion.'
  }
];

export const initialOrders = [
  {
    id: 'ord-av1003',
    orderNumber: '#AV1003',
    customerName: 'Nadim Iqbal',
    phone: '01670110702',
    email: '',
    city: 'Dhaka',
    orderDate: '2026-10-29',
    items: [
      { productTitle: 'Care Plus 20% Icaridin Insect Repellent Spray 200ml', sku: 'IR261018001', quantity: 1, price: 1850 },
      { productTitle: 'Life Brand DEET Free Insect Repellent II 20% Icaridin 100ml', sku: 'IR261021001', quantity: 1, price: 1520 }
    ],
    total: 3450,
    refillDueDate: '2026-12-13',
    reminderStatus: 'pending'
  },
  {
    id: 'ord-av1002',
    orderNumber: '#AV1002',
    customerName: 'Mohiyuddeen Ahmad',
    phone: '01707963501',
    email: 'moon.studiojunction@gmail.com',
    city: 'Dhaka',
    orderDate: '2026-10-29',
    items: [
      { productTitle: 'Care Plus 20% Icaridin Insect Repellent Spray 200ml', sku: 'IR261018001', quantity: 1, price: 1850 },
      { productTitle: 'Life Brand DEET Free Insect Repellent II 20% Icaridin 100ml', sku: 'IR261021001', quantity: 1, price: 1520 }
    ],
    total: 3450,
    refillDueDate: '2026-12-13',
    reminderStatus: 'pending'
  },
  {
    id: 'ord-1001',
    orderNumber: '#1001',
    customerName: 'Faruk Hasan',
    phone: '+8801833392733',
    email: 'fhasan.net@gmail.com',
    city: 'Dhaka',
    orderDate: '2026-10-24',
    items: [
      { productTitle: 'Aveeno Baby Calming Comfort Lotion 227g (8 oz)', sku: 'BL261016001', quantity: 1, price: 2010 }
    ],
    total: 2090,
    refillDueDate: '2026-12-08',
    reminderStatus: 'pending'
  }
];

export const initialReminders = [
  {
    id: 'rem-av1003',
    orderId: 'ord-av1003',
    orderNumber: '#AV1003',
    customerName: 'Nadim Iqbal',
    phone: '01670110702',
    email: '',
    productOrdered: 'Care Plus 20% Icaridin Insect Repellent Spray 200ml',
    orderedDate: '2026-10-29',
    dueDate: '2026-10-29',
    status: 'pending',
    couponCode: 'REFILL10',
    discountPercent: 10,
    recommendedProducts: [
      'Care Plus 20% Icaridin Insect Repellent Spray 200ml',
      'Life Brand DEET Free Insect Repellent II 20% Icaridin 100ml'
    ],
    whatsappDraft: `Assalamu Alaikum Nadim! 🌿

Checking in from Auroveil. It's time for your refill of *Care Plus 20% Icaridin Insect Repellent Spray 200ml*.

As a valued customer, enjoy an exclusive *10% OFF* on your next refill order with coupon code: *REFILL10*

Order directly on Auroveil: https://auroveil.com/discount/REFILL10

Team Auroveil`,
    emailSubject: 'Time for your Auroveil Refill (+10% OFF)',
    emailDraft: `<p>Dear Nadim,</p><p>We hope you are enjoying your recent order. It's time to refill your <strong>Care Plus 20% Icaridin Insect Repellent Spray 200ml</strong>.</p><p>Use coupon code <strong>REFILL10</strong> for 10% off your replenishment order today.</p>`
  },
  {
    id: 'rem-av1002',
    orderId: 'ord-av1002',
    orderNumber: '#AV1002',
    customerName: 'Mohiyuddeen Ahmad',
    phone: '01707963501',
    email: 'moon.studiojunction@gmail.com',
    productOrdered: 'Care Plus 20% Icaridin Insect Repellent Spray 200ml',
    orderedDate: '2026-10-29',
    dueDate: '2026-10-29',
    status: 'pending',
    couponCode: 'REFILL10',
    discountPercent: 10,
    recommendedProducts: [
      'Care Plus 20% Icaridin Insect Repellent Spray 200ml',
      'Life Brand DEET Free Insect Repellent II 20% Icaridin 100ml'
    ],
    whatsappDraft: `Assalamu Alaikum Mohiyuddeen! 🌿

Checking in from Auroveil. It's time for your refill of *Care Plus 20% Icaridin Insect Repellent Spray 200ml*.

Enjoy an exclusive *10% OFF* on your replenishment order with coupon code: *REFILL10*

Order directly on Auroveil: https://auroveil.com/discount/REFILL10

Team Auroveil`,
    emailSubject: 'Time for your Auroveil Refill (+10% OFF)',
    emailDraft: `<p>Dear Mohiyuddeen,</p><p>We hope you are enjoying your order. It's time to replenish your <strong>Care Plus 20% Icaridin Insect Repellent Spray 200ml</strong>.</p><p>Use code <strong>REFILL10</strong> for 10% off your replenishment order.</p>`
  },
  {
    id: 'rem-1001',
    orderId: 'ord-1001',
    orderNumber: '#1001',
    customerName: 'Faruk Hasan',
    phone: '+8801833392733',
    email: 'fhasan.net@gmail.com',
    productOrdered: 'Aveeno Baby Calming Comfort Lotion 227g (8 oz)',
    orderedDate: '2026-10-24',
    dueDate: '2026-10-29',
    status: 'pending',
    couponCode: 'BABYCARE10',
    discountPercent: 10,
    recommendedProducts: [
      'Aveeno Baby Calming Comfort Lotion 227g (8 oz)',
      'Care Plus 20% Icaridin Insect Repellent Spray 200ml'
    ],
    whatsappDraft: `Assalamu Alaikum Faruk! 🌿

Checking in from Auroveil. It's time for your refill of *Aveeno Baby Calming Comfort Lotion 227g*.

Enjoy *10% OFF* on your next order with coupon code: *BABYCARE10*

Order directly on Auroveil: https://auroveil.com/discount/BABYCARE10

Team Auroveil`,
    emailSubject: 'Your Aveeno Baby Care Refill is waiting (+10% OFF)',
    emailDraft: `<p>Dear Faruk,</p><p>It's about time to replenish your <strong>Aveeno Baby Calming Comfort Lotion</strong>.</p><p>Use code <strong>BABYCARE10</strong> for 10% off your replenishment order today.</p>`
  }
];
