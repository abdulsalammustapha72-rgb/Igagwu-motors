const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        unique: true
    },

    brand: {
        type: String,
        required: true,
        trim: true
    },

    model: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    mileage: {
        type: Number,
        default: 0
    },

    transmission: {
        type: String,
        enum: ['Automatic', 'Manual']
    },

    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric']
    },

    condition: {
        type: String,
        enum: ['New', 'Used'],
        default: 'Used'
    },

    color: {
        type: String
    },

    engine: {
        type: String
    },

    description: {
        type: String,
        required: true
    },

    images: [
        {
            url: String,
            public_id: String
        }
    ],

    featured: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        enum: ['Available', 'Reserved', 'Sold'],
        default: 'Available'
    },

    sold: {
        type: Boolean,
        default: false
    },

    location: {
        type: String
    },

    views: {
        type: Number,
        default: 0
    },

    isDeleted : {
        type: Boolean,
        default: false
    },

    featureOrders: {
        type: Number,
        default: 0
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);