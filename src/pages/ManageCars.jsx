import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../api/Axios';

import './ManageCars.css';

const ManageCars = () => {

    const [cars, setCars] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCars = async () => {
        try {

            setLoading(true);

            const response = await Api.get('/cars', {
                params: {
                    showDeleted
                }
            });

            setCars(response.data.cars);

        } catch (err) {
            setError('Something went wrong, Please try again.');
        } finally {
            setLoading(false);
        };
    };

    const handleSoftDelete = async (id) => {

        const confirmDelete = window.confirm('Are you sure you want to move this car to the deleted cars?');

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.patch(`/cars/${id}/delete`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            alert(response.data.message);

            fetchCars();

        } catch (err) {
            alert('Something went wrong, Please try again.');
        };
    };

    const handleRestore = async (id) => {

        const confirmRestore = window.confirm('Are you sure you want to restore this car?');

        if (!confirmRestore) return;

        try {

            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.patch(`/cars/${id}/restore`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            alert(response.data.message);

            fetchCars();

        } catch (err) {

            alert('Something went wrong, Please try again.');

        };
    };


    useEffect(() => {
        fetchCars();
    }, [showDeleted]);


    if (loading) {
        return (
            <p className="car-loading">Loading....</p>
        );
    };
    
    const displayedCars = cars;

    return (
        <main className="manage-cars">

            <section className="manage-cars-header">

                <div>
                    <h1>Manage Cars</h1>

                    <p>
                        {showDeleted
                            ? 'Manage your deleted cars'
                            : 'Manage your available cars'
                        }
                    </p>
                </div>

                <div className="car-actions">

                    <Link
                        to="/dashboard/add-car"
                        className="add-car-btn"
                    >
                        Add Car
                    </Link>

                    <button
                        type="button"
                        onClick={() => setShowDeleted(!showDeleted)}
                    >
                        {showDeleted
                            ? 'View Active Cars'
                            : 'View Deleted Cars'
                        }
                    </button>
                </div>
            </section>

            <p className="manage-cars-error">
                {error}
            </p>


            {displayedCars.length === 0 ? (

                <div className="empty-cars">
                    <h2>
                        {showDeleted
                            ? 'No deleted cars'
                            : 'No active cars'
                        }
                    </h2>

                    <p>
                        {showDeleted
                            ? 'There are no cars in the deleted section.'
                            : 'You have not added any cars yet.'
                        }
                    </p>
                </div>

            ) : (

                <div className="cars-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Featured</th>
                                <th>Views</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {displayedCars.map((car) => (
                                <tr key={car._id}>
                                    <td>
                                        <img
                                            src={car.images?.[0]?.url}
                                            alt={car.title}
                                            width="80"
                                        />
                                    </td>

                                    <td>
                                        {car.title}
                                    </td>


                                    <td>
                                        ₦{car.price?.toLocaleString()}
                                    </td>

                                    <td>
                                        {car.status}
                                    </td>

                                    <td>
                                        {car.featured
                                            ? '⭐ Yes'
                                            : 'No'
                                        }
                                    </td>

                                    <td>
                                        {car.views}
                                    </td>

                                    <td>
                                        {showDeleted ? (

                                            <button
                                                type="button"
                                                onClick={() => handleRestore(car._id)}
                                                className='restore-car-btn'
                                            >
                                                Restore
                                            </button>

                                        ) : (

                                            <>

                                                <Link
                                                    to={`/dashboard/edit-car/${car._id}`}
                                                >
                                                    <button className='edit-car-btn'>
                                                        Edit
                                                    </button>
                                                </Link>


                                                <button
                                                    type="button"
                                                    className='delete-car-btn'
                                                    onClick={() => handleSoftDelete(car._id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </main>
    );
};

export default ManageCars;