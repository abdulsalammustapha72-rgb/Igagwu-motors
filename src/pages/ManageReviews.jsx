import { useState, useEffect } from 'react';
import Api from '../api/Axios';

import './ManageReviews.css';

const ManageReviews = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.get('/reviews', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setReviews(response.data.reviews);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Unable to load reviews, Please try again.');
        } finally {
            setLoading(false);
        };
    };

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.patch(
                `/reviews/${id}/approve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            setReviews((prevReviews) => prevReviews.map((review) => review._id === id ? response.data.review : review));

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
        };
    };


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm('Are you sure you want to delete this review?');

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            await Api.delete(`/reviews/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
        };
    };


    useEffect(() => {
        fetchReviews();
    }, []);


    if (loading) {
        return (
            <p className="review-loading">
                Loading...
            </p>
        );
    };


    return (
        <main className="manage-reviews">

            <h1>
                Manage Reviews
            </h1>

            {error && (
                <p className="manage-reviews-error">
                    {error}
                </p>
            )}

            {reviews.length === 0 ? (

                <div className="empty-reviews">

                    <h2>
                        No Reviews Found
                    </h2>

                    <p>
                        There are no customer reviews yet.
                    </p>

                </div>

            ) : (

                <section className="reviews-table-container">
                    <table className="reviews-table">
                        <thead>

                            <tr>
                                <th>Car</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>
                            {reviews.map((review) => (

                                <tr key={review._id}>
                                    <td>
                                        {review.car?.title}
                                    </td>

                                    <td>
                                        {review.name}
                                    </td>

                                    <td>
                                        {review.email}
                                    </td>

                                    <td>
                                        <span className="review-rating">
                                            {review.rating} ⭐
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={`review-status ${review.approved ? 'approved' : 'pending'}`}
                                        >
                                            {review.approved
                                                ? 'Approved'
                                                : 'Pending'
                                            }
                                        </span>
                                    </td>

                                    <td>

                                        <section className="review-actions">

                                            <button
                                                type="button"
                                                className={review.approved ? 'unapprove-review-btn' : 'approve-review-btn'}
                                                onClick={() =>handleApprove(review._id)}
                                            >
                                                {review.approved ? 'Unapprove' : 'Approve'}
                                            </button>

                                            <button
                                                type="button"
                                                className="delete-review-btn"
                                                onClick={() => handleDelete(review._id)}
                                            >
                                                Delete
                                            </button>
                                        </section>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </main>
    );
};

export default ManageReviews;