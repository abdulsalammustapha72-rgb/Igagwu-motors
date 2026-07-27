const Car = require('../Model/Car');
const Review = require('../Model/Review');
const Enquiry = require('../Model/Enquiry');

const dashboardStats = async (req, res) => {
    try {
        const totalCars = await Car.countDocuments();

        const availableCars = await Car.countDocuments({ status: 'Available' });

        const reservedCars = await Car.countDocuments({ status: 'Reserved' });

        const soldCars = await Car.countDocuments({ sold: true });

        const featuredCars = await Car.countDocuments({ featured: true });

        const newCars = await Car.countDocuments({ condition: 'New' });

        const pendingReviews = await Review.countDocuments({ approved: false });

        const totalEnquiries = await Enquiry.countDocuments();

        const views = await Car.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: '$views' }
                }
            }
        ]);

        const totalViews = views.length > 0 ? views[0].totalViews : 0;

        const recentCars = await Car.find().sort({ createdAt: -1 }).limit(5)

        res.status(200).json({

            totalCars,

            availableCars,

            reservedCars,

            soldCars,

            featuredCars,

            newCars,

            totalViews,

            pendingReviews,

            totalEnquiries,

            recentCars

});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error.'
        });
    };
};

module.exports = dashboardStats;