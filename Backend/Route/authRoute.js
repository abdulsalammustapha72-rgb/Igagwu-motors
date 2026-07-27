const express = require("express");
const router = express.Router();

const { register, verifyEmail, forgotPassword, resetPassword, resendResetCode, logout, resendCodes, refreshTokens, login } = require("../Controller/authController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/register", register);
router.post('/verify', verifyEmail);
router.post('/resend-code', resendCodes);
router.post('/resend-reset-code', resendResetCode);
router.post('/logout', logout);
router.post('/refresh-token', refreshTokens);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post("/login", login);

module.exports = router;