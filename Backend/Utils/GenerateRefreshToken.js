const jwt = require('jsonwebtoken');

const generateRefreshToken = (user, expires = '7d') => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: expires }
    );
}

module.exports = generateRefreshToken;