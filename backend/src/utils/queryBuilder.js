/**
 * Reusable helper to build a filtered, sorted, and paginated Mongoose query.
 * Supports:
 *  - Field filtering: ?field=value
 *  - Operators: ?price[gte]=100
 *  - Keyword search: ?search=deluxe (searches 'name' and 'title' fields by default)
 *  - Sorting: ?sort=price,-createdAt
 *  - Field selection: ?fields=name,price
 *  - Pagination: ?page=1&limit=10
 *
 * @param {mongoose.Model} Model
 * @param {object} reqQuery
 * @param {string[]} searchFields - fields to apply regex search on
 * @returns {Promise<{data, total, page, pages}>}
 */
const queryBuilder = async (Model, reqQuery, searchFields = ['name', 'title']) => {
  // 1. Copy query and remove special fields
  const queryObj = { ...reqQuery };
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  excludedFields.forEach((f) => delete queryObj[f]);

  // 2. Advanced filtering: replace operators (gte, gt, lte, lt) with MongoDB syntax
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let filter = JSON.parse(queryStr);

  // 3. Keyword search (case-insensitive regex on specified fields)
  if (reqQuery.search) {
    const regex = { $regex: reqQuery.search, $options: 'i' };
    filter.$or = searchFields.map((f) => ({ [f]: regex }));
  }

  // 4. Pagination
  const page = parseInt(reqQuery.page, 10) || 1;
  const limit = parseInt(reqQuery.limit, 10) || 10;
  const skip = (page - 1) * limit;

  // 5. Sorting
  const sort = reqQuery.sort ? reqQuery.sort.split(',').join(' ') : '-createdAt';

  // 6. Field selection
  const fields = reqQuery.fields ? reqQuery.fields.split(',').join(' ') : '-__v';

  // 7. Execute query
  const [data, total] = await Promise.all([
    Model.find(filter).sort(sort).skip(skip).limit(limit).select(fields),
    Model.countDocuments(filter),
  ]);

  return {
    data,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

module.exports = queryBuilder;
