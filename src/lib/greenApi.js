/**
 * GREEN-API Integration Client
 * Sends automated WhatsApp messages directly to customers
 */

const GREENAPI_INSTANCE_ID = '710722743201';
const GREENAPI_TOKEN = '6a5ef51ff11a46379683a7b40f60404963bc2334d53f4aad90';
const GREENAPI_BASE_URL = `https://api.green-api.com/waInstance${GREENAPI_INSTANCE_ID}`;

/**
 * Formats standard phone numbers into Green API chatId format (e.g., 8801816480712@c.us)
 */
export function formatToChatId(phone) {
  if (!phone) return null;
  // Strip all non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // Handle local Bangladesh format (e.g., 017... -> 88017...)
  if (cleaned.startsWith('01')) {
    cleaned = '88' + cleaned;
  } else if (cleaned.startsWith('+880')) {
    cleaned = cleaned.replace(/^\+/, '');
  }

  return `${cleaned}@c.us`;
}

/**
 * Dispatches WhatsApp message via Green API
 */
export async function sendGreenApiMessage(phone, message) {
  const chatId = formatToChatId(phone);

  if (!chatId) {
    throw new Error('Invalid phone number provided for WhatsApp dispatch.');
  }

  const endpoint = `${GREENAPI_BASE_URL}/sendMessage/${GREENAPI_TOKEN}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatId,
      message,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Green API WhatsApp error (${response.status}): ${errorBody}`);
  }

  return await response.json();
}
