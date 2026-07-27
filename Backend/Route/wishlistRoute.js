const express = require('express');
const router = express.Router();

const authMiddleware = require('../Middleware/authMiddleware');

const { addToWishlist, getWishlist, removeWishlist } = require('../Controller/wishlistController');

router.post('/', authMiddleware, addToWishlist);
router.get('/', getWishlist);
router.delete('/:carId', removeWishlist);

module.exports = router;