import { useEffect, useState } from 'react';
import Api from '../api/Axios';
import CarCard from '../components/CarCard';

import './Cars.css';

const Cars = () => {

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [sort, setSort] = useState('');
    const [transmission, setTransmission] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [condition, setCondition] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCars();
    }, [currentPage, transmission, fuelType, condition, search, brand, sort]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, brand, transmission, fuelType, condition, sort]);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await Api.get('/cars', {
                params: {
                    page: currentPage,
                    search,
                    brand,
                    sort,
                    transmission,
                    fuelType,
                    condition
                }
            });

            setCars(response.data.cars);

            setTotalPages(response.data.totalPages);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Unable to load available cars.');
        } finally {
            setLoading(false);
        };
    };

    const fetchBrands = async () => {
        try {
            const response = await Api.get('/cars/brands');

            setBrands(response.data.brands);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Unable to load brands.');
        };
    };
    
    return (
        <section className="cars-page">
            <h1>Available Cars</h1>
          
            <div className="filters">
                <input
                    type="text"
                    placeholder='Seach cars....'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                >
                    <option value="">All Brands</option>
                    {brands.map((item) => (
                        <option key={item} value={item} >
                            {item}
                        </option>
                    ))}
                </select>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Newest</option>
                    <option value="priceAsc">
                        Lowest Price
                    </option>
                    <option value="priceDesc">
                        Highest Price
                    </option>
                </select>
                <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                >
                    <option value="">All Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>
                <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                >
                    <option value="">All Fuel Types</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                >
                    <option value="">All Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                </select>
            </div>

            {
                loading ? (
                    <p>Loading cars....</p>
                ) : cars.length === 0 ? (
                    <p>No cars found.</p>
                ) : (
                    <div className="cars-grid">
                        {cars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                )}
          
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            <p>{error}</p>
        </section>
    );
};

export default Cars
