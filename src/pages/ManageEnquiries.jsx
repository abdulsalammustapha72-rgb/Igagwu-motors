import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../api/Axios';

import './ManageEnquiries.css';

const ManageEnquiries = () => {

    const navigate = useNavigate();

    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchEnquiries = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.get('/enquiries', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEnquiries(response.data.enquiries);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Unable to load enquiries, Please try again.');
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    if (loading) {
        return (
            <div className="enquiries-page">
                <div className="enquiries-loading">
                    Loading enquiries...
                </div>
            </div>
        );
    };

    return (
        <main className="enquiries-page">

            <div className="enquiries-header">
                <div>
                    <h1>Manage Enquiries</h1>
                    <p>
                        View and manage customer enquiries about your vehicles.
                    </p>
                </div>

                <div className="enquiry-count">
                    <span>{enquiries.length}</span>
                    <small>Total Enquiries</small>
                </div>
            </div>

            {error && (
                <div className="enquiry-error">
                    {error}
                </div>
            )}

            {enquiries.length === 0 ? (

                <div className="empty-enquiries">
                    <h2>No Enquiries Found</h2>
                    <p>
                        You don't have any customer enquiries yet.
                    </p>
                </div>

            ) : (
                <section className="enquiries-table-container">
                    <table className="enquiries-table">
                        <thead>
                            <tr>
                                <th>Vehicle</th>
                                <th>Customer</th>
                                <th>Contact</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {enquiries.map((enquiry) => (
                                <tr key={enquiry._id}>
                                    <td>
                                        <div className="vehicle-info">

                                            {enquiry.car?.images?.[0]?.url && (
                                                <img
                                                    src={enquiry.car.images[0].url}
                                                    alt={enquiry.car.title}
                                                />
                                            )}

                                            <div>
                                                <strong>
                                                    {enquiry.car?.title || "Unknown Car"}
                                                </strong>

                                                <span>
                                                    {enquiry.car?.brand || ""}
                                                </span>
                                            </div>

                                        </div>
                                    </td>

                                    <td>
                                        <div className="customer-info">
                                            <strong>
                                                {enquiry.name}
                                            </strong>

                                            <span>
                                                {enquiry.email}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        {enquiry.phone}
                                    </td>

                                    <td>
                                        <p className="enquiry-message">
                                            {enquiry.message}
                                        </p>
                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${enquiry.status}`}
                                        >
                                            {enquiry.status}
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="view-enquiry-btn"
                                            onClick={() => navigate(`/dashboard/enquiries/${enquiry._id}`)}
                                        >
                                            View
                                        </button>
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

export default ManageEnquiries;