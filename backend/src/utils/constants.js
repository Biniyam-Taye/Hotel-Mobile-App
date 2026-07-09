export const ROLES = {
  GUEST: 'guest',
  HOTEL_ADMIN: 'hotel_admin',
  RECEPTIONIST: 'receptionist',
  SUPER_ADMIN: 'super_admin',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
};

export const HOTEL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  PENDING: 'pending_approval',
};

export const PAYMENT_METHODS = [
  'visa',
  'mastercard',
  'google_pay',
  'apple_pay',
  'telebirr',
  'cbe',
  'bank_transfer',
  'wallet',
  'stripe',
];

export const LOYALTY_TIERS = ['silver', 'gold', 'platinum', 'diamond'];
