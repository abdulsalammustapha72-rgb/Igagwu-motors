const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    }
}, { timestamps: true });

wishlistSchema.index(
    { user: 1, car: 1, },
    { unique: true }
)

module.exports = mongoose.model('Wishlist', wishlistSchema);