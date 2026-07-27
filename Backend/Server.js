require('dotenv').config();

const express = require("express");

const cors = require('cors');

const cookieparser = require('cookie-parser');

const helmet = require('helmet');

const compression = require('compression');

const morgan = require('morgan');

const path = require('path');

const app = express();

app.use(express.json());

app.use(cookieparser());

app.use(helmet());

app.use(compression());

app.use(morgan('dev'));

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));

const ConnectDB = require('./Config/db');

app.use('/upload', express.static(path.join(__dirname, 'Uploads')))

const authRoute = require('./Route/authRoute');

const carRoute = require('./Route/carRoute');

const enquiryRoute = require('./Route/enquiryRoute');

const reviewRoute = require('./Route/reviewRoute');

const wishlistRoute = require('./Route/wishlistRoute');

const dashboardRoute = require('./Route/dashboardRoute');

app.use('/api/enquiries', enquiryRoute);

app.use('/api/reviews', reviewRoute);

app.use('/api/dashboard', dashboardRoute);

// FUTURE FEATURE
app.use('/api/wishlist', wishlistRoute);

app.use('/api/cars', carRoute);

app.use('/api', authRoute);

ConnectDB();

app.listen(5000, () => {
    console.log('Server is running on PORT 5000')
});