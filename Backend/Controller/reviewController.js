const Car = require('../Model/Car');
const Review = require('../Model/Review');
const mongoose = require('mongoose');

const validateName = require('../Utils/nameValidation');
const validateEmail = require('../Utils/EmailValidation');
const validateMessage = require('../Utils/messageValidation');

const createReview = async (req, res) => {
    try {
        const { car, name, email, rating, comment } = req.body;

        if (!car || !name || !email || !rating || !comment) {
            return res.status(400).json({
                message: 'All fields are required.'
            });
        };
        
        if (!mongoose.Types.ObjectId.isValid(car)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
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

        if (!validateMessage(comment)) {
            return res.status(400).json({
                message: 'Comment must be between 10 and 1000 characters.'
            });
        };

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: 'Rating must be between 1 and 5.'
            });
        };

        const existingCar = await Car.findById(car);

        if (!existingCar) {
            return res.status(404).json({
                message: 'Car not found.'
            });
        };

        const review = await Review.create({
            car,
            name,
            email,
            comment,
            rating
        });

        res.status(201).json({
            message: 'Review submitted successfully, Awaiting approval.',
            review
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getCarReview = async (req, res) => {
    try {
        const { carId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const carReview = await Review.find({
            car: carId,
            approved: true
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Reviews fetched successfully',
            total: carReview.length,
            carReview
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error'
        });
    };
};

const getAllReview = async (req, res) => {
    try {

        const { page = 1, limit = 10, search, approved, sort = 'newest' } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const skip = (pageNumber - 1) * limitNumber;

        const filter = {};

        if (approved !== undefined) {
            filter.approved = approved === 'true'
        };

        if (search) {
            filter.$or = [
                    {
                        name: {
                            $regex: search,
                            $options: 'i'
                        }
                    },
                    {
                        email: {
                            $regex: search,
                            $options: 'i'
                        }
                    }
                    
            ] 
        }

        let sortOption = {};
        
        switch (sort) {
            case "oldest":
                sortOption = { createdAt: 1 };
                break;

            case "highest":
                sortOption = { rating: -1 };
                break;

            case "lowest":
                sortOption = { rating: 1 };
                break;

            default:
                sortOption = { createdAt: -1 };
        };

        const totalReviews = await Review.countDocuments(filter);

        const reviews = await Review.find(filter).populate('car', 'title brand price').sort(sortOption).limit(limitNumber).skip(skip);

        res.status(200).json({
            message: "Reviews fetched successfully.",
            currentPage: pageNumber,
            totalPages: Math.ceil(totalReviews / limitNumber),
            totalReviews,
            reviews
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error'
        });
    };
};

const approveReview = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid review ID.'
            });
        };

        const review = await Review.findById(id).populate('car', 'title brand price');

        if (!review) {
            return res.status(404).json({
                message: 'Review not found.'
            });
        };

        review.approved = !review.approved;

        await review.save();

        res.status(200).json({
            message: review.approved
                ? 'Review approved successfully'
                : 'Review approval removed successfully.',
            review
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid review ID.'
            });
        };

        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({
                message: 'Review not found.'
            });
        };

        res.status(200).json({
            message: 'Review deleted successfully.'
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

module.exports = { createReview, getCarReview, getAllReview, approveReview, deleteReview };