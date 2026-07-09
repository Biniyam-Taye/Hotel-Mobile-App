export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
  }
}

export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const sendSuccess = (res, data, statusCode = 200, meta = {}) => {
  res.status(statusCode).json({ success: true, data, ...meta });
};

export const sendError = (res, message, statusCode = 500, details = null) => {
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(details && { details }),
  });
};

/**
 * Generate a human-readable booking reference (e.g. BK-ABC123).
 */
export const generateBookingRef = () => {
  const suffix = Date.now().toString(36).toUpperCase();
  return `BK-${suffix}`;
};

/**
 * Count nights between two dates (exclusive of check-out day).
 */
export const countNights = (checkIn, checkOut) => {
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
};

/**
 * Check if two date ranges overlap (hotel booking semantics).
 */
export const datesOverlap = (aStart, aEnd, bStart, bEnd) => {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
};
