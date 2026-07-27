const User = require('../Model/User');

const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        if (user.role !== 'Admin') {
            return res.status(403).json({
                message: 'Admin access only.'
            });
        };

        next();

    } catch (err) { 
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

module.exports = adminMiddleware;