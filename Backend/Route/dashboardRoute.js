const express = require('express');
const router = express.Router();

const dashboardStats = require('../Controller/dashBoardController');

const adminMiddleware = require('../Middleware/adminMiddleware');

const authMiddleware = require('../Middleware/authMiddleware');

router.get('/', authMiddleware, adminMiddleware, dashboardStats);

module.exports = router