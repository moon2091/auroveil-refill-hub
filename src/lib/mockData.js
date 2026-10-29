export const initialProducts = [
  {
    id: 'prod-1',
    sku: 'AV-FW-200',
    title: 'Auroveil Clarifying Gel Face Wash (200ml)',
    category: 'Skincare',
    price: 850,
    typicalUsageDays: 45,
    recommendedRefill: 'Auroveil Clarifying Gel Face Wash (200ml)',
    companionSuggestion: 'Auroveil Hydro-Boost Moisturizer (50ml)',
    description: 'Daily gentle botanical cleanser for all skin types.'
  },
  {
    id: 'prod-2',
    sku: 'AV-SH-350',
    title: 'Auroveil Botanical Restoring Shampoo (350ml)',
    category: 'Haircare',
    price: 1200,
    typicalUsageDays: 60,
    recommendedRefill: 'Auroveil Botanical Restoring Shampoo (350ml)',
    companionSuggestion: 'Auroveil Silk Repair Conditioner (250ml)',
    description: 'Sulfate-free scalp restoration formula.'
  },
  {
    id: 'prod-3',
    sku: 'AV-SUN-50',
    title: 'Auroveil Invisible Sun Shield SPF 50 (50ml)',
    category: 'Suncare',
    price: 950,
    typicalUsageDays: 30,
    recommendedRefill: 'Auroveil Invisible Sun Shield SPF 50 (50ml)',
    companionSuggestion: 'Auroveil Vitamin C Radiance Serum (30ml)',
    description: 'Broad spectrum lightweight matte finish sunscreen.'
  },
  {
    id: 'prod-4',
    sku: 'AV-SRM-30',
    title: 'Auroveil Niacinamide & Zinc Glow Serum (30ml)',
    category: 'Treatments',
    price: 1450,
    typicalUsageDays: 45,
    recommendedRefill: 'Auroveil Niacinamide & Zinc Glow Serum (30ml)',
    companionSuggestion: 'Auroveil Clarifying Gel Face Wash (200ml)',
    description: 'Pore refining and barrier support treatment.'
  }
];

export const initialOrders = [
  {
    id: 'ord-10291',
    orderNumber: '#AV-10291',
    customerName: 'Tasnim Rahman',
    phone: '+8801711223344',
    email: 'tasnim.rahman@gmail.com',
    city: 'Dhaka',
    orderDate: '2026-09-14',
    items: [
      { productTitle: 'Auroveil Clarifying Gel Face Wash (200ml)', sku: 'AV-FW-200', quantity: 1, price: 850 }
    ],
    total: 850,
    refillDueDate: '2026-10-29',
    reminderStatus: 'pending' // pending, approved, sent, snoozed
  },
  {
    id: 'ord-10284',
    orderNumber: '#AV-10284',
    customerName: 'Zahid Hasan',
    phone: '+8801819556677',
    email: 'zahid.hasan@yahoo.com',
    city: 'Chittagong',
    orderDate: '2026-08-30',
    items: [
      { productTitle: 'Auroveil Botanical Restoring Shampoo (350ml)', sku: 'AV-SH-350', quantity: 1, price: 1200 }
    ],
    total: 1200,
    refillDueDate: '2026-10-29',
    reminderStatus: 'pending'
  },
  {
    id: 'ord-10278',
    orderNumber: '#AV-10278',
    customerName: 'Nusrat Jahan',
    phone: '+8801912334455',
    email: 'nusrat.jahan@hotmail.com',
    city: 'Sylhet',
    orderDate: '2026-09-29',
    items: [
      { productTitle: 'Auroveil Invisible Sun Shield SPF 50 (50ml)', sku: 'AV-SUN-50', quantity: 1, price: 950 }
    ],
    total: 950,
    refillDueDate: '2026-10-29',
    reminderStatus: 'pending'
  },
  {
    id: 'ord-10265',
    orderNumber: '#AV-10265',
    customerName: 'Mahmudul Karim',
    phone: '+8801611778899',
    email: 'm.karim@gmail.com',
    city: 'Dhaka',
    orderDate: '2026-09-18',
    items: [
      { productTitle: 'Auroveil Niacinamide & Zinc Glow Serum (30ml)', sku: 'AV-SRM-30', quantity: 1, price: 1450 }
    ],
    total: 1450,
    refillDueDate: '2026-11-02',
    reminderStatus: 'upcoming'
  }
];

