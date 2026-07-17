const ApiError = require('../utils/apiError');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    // Zod v4 uses error.issues; fall back to error.errors for older versions
    const issues = error.issues || error.errors || [];
    const formattedErrors = issues.map((err) => ({
      path: (err.path || []).join('.'),
      message: err.message,
    }));
    // Return a 400 bad request error with validation details
    next(new ApiError(400, 'Validation Error', false, JSON.stringify(formattedErrors)));
  }
};

module.exports = validate;
