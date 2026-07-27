const Car = require('../Model/Car');
const slugify = require('slugify');
const mongoose = require('mongoose');
const cloudinary = require('../Config/Cloudinary');

const addCar = async (req, res) => {
    try {

        const { title, brand, price, model, year, mileage, transmission, fuelType, condition, color, engine, description, featured, status, location } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'Please upload atleast one image.'
            });
        };
 
        const uploadImages = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));
       
        let slug = slugify(title, { lower: true, strict: true });

        const exists = await Car.findOne({ slug });

        if (exists) {
            slug = `${slug}-${Date.now()}`;
        };

        const NewCar = await Car.create({
            title, slug, brand, price, model, year, mileage, transmission, fuelType, condition, color, engine, description, featured, status, location, images: uploadImages, createdBy: req.user.id
        });
        
        res.status(201).json({
            message: 'Car added successfully.',
            car: NewCar
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getAllCars = async (req, res) => {
    try {

        const {
            search,
            brand,
            fuelType,
            transmission,
            condition,
            minPrice,
            maxPrice,
            page = 1,
            limit = 12,
            sort,
            showDeleted
        } = req.query;
        
        const filter = {};

        if (showDeleted !== 'true') {
            filter.isDeleted = false
        };

        if (showDeleted === 'true') {
            filter.isDeleted = true
        };

        let sortOptions = { createdAt: -1 };

        switch (sort) {

            case "priceAsc":
                sortOptions = { price: 1 };
                break;
        
            case "priceDesc":
                sortOptions = { price: -1 };
                break;
        
            case "yearAsc":
                sortOptions = { year: 1 };
                break;
        
            case "yearDesc":
                sortOptions = { year: -1 };
                break;
        
            case "views":
                sortOptions = { views: -1 };
                break;
        
            case "featured":
                sortOptions = { featured: -1 };
                break;
        
            case "newest":
                sortOptions = { createdAt: -1 };
                break;
        
            case "oldest":
                sortOptions = { createdAt: 1 };
                break;
        
            default:
                sortOptions = { createdAt: -1 };
        }

        const skip = (page - 1) * limit;

        if (search) {
            filter.title = {
                $regex: search,
                $options: 'i'
            };
        };

        if (brand) {
            filter.brand = brand;
        };

        if (fuelType) {
            filter.fuelType = fuelType;
        };

        if (transmission) {
            filter.transmission = transmission;
        };

        if (condition) {
            filter.condition = condition;
        };

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            };

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            };
        }

        const cars = await Car.find(filter).sort(sortOptions).populate('createdBy', 'name email').skip(skip).limit(limit);

        const totalCars = await Car.countDocuments(filter);

        const totalPages = Math.ceil(totalCars / limit);

        res.status(200).json({
            message: "Cars fetched successfully.",
            currentPage: Number(page),
            totalPages,
            totalCars,
            cars
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getSingleCar = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const singleCar = await Car.findByIdAndUpdate(id,
            { $inc: { views: 1 } }, { returnDocument: 'after' }
        ).populate('createdBy', 'name email');

        if (!singleCar) {
            return res.status(404).json({
                message: 'Car not found.'
            });
        };

        res.status(200).json({
            message: 'Car fetched successfully.',
            car: singleCar
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const updateCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                message: 'Car not found.'
            });
        };

        const { title, brand, price, model, year, mileage, transmission, fuelType, condition, color, engine, description, featured, status, location } = req.body;

        if (title && title !== car.title) {
            car.slug = slugify(title, { lower: true, strict: true });
        }

        car.title = title ?? car.title;
        car.brand = brand ?? car.brand;
        car.model = model ?? car.model;
        car.year = year ?? car.year;
        car.price = price ?? car.price;
        car.mileage = mileage ?? car.mileage;
        car.transmission = transmission ?? car.transmission;
        car.fuelType = fuelType ?? car.fuelType;
        car.condition = condition ?? car.condition;
        car.color = color ?? car.color;
        car.engine = engine ?? car.engine;
        car.description = description ?? car.description;
        car.featured = featured ?? car.featured;
        car.status = status ?? car.status;
        car.location = location ?? car.location;

        if (req.files && req.files.length > 0) {
            for (const image of car.images) {
                if (image.public_id) {
                    await cloudinary.uploader.destroy(image.public_id);
                };
            };

            car.images = req.files.map(file => ({
                url: file.path,
                public_id: file.filename
            }));
        };


        await car.save();

        res.status(200).json({
            message: 'Car updated successfully.',
            car
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                message: 'Car not found.'
            });
        };

        for (const image of car.images) {
            await cloudinary.uploader.destroy(image.public_id);
        };

        await car.deleteOne();

        res.status(200).json({
            message: 'Car deleted successfully.'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getPopularCars = async (req, res) => {
    try {
        const cars = await Car.find().sort({ views: -1 }).limit(8);

        res.status(200).json({
            message: 'Popular cars fetched successfully.',
            cars
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const toggleFeaturedCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                message: 'Car not found.'
            });
        };

        car.featured = !car.featured;

        await car.save();

        res.status(200).json({
            message: car.featured 
                ? 'Car featured successfully.'
                : 'Car removed from featured.',
            car
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getFeaturedCars = async (req, res) => {
    try {
        const featuredCars = await Car.find({
            featured: true,
            status: 'Available',
            isDeleted: false
        }).sort({ createdAt: -1 }).limit(8);

        res.status(200).json({
            message: 'Featured cars fetched successfully.',
            featuredCars
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const softDeleteCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                message: 'Car not found.'
            });
        };

        if (car.isDeleted) {
            return res.status(400).json({
                message: 'Car has already been deleted.'
            });
        };

        car.isDeleted = true;

        await car.save();

        res.status(200).json({
            message: 'Car successfully deleted.'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const restoreCar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid car ID.'
            });
        };

        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({
                message: 'Car not found.'
            });
        };

        if (!car.isDeleted) {
            return res.status(400).json({
                message: 'Car is already active.'
            });
        };

        car.isDeleted = false;

        await car.save();

        res.status(200).json({
            message: 'Car restored successfully.'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const latestCars = async (req, res) => {
    try {
        const latestCar = await Car.find({
            isDeleted: false,
            status: 'Available'
        }).sort({ createdAt: -1 }).limit(8);

        res.status(200).json({
            message: 'Latest cars fetched successfully',
            total: latestCar.length,
            latestCar
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

const getBrands = async (req, res) => {
    try {
        const brands = await Car.distinct('brand', {
            isDeleted: false
        });

        res.status(200).json({
            message: 'Brands fetched successfully.',
            brands
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

module.exports = {
    addCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
    toggleFeaturedCar,
    getPopularCars,
    getFeaturedCars,
    softDeleteCar,
    restoreCar,
    latestCars,
    getBrands
};