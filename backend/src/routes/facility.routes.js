const express = require('express');
const ctrl = require('../controllers/facility.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const schema = require('../validations/facility.validation');

const router = express.Router();

router.get('/public', ctrl.getPublicFacilities);

router.route('/')
  .get(ctrl.getFacilities)
  .post(protect, authorize('admin'), upload.single('image'), validate(schema.createFacility), ctrl.createFacility);

router.route('/:id')
  .get(validate(schema.mongoIdParam), ctrl.getFacility)
  .put(protect, authorize('admin'), upload.single('image'), validate(schema.updateFacility), ctrl.updateFacility)
  .delete(protect, authorize('admin'), validate(schema.mongoIdParam), ctrl.deleteFacility);

module.exports = router;
