/**
 * GREEN-API Integration Client
 * Sends automated WhatsApp messages directly to customers
 * Currently in TEST MODE: All outgoing customer messages are redirected to 8801816480712@c.us
 */

const GREENAPI_INSTANCE_ID = '710722743201';
const GREENAPI_TOKEN = '6a5ef51ff11a46379683a7b40f60404963bc2334d53f4aad90';
const GREENAPI_BASE_URL = `https://api.green-api.com/waInstance${GREENAPI_INSTANCE_ID}`;

// Verified test recipient for Green-API Developer/Free tariff
export const TEST_OVERRIDE_NUMBER = '8801816480712@c.us';

/**
 * Formats standard phone numbers into Green API chatId format (e.g., 8801816480712@c.us)
 */
export function formatToChatId(phone) {
  if (!phone) return null;
  let cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('01')) {
    cleaned = '88' + cleaned;
  } else if (cleaned.startsWith('+880')) {
    cleaned = cleaned.replace(/^\+/, '');
  }

  return `${cleaned}@c.us`;
}

/**
 * Dispatches WhatsApp message via Green API
 * In test mode, safely sends to 8801816480712@c.us with customer prefix
 */
export async function sendGreenApiMessage(phone, message, bypassTestMode = false) {
  const originalChatId = formatToChatId(phone);

  // In test mode, always route to 8801816480712 to avoid 466 quota restriction
  const targetChatId = bypassTestMode ? (originalChatId || TEST_OVERRIDE_NUMBER) : TEST_OVERRIDE_NUMBER;

  const finalMessage = bypassTestMode
    ? message
    : `[🧪 Auroveil Refill Test | Target Customer: ${phone || 'Unknown'}]\n\n${message}`;

  const endpoint = `${GREENAPI_BASE_URL}/sendMessage/${GREENAPI_TOKEN}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId: targetChatId,
      message: finalMessage,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Green API WhatsApp error (${response.status}): ${errorBody}`);
  }

  const result = await response.json();
  return {
    ...result,
    routedTo: targetChatId,
    targetCustomer: phone,
  };
}
