const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * ETB → USD conversion rate (update periodically as needed)
 * 1 USD ≈ 57 ETB  (Ethiopian Birr to US Dollar)
 */
const ETB_TO_USD_RATE = 57;

/**
 * Convert an ETB amount to USD for Stripe (which only accepts USD).
 * If already in USD or unknown currency, return as-is.
 */
export const convertToUSD = (amount, fromCurrency = 'etb') => {
  const lower = String(fromCurrency).toLowerCase().trim();
  if (lower === 'etb' || lower === 'birr') {
    return Math.max(0.5, parseFloat((amount / ETB_TO_USD_RATE).toFixed(2)));
  }
  return parseFloat(Number(amount).toFixed(2));
};

/**
 * Clean numeric string to number.
 * Strips currency symbols like "ETB", "$", "," etc.
 * e.g. "ETB 21,660" → 21660, "$150" → 150
 */
export const extractNumericAmount = (amountInput) => {
  if (typeof amountInput === 'number') return amountInput;
  if (!amountInput) return 1;
  const cleaned = String(amountInput).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) || parsed <= 0 ? 1 : parsed;
};

/**
 * Detect whether a price string/value appears to be in ETB.
 * Returns true if the string contains "ETB" or "Birr".
 */
export const isETBAmount = (amountStr) => {
  if (typeof amountStr !== 'string') return false;
  const upper = amountStr.toUpperCase();
  return upper.includes('ETB') || upper.includes('BIRR');
};

/**
 * Creates a Stripe Checkout Session via backend and redirects to Stripe Payment page.
 * Automatically converts ETB prices to USD for Stripe compatibility.
 * Attaches JWT token if user is logged in so orders are linked to their account.
 */
export const initiateStripeCheckout = async ({
  title,
  amount,          // Raw amount (may be ETB number or string like "ETB 21,660")
  currency = 'etb', // Source currency — defaults to ETB since prices are in ETB
  relatedType = 'Booking',
  relatedId = '',
  paymentId = '',
  customerEmail = '',
  customerName = '',
  cancelUrl = window.location.href,
}) => {
  try {
    // 1. Extract numeric value from amount (strips "ETB", commas, "$" etc.)
    const numericAmount = extractNumericAmount(amount);

    // 2. Detect source currency
    const sourceCurrency = (typeof amount === 'string' && isETBAmount(amount))
      ? 'etb'
      : String(currency).toLowerCase();

    // 3. Convert to USD (Stripe charges in USD)
    const usdAmount = convertToUSD(numericAmount, sourceCurrency);

    // Read JWT from localStorage so logged-in users' payments are linked to their account
    const token = localStorage.getItem('va_token');

    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Auto-fill customer info from stored user if not provided
    let resolvedEmail = customerEmail;
    let resolvedName = customerName;
    if (token && (!resolvedEmail || !resolvedName)) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('va_user') || '{}');
        if (!resolvedEmail && storedUser.email) resolvedEmail = storedUser.email;
        if (!resolvedName && (storedUser.firstName || storedUser.name)) {
          resolvedName = `${storedUser.firstName || storedUser.name} ${storedUser.lastName || ''}`.trim();
        }
      } catch { /* ignore */ }
    }

    const payload = {
      title,
      amount: usdAmount,       // Always USD for Stripe
      currency: 'usd',
      relatedType,
      relatedId,
      customerEmail: resolvedEmail,
      customerName: resolvedName,
      successUrl: `${window.location.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl,
    };

    if (paymentId) payload.paymentId = paymentId;

    const response = await fetch(`${API_BASE}/payments/create-checkout-session`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });


    const result = await response.json();
    if (!response.ok || !result.data?.url) {
      throw new Error(result.message || 'Failed to initiate payment session');
    }

    // Redirect user to Stripe Checkout
    window.location.href = result.data.url;
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    alert(`Payment Error: ${err.message}`);
    throw err;
  }
};
