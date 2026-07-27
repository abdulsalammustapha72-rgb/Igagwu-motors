const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: false
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'closed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);