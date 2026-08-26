const express = require('express');
const ctrl = require('../controllers/event.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const schema = require('../validations/event.validation');

const router = express.Router();

router.get('/categories', ctrl.getCategories);
router.get('/categories/:id', validate(schema.mongoIdParam), ctrl.getCategory);

router.get('/spaces/public', ctrl.getPublicEventSpaces);

router.route('/spaces')
  .get(ctrl.getEventSpaces)
  .post(protect, authorize('admin'), upload.single('image'), validate(schema.createEventSpace), ctrl.createEventSpace);

router.route('/spaces/:id')
  .get(validate(schema.mongoIdParam), ctrl.getEventSpace)
  .put(protect, authorize('admin'), upload.single('image'), validate(schema.updateEventSpace), ctrl.updateEventSpace)
  .delete(protect, authorize('admin'), validate(schema.mongoIdParam), ctrl.deleteEventSpace);

module.exports = router;
