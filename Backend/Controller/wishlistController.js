const wishlist = require('../Model/Wishlist');
const Car = require('../Model/Car');

const mongoose = require('mongoose');

const addToWishlist = async (req, res) => {
    try {
        const { car } = req.body;

        if (!mongoose.Types.ObjectId.isValid(car)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const existingCar = await Car.findById(car);

        if (!existingCar) {
            return res.status(404).json({
                message: 'Car not found.'
            });
        };

        const alreadySaved = await wishlist.findOne({
            user: req.user.id,
            car
        });

        if (alreadySaved) {
            return res.status(409).json({
                message: 'Car already saved to your wishlist.'
            });
        };

        const wishList = await wishlist.create({
            user: req.user.id,
            car
        });

        res.status(200).json({
            message: 'Car added to wishlist successfully.',
            wishList
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getWishlist = async (req, res) => {
    try {
        const wishList = await wishlist.find({
            user: req.user.id
        }).populate('car').sort({ createdAt: -1 });

        if (!wishList) {
            return res.status(404).json({
                message: 'Not found in wishlist.'
            });
        };

        res.status(200).json({
            message: 'Wishlist fetched successfully.',
            total: wishList.length,
            wishLlist
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const removeWishlist = async (req, res) => {
    try {
        const { carId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const wishList = await wishlist.findByIdAndDelete({
            user: req.user.id,
            car: carId
        });

        if (!wishLlist) {
            return res.status(404).json({
                message: 'Car not found in your wishlist.'
            });
        };

        res.status(200).json({
            message: 'Car removed from wishlist successfully.'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};


module.exports = { addToWishlist, getWishlist, removeWishlist };