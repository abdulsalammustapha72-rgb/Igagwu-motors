import { useState, useEffect } from "react";
import Api from '../api/Axios';

import './DashboardHome.css';

const DashboardHome = () => {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchDashboard = async () => {
        try {
            const response = await Api.get('/dashboard');

            setStats(response.data);

        } catch (err) {
            setError('Unable to load dashboard, Please try again.');
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return <p className="dashboard-loading">Loading dashboard...</p> 
    };

    return (
        <div>
            <h1>Dashboard Overview</h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Total Cars</h3>
                    <h2>{stats?.totalCars}</h2>
                </div>
                <div className="card">
                    <h3>Featured Cars</h3>
                    <h2>{stats?.featuredCars}</h2>
                </div>
                <div className="card">
                    <h3>Total Enquiries</h3>
                    <h2>{stats?.totalEnquiries}</h2>
                </div>
                <div className="card">
                    <h3>Pending Reviews</h3>
                    <h2>{stats?.pendingReviews}</h2>
                </div>
                <div className="card">
                    <h3>Total Views</h3>
                    <h2>{stats?.totalViews}</h2>
                </div>
            </div>
            <p>{error}</p>
        </div>
    );
};

export default DashboardHome
