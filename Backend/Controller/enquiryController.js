const Car = require('../Model/Car');
const Enquiry = require('../Model/Enquiry');
const mongoose = require('mongoose');

const validateName = require('../Utils/nameValidation');
const validatePhone = require('../Utils/phoneValidation');
const validateMessage = require('../Utils/messageValidation');
const validateEmail = require('../Utils/EmailValidation');

const createEnquiry = async (req, res) => {
    try {
        const { car, name, email, phone, message } = req.body;

        if ( !name || !email || !phone || !message) {
            return res.status(400).json({
                message: 'All fields are required.'
            });
        };

        if (!validateName(name)) {
            return res.status(400).json({
                message: 'Invalid name format.'
            });
        };

        if (!validateEmail(email)) {
            return res.status(400).json({
                message: 'Invalid email format.'
            });
        };

        if (!validatePhone(phone)) {
            return res.status(400).json({
                message: 'Invalid phone number format.'
            });
        };

        if (!validateMessage(message)) {
            return res.status(400).json({
                message: 'Message must be between 10 and 1000 characters.'
            });
        };

        const newEnquiry = await Enquiry.create({
            name,
            email,
            phone,
            message
        });

        res.status(201).json({
            message: 'Enquiry sent successfully.',
            newEnquiry
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().populate('car', 'title brand price images');

        res.status(200).json({
            message: 'Enquiries fetched successfully.',
            total: enquiries.length,
            enquiries
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getSingleEnquiry = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid enquiry ID.'
            });
        };

        const enquiry = await Enquiry.findById(id).populate('car');

        if (!enquiry) {
            return res.status(404).json({
                message: 'Enquiry not found.'
            });
        };

        res.status(200).json({
            message: 'Enquiry fetched successfully.',
            enquiry
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid enquiry ID.'
            });
        };

        const allowedStatuses = ['pending', 'contacted', 'closed'];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status value.'
            });
        };

        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                message: 'Enquiry not found.'
            });
        };

        res.status(200).json({
            message: 'Status updated successfully',
            enquiry
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};


const deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid enquiry ID.'
            });
        };

        const enquiry = await Enquiry.findByIdAndDelete(id);

        if (!enquiry) { 
            return res.status(404).json({
                message: 'Enquiry not found.'
            });
        };

        res.status(200).json({
            message: 'Enquiry deleted successfully.'
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

module.exports = { createEnquiry, getAllEnquiries, getSingleEnquiry, updateEnquiryStatus, deleteEnquiry };