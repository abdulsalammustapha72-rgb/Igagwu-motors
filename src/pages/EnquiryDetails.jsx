import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../api/Axios';

import './EnquiryDetails.css';

const EnquiryDetails = () => {

    const { id } = useParams();
    
    const navigate = useNavigate();

    const [enquiry, setEnquiry] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const getEnquiry = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.get(`/enquiries/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEnquiry(response.data.enquiry);

            setStatus(response.data.enquiry.status);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Unable to load enquiries, Please try again.');
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        getEnquiry();
    }, [id]);

    const handleStatusChange = async (e) => {

        const newStatus = e.target.value;

        try {

            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.patch(`/enquiries/${id}/status`,
                {
                    status: newStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            setStatus(response.data.status);

            setEnquiry(prev => ({
                ...prev, status: response.data.enquiry.status
            }));

            setMessage(response.data.message);

            setError('');

        } catch (err) {
        };
        setError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.' );
    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this enquiry?');

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            await Api.delete(`/enquiries/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate('/dashboard/enquiries');
        } catch (err) {
            setError(err.response?.data?.message || err.message ||'Something went wrong, Please try again.');
        };
    };

    if (loading) {
        return <p className='enquiry-loading'>Loading enquiry...</p>
    };

    if (error && !enquiry) {
        return (
            <div>
                <p className='enquiry-error'>{error}</p>
                
                <button
                    onClick={() => navigate('/dashboard/enquiries')}
                    className='error-button'
                >
                    Back to Enquiries.
                </button>
            </div>
        );
    };

    return (
        <section className="enquiry-details-page">
    
            <button
                className="back-enquiries-btn"
                onClick={() => navigate('/dashboard/enquiries')}
            >
                ← Back to Enquiries
            </button>
    
            <div className="enquiry-details-header">
                <div>
                    <h1>Enquiry Details</h1>
                    <p>View and manage this customer enquiry.</p>
                </div>
    
                <span className={`details-status ${status}`}>
                    {status}
                </span>
            </div>
    
            <article className="enquiry-details-grid">
    
                <div className="details-card car-details-card">
    
                    <h2>Car Information</h2>
    
                    {enquiry.car?.images?.[0]?.url && (
                        <img
                            className="enquiry-car-image"
                            src={enquiry.car.images[0].url}
                            alt={enquiry.car.title}
                        />
                    )}
    
                    <h3>
                        {enquiry.car?.title || 'Unknown Car'}
                    </h3>
    
                    <p>
                        <strong>Brand:</strong>{' '}
                        {enquiry.car?.brand || 'N/A'}
                    </p>
    
                    <p>
                        <strong>Price:</strong>{' '}
                        ₦{enquiry.car?.price?.toLocaleString() || 'N/A'}
                    </p>
    
                </div>
    
                <div className="details-card">
    
                    <h2>Customer Information</h2>
    
                    <div className="customer-detail">
                        <span>Name</span>
                        <strong>{enquiry.name}</strong>
                    </div>
    
                    <div className="customer-detail">
                        <span>Email</span>
                        <strong>{enquiry.email}</strong>
                    </div>
    
                    <div className="customer-detail">
                        <span>Phone</span>
                        <strong>{enquiry.phone}</strong>
                    </div>
    
                </div>
    
                <div className="details-card message-card">
    
                    <h2>Customer Message</h2>
    
                    <div className="message-box">
                        {enquiry.message}
                    </div>
    
                </div>
    
                <div className="details-card status-card">
    
                    <h2>Manage Enquiry</h2>
    
                    <label>
                        Update Status
                    </label>
    
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="status-select"
                    >
                        <option value="pending">
                            Pending
                        </option>
    
                        <option value="contacted">
                            Contacted
                        </option>
    
                        <option value="closed">
                            Closed
                        </option>
                    </select>
    
                    <button
                        type="button"
                        className="delete-enquiry-btn"
                        onClick={handleDelete}
                    >
                        Delete Enquiry
                    </button>
    
                </div>
    
            </article>

            {message && (
                <div className="success-message">
                    {message}
                </div>
                )}
        
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
    
        </section>
        
    );
};

export default EnquiryDetails
