const express = require('express');

const router = express.Router();

const authMiddleware = require('../Middleware/authMiddleware');

const adminMiddleware = require('../Middleware/adminMiddleware');

const { createReview, getCarReview, getAllReview, approveReview, deleteReview } = require('../Controller/reviewController');

router.post('/', createReview);
router.get('/car/:carId', getCarReview);
router.patch('/:id/approve', authMiddleware, adminMiddleware, approveReview);
router.get('/', authMiddleware, adminMiddleware, getAllReview);
router.delete('/:id', authMiddleware, adminMiddleware, deleteReview);

module.exports = router;