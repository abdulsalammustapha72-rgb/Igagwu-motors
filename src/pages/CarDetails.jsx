import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Api from '../api/Axios';

import './CarDetails.css';

const CarDetails = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [reviews, setReviews] = useState([]);
    const [reviewMessage, setReviewMessage] = useState('');
    const [reviewError, setReviewError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [enquiryName, setEnquiryName] = useState('');
    const [enquiryEmail, setEnquiryEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [enquiryMessage, setEnquiryMessage] = useState('');
    const [enquirySuccess, setEnquirySuccess] = useState('');
    const [enquiryError, setEnquiryError] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const fetchCar = async () => {
        try {
            const response = await Api.get(`/cars/${id}`);

            setCar(response.data.car);

            setSelectedImage(response.data.car.images[0]?.url);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
        } finally {
            setLoading(false);
        };
    };

    const fetchReviews = async () => {
        try {
            const response = await Api.get(`/reviews/car/${id}`);

            setReviews(response.data.carReview);

        } catch (err) {
            setReviewError(err.response?.data?.message || err.message || 'Unable to load reviews, Please try again.');
        };
    };

    const submitReview = async (e) => {

        e.preventDefault();

        try {
            const response = await Api.post('/reviews', {
                car: id,
                name,
                email,
                rating,
                comment
            });

            setReviewMessage(response.data.message);

            fetchReviews();

            setReviewError('');

            setName('');
            setEmail('');
            setRating(5);
            setComment('');

        } catch (err) {
            setReviewError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
        };
    };

    const submitEnquiry = async (e) => {

        e.preventDefault();

        try {
            const response = await Api.post('/enquiries', {
                car: id,
                name: enquiryName,
                email: enquiryEmail,
                phone,
                message: enquiryMessage
            });

            setEnquirySuccess(response.data.message);

            setEnquiryError('');

            setEnquiryName('');
            setEnquiryEmail('');
            setPhone('');
            setEnquiryMessage('');

        } catch (err) {
            setEnquiryError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
        };
    };

    useEffect(() => {
        fetchCar();
        fetchReviews();
    }, []);

    if (loading) {
        return <p className='car-details-loading'>Loading...</p>
    };

    if (!car) {
        return <p className='car-details-error'>{error}</p>
    };

    return (
        <>
            <Helmet>
            <title>
                {`${car.year} ${car.brand} ${car.model} for Sale | Igagwu Motors`}
            </title>

            <meta
                name="description"
                content={`${car.year} ${car.brand} ${car.model} for sale at Igagwu Motors. View the price, mileage, condition, transmission, fuel type, and other vehicle details.`}
            />

            <meta
                property="og:title"
                content={`${car.year} ${car.brand} ${car.model} | Igagwu Motors`}
            />

            <meta
                property="og:description"
                content={`View details, price, and specifications for this ${car.year} ${car.brand} ${car.model}.`}
            />

            <meta
                property="og:image"
                content={car.images?.[0]?.url}
            />

            <meta
                property="og:type"
                content="website"
            />

            <meta
                property="og:url"
                content={`https://igagwu-motors-1.onrender.com/cars/${car._id}`}
            />

            <link
                rel="canonical"
                href={`https://igagwu-motors-1.onrender.com/cars/${car._id}`}
            />
            </Helmet>
            
        <section className="car-details">
            <div className="car-images">
                <img src={selectedImage} alt={car.title} className='main-image' />
                <div className="thumbnail-container">
                    {car.images.map((image) => (
                        <img
                            key={image.public_id}
                            src={image.url}
                            alt={car.title}
                            className='thumbnail'
                            onClick={() => setSelectedImage(image.url)} />
                    ))}
                </div>
            </div>
            <div className="car-info">
                <h1>{car.title}</h1>
                <h2>₦{car.price.toLocaleString()}</h2>
                <p>{car.description}</p>

                <div className="specs">
                    <p><strong>Brand:</strong> {car.brand}</p>
                    <p><strong>Model:</strong> {car.model}</p>
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>Mileage:</strong> {car.mileage.toLocaleString()} km</p>
                    <p><strong>Transmission:</strong> {car.transmission}</p>
                    <p><strong>Fuel:</strong> {car.fuelType}</p>
                    <p><strong>Condition:</strong> {car.condition}</p>
                    <p><strong>Engine:</strong> {car.engine}</p>
                    <p><strong>Color:</strong> {car.color}</p>
                    <p><strong>Status:</strong> {car.status}</p>
                    <p><strong>Location:</strong> {car.location}</p>
                </div>
            </div>
            <div className="reviews">
                <h2>Customer Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review._id} className="review-card"
                        >
                            <h4>{review.name}</h4>
                            <p>⭐{review.rating}/5</p>
                            <p>{review.comment}</p>
                        </div>
                    )))}
            </div>
            <div className="review-form">
                <h2>Leave a Review</h2>
                <form onSubmit={submitReview}>
                    <input
                        type="text"
                        placeholder='Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder='Your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    <textarea
                        placeholder='Write your review...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type='submit'>
                        Submit Review
                    </button>
                </form>
                <p>{reviewMessage}</p>
                <p>{reviewError}</p>
                <div className="enquiry-form">
                    <h2>Interested in the car?</h2>

                    <form onSubmit={submitEnquiry}>
                        <input
                            type="text"
                            placeholder='Full Name'
                            value={enquiryName}
                            onChange={(e) => setEnquiryName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder='Email'
                            value={enquiryEmail}
                            onChange={(e) => setEnquiryEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Phone Number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <textarea
                            placeholder='Tell us what you would like to know...'
                            value={enquiryMessage}
                            onChange={(e) => setEnquiryMessage(e.target.value)}
                        />
                        <button type='submit'>
                            Send Enquiry
                        </button>
                        <p>{enquirySuccess}</p>
                        <p>{enquiryError}</p>
                        <button
                            className='Back-to-home'
                            onClick={() => navigate('/')}
                        >
                            Back to home
                        </button>
                    </form>
                </div>
            </div>
            </section>
        </>    
    );
};

export default CarDetails
