const express = require('express');

const router = express.Router();

const authMiddleware = require('../Middleware/authMiddleware')

const adminMiddleware = require('../Middleware/adminMiddleware');

const uploadMiddleware = require('../Middleware/uploadMiddleware');

const { addCar, getAllCars, getSingleCar, updateCar, deleteCar, toggleFeaturedCar, getFeaturedCars, getPopularCars, softDeleteCar, restoreCar,latestCars, getBrands, searchCars } = require('../Controller/carController');

router.post('/add', authMiddleware, adminMiddleware, uploadMiddleware.array('images', 10), addCar);
router.get('/', getAllCars);
router.get('/featured', getFeaturedCars);
router.get('/popular', getPopularCars);
router.get('/latestcars', latestCars);
router.get('/brands', getBrands);
router.get("/search", searchCars);
router.patch('/:id/featured', authMiddleware, adminMiddleware, toggleFeaturedCar);
router.get('/:id', getSingleCar);
router.put('/:id', authMiddleware, adminMiddleware, uploadMiddleware.array('images', 10), updateCar);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCar);
router.patch('/:id/delete', authMiddleware, adminMiddleware, softDeleteCar);
router.patch('/:id/restore', authMiddleware, adminMiddleware, restoreCar);


module.exports = router;