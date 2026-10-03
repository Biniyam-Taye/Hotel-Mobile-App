const ApiError = require('../utils/apiError');

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'field';
    const value = error.keyValue?.[field];
    const label = field === 'roomNumber' ? 'Room number' : field;
    error = new ApiError(
      409,
      value
        ? `${label} "${value}" already exists. Please use a different value.`
        : 'This record already exists.'
    );
  } else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const response = {
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