export const initialReminders = [
  {
    id: 'rem-1',
    orderId: 'ord-10291',
    orderNumber: '#AV-10291',
    customerName: 'Tasnim Rahman',
    phone: '+8801711223344',
    email: 'tasnim.rahman@gmail.com',
    productOrdered: 'Auroveil Clarifying Gel Face Wash (200ml)',
    orderedDate: '2026-09-14',
    dueDate: '2026-10-29',
    status: 'pending', // pending, approved, sent, snoozed
    couponCode: 'REFILL10',
    discountPercent: 10,
    recommendedProducts: [
      'Auroveil Clarifying Gel Face Wash (200ml)',
      'Auroveil Hydro-Boost Moisturizer (50ml)'
    ],
    whatsappDraft: `Assalamu Alaikum Tasnim! 🌿

It's been about 45 days since your order of *Auroveil Clarifying Gel Face Wash (200ml)*. 

We assume you might be running low and need a fresh refill to keep your daily skincare routine uninterrupted. 

To say thank you for being a valued customer, enjoy an exclusive *10% OFF* on your next refill order with coupon code: *REFILL10*

Order directly on Auroveil: https://auroveil.com/discount/REFILL10?redirect=/products/clarifying-gel-face-wash

Let us know if you need any recommendations!
Team Auroveil`,
    emailSubject: 'Time for a fresh glow? Your Auroveil Refill is ready (+10% OFF)',
    emailDraft: `<p>Dear Tasnim,</p><p>We hope you are enjoying your <strong>Auroveil Clarifying Gel Face Wash</strong>!</p><p>Based on regular daily usage, your bottle is estimated to be nearing empty right around now. To help you maintain consistency in your skincare routine without interruption, here is an exclusive 10% discount for your refill:</p><p style="padding:12px; background:#f6f7f6; font-size:16px; font-weight:bold; text-align:center;">Use Code: REFILL10</p><p><a href="https://auroveil.com/discount/REFILL10">Claim Refill on Auroveil</a></p><p>Warmly,<br/>Team Auroveil</p>`
  },
  {
    id: 'rem-2',
    orderId: 'ord-10284',
    orderNumber: '#AV-10284',
    customerName: 'Zahid Hasan',
    phone: '+8801819556677',
    email: 'zahid.hasan@yahoo.com',
    productOrdered: 'Auroveil Botanical Restoring Shampoo (350ml)',
    orderedDate: '2026-08-30',
    dueDate: '2026-10-29',
    status: 'pending',
    couponCode: 'HAIRCARE15',
    discountPercent: 15,
    recommendedProducts: [
      'Auroveil Botanical Restoring Shampoo (350ml)',
      'Auroveil Silk Repair Conditioner (250ml)'
    ],
    whatsappDraft: `Hello Zahid! 🌿

Checking in from Auroveil. Around 60 days have passed since you purchased *Auroveil Botanical Restoring Shampoo (350ml)*. 

If your bottle is running low, we've prepared a special *15% OFF* coupon for your fresh refill: *HAIRCARE15*. 

Pairs wonderfully with our Silk Repair Conditioner!

Reorder here: https://auroveil.com/discount/HAIRCARE15

Team Auroveil`,
    emailSubject: 'Your Haircare Refill is waiting (+15% OFF)',
    emailDraft: `<p>Dear Zahid,</p><p>It's about time to replenish your <strong>Auroveil Botanical Restoring Shampoo</strong>. Use code <strong>HAIRCARE15</strong> for 15% off your refill order today.</p>`
  }
];
