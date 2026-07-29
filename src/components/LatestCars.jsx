import { useEffect, useState } from 'react';
import Api from '../api/Axios';
import CarCard from './CarCard';

import './LatestCars.css';

const LatestCars = () => {

    const [latestCars, setLatestCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLatestCars();
    }, []);

    const fetchLatestCars = async () => {
        try {
            const response = await Api.get('/cars/latestcars');

            setLatestCars(response.data.latestCar);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Unable to load latest cars.');
        } finally {
            setLoading(false);
        };
    };

  return (
      <section className="latest">
          <h2>Latest Arrivals</h2>
          {
              loading ? (
                  <p className='latest-loading'>Loading...</p>
              ) : (
                      <div className="latest-grid">
                          {latestCars.map((car) => (
                              <CarCard key={car._id} car={car} />
                          ))}
                      </div>
              )}
          <p>{error}</p>
    </section>
  );
};

export default LatestCars;
