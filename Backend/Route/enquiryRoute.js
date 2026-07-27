const express = require('express');

const router = express.Router();

const { createEnquiry, getAllEnquiries, getSingleEnquiry, updateEnquiryStatus, deleteEnquiry } = require('../Controller/enquiryController');

const authMiddleware = require('../Middleware/authMiddleware');

const adminMiddleware = require('../Middleware/adminMiddleware');

router.post('/', createEnquiry);
router.get('/', authMiddleware, adminMiddleware, getAllEnquiries);
router.get('/:id', authMiddleware, adminMiddleware, getSingleEnquiry);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateEnquiryStatus);
router.delete('/:id', authMiddleware, adminMiddleware, deleteEnquiry);

module.exports = router;