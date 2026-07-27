const mongoose = require('mongoose');

const resendCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    expires: {
        type: Number,
        required: true
    },
    lastResend: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ResendCode', resendCodeSchema);