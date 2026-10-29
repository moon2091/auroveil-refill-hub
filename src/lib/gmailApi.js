/**
 * Gmail API Client for Auroveil Refill Hub
 * Sends transactional replenishment emails directly from auroveilshop@gmail.com
 * Credentials are read safely from environment variables (VITE_GMAIL_*)
 */

const GMAIL_CONFIG = {
  clientId: import.meta.env.VITE_GMAIL_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_GMAIL_CLIENT_SECRET || '',
  refreshToken: import.meta.env.VITE_GMAIL_REFRESH_TOKEN || '',
  userEmail: import.meta.env.VITE_GMAIL_USER_EMAIL || 'auroveilshop@gmail.com',
};

let cachedAccessToken = null;
let tokenExpiresAt = 0;

/**
 * Exchanges the refresh token for a fresh Google access token
 */
export async function getGmailAccessToken() {
  if (!GMAIL_CONFIG.clientId || !GMAIL_CONFIG.refreshToken) {
    throw new Error('Gmail API credentials are missing. Please set VITE_GMAIL_CLIENT_ID and VITE_GMAIL_REFRESH_TOKEN in your environment.');
  }

  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GMAIL_CONFIG.clientId,
      client_secret: GMAIL_CONFIG.clientSecret,
      refresh_token: GMAIL_CONFIG.refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.warn('OAuth refresh token exchange note:', errorData);
    throw new Error(`Google token refresh failed: ${errorData}`);
  }

  const data = await response.json();
  cachedAccessToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in || 3600) * 1000;
  return cachedAccessToken;
}

/**
 * Base64URL encoding helper compliant with RFC 4648 §5
 */
function toBase64Url(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Sends an email via the Gmail REST API (users.messages.send)
 */
export async function sendGmailEmail({ to, subject, htmlBody, from = GMAIL_CONFIG.userEmail }) {
  if (!to || !to.includes('@')) {
    throw new Error('Please provide a valid recipient email address.');
  }

  const emailLines = [
    `From: "Auroveil Skincare" <${from}>`,
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    htmlBody,
  ].join('\r\n');

  const rawMessage = toBase64Url(emailLines);
  const accessToken = await getGmailAccessToken();

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: rawMessage,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gmail API Error (${response.status}): ${errorText}`);
  }

  return await response.json();
}
