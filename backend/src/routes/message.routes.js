const express = require('express');
const { getContacts, getConversation, sendMessage } = require('../controllers/message.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// All message routes are protected
router.use(protect);

router.get('/contacts', getContacts);
router.get('/:userId', getConversation);
router.post('/', sendMessage);

module.exports = router;
