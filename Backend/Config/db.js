const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('MongoDB is Connected.');

    } catch (err) {
        process.exit(1);
        
        console.log(err);
    }
};

module.exports = ConnectDB;