import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Dashboard.css';

const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        navigate('/');
    };

    return (
        <>
            <Helmet>
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Helmet>
            
                <div className="dashboard-layout">

                    <aside className="dashboard-sidebar">

                        <div className="sidebar-logo">
                            <h2>Igagwu & Sons</h2>
                            <span>Motor LTD</span>
                        </div>

                        <nav className="dashboard-nav">

                            <Link to="/dashboard">
                                Dashboard
                            </Link>

                            <Link to="/dashboard/cars">
                                Cars
                            </Link>

                            <Link to="/dashboard/add-car">
                                Add Car
                            </Link>

                            <Link to="/dashboard/reviews">
                                Reviews
                            </Link>

                            <Link to="/dashboard/enquiries">
                                Enquiries
                            </Link>

                        </nav>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </aside>

                    <main className="dashboard-main">

                        <Outlet />

                    </main>

                    </div>
        </>
    );
};

export default Dashboard;