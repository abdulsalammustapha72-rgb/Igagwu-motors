const bcrypt = require('bcrypt');

const transporter = require('../Config/nodemail');

const User = require('../Model/User');

const pendingUser = require('../Model/PendingUser');

const resendCode = require('../Model/ResendCode');

const generateAccessToken = require('../Utils/GenerateAccessToken');

const generateCode = require('../Utils/GenerateCode');

const generateRefreshToken = require('../Utils/GenerateRefreshToken');

const SALT_ROUND = 12;

//Register

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: 'User exists already'
            });
        };
        
        const existingPendingUser = await pendingUser.findOne({ email });
        if (existingPendingUser) {
            await pendingUser.deleteOne({ email });
        };

        const code = generateCode();

        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
        console.log('About to send mail');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: email,

            subject: 'Verify your account',

            html: `
                <h2>Email verification</h2>
                <p>Your verification code is</p>
                <p>${code}</p>
                <p>Expires in 10 minutes.</p>
            `
        });

        console.log('Mail sent successfull');
    
        await pendingUser.create({
            name,
            email,
            password: hashedPassword,
            code,
            expires: Date.now() + 10 * 60 * 1000
        });

        res.status(200).json({
            message: 'Registration successful. Verification code sent to your email.'
        });

    } catch (err) {
        console.log('REGISTRATION ERROR:', err);
        return res.status(500).json({
            message: err.message
        });
    };
};

// Verification

const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        const pending = await pendingUser.findOne({ email });

        if (!pending) {
            return res.status(404).json({
                message: 'Email not found.'
            });
        };

        if (pending.expires < Date.now()) {
            return res.status(403).json({
                message: 'Code has expired.'
            });
        };

        if (pending.code !== code) {
            return res.status(401).json({
                message: 'Invalid code.'
            });
        };

        const user = await User.create({

            name: pending.name,

            email: pending.email,

            password: pending.password

        });

        user.verified = true;

        await pendingUser.deleteOne({ email });
        
        const token = generateAccessToken(user);

        res.status(200).json({
            message:"Email verified successfully.",
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

//Login

const login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(403).json({
                message: 'Invalid credentials.'
            });
        };

        const expires = rememberMe ? '30d' : '1d';
        
        const accessToken = generateAccessToken(existingUser);

        const refreshToken = generateRefreshToken(existingUser, expires);

        existingUser.refreshToken = refreshToken;

        existingUser.lastLogin = new Date();

        await existingUser.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,

            secure: false,

            sameSite: 'lax',

            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Login sucessfully.',
            accessToken,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

//Resend Code

const resendCodes = async (req, res) => {
    try {
        const { email, code } = req.body;

        const pending = await pendingUser.findOne({ email });
        if (!pending) {
            return res.status(404).json({
                message: 'No pending email.'
            });
        };

        const codes = generateCode();

        pending.code = codes;

        pending.expires = Date.now() + 10 * 60 * 1000;

        pending.lastResend = new Date();

        const now = Date.now();

        if (pending.lastResend && now - pending.lastResend < 60 * 1000) {
            return res.status(429).json({
                message: 'You can only resend the code once per minute.'
            });
        };
        
        await pending.save();

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: email,

            subject: 'New Verification Code.',

            html: `
                <h2>Email verification</h2>
                <p>Your new verification code is</p>
                <p>${codes}</p>
                <p>Expires in 10 minutes.</p>
            `
        });

        res.status(200).json({
            message: 'New verification code sent.'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const resendResetCode = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                message: 'Email not found.'
            });
        };

        const codes = generateCode();

        user.resetCode = codes;

        user.resetCodeExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: email,

            subject: 'New reset code.',

            html: `
                <h2>Reset Password</h2>
                <p>Your new reset code is</p>
                <p>${codes}</p>
                <p>Expires in 10 minutes.</p>
            `
        });

        res.status(200).json({
            message: 'New reset code sent.'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const getUser = await User.findOne({ email });

        if (!getUser) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        const codes = generateCode();

        getUser.resetCode = codes;

        getUser.resetCodeExpire = Date.now() + 10 * 60 * 1000;

        await getUser.save();

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,

            to: email,

            subject: 'Password reset.',

            html: `
                <h2>Password Reset.</h2>
                <p>Your reset code is</p>
                <p>${codes}</p>
                <p>Expires in 10 minutes.</p>
            `
        });

        res.json({
            message: 'Password reset code sent.'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const resetPassword = async (req, res) => {
    try {
        const { email, code, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        if (user.resetCodeExpire < Date.now()) {
            return res.status(403).json({
                message: 'Code has expired.'
            })
        };

        if (user.resetCode !== code) {
            return res.status(401).json({
                message: 'Invalid code.'
            });
        };

        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
            return res.status(400).json({
                message: 'New password cannot be the same as the old password.'
            });
        };

        const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

        user.password = hashedPassword;
        user.resetCode = null;
        user.resetCodeExpire = null;
        user.verified = true;

        await user.save();

        res.json({
            message: 'Password changed successfully.'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const refreshTokens = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: 'Refresh token missing.'
            });
        };

        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        if (user.refreshToken !== token) {
            return res.status(403).json({
                message: 'Invalid refresh token.'
            });
        };

        const accessToken = generateAccessToken(user);

        res.json({
            accessToken
        });

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Refresh token expired'
        });
    };
};

const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (token) {
            const user = await User.findOne({
                refreshToken: token
            });

            if (user) {
                user.refreshToken = null;
                await user.save();
            };
        };
        
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        res.json({
            message: 'Logged out successfully.'
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Server Error'
        });
    };
};

module.exports = { register, verifyEmail, resendCodes, resendResetCode, forgotPassword, logout, resetPassword, refreshTokens, login };
