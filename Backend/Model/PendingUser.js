const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expires: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);
