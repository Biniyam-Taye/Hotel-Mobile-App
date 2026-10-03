const ApiError = require('../utils/apiError');

const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    // Assign validated and coerced data back to req objects
    if (parsed.body) req.body = parsed.body;
    if (parsed.query) req.query = parsed.query;
    if (parsed.params) req.params = parsed.params;
    
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

