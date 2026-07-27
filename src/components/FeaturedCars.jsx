import { useEffect, useState } from 'react';
import Api from '../api/Axios';
import CarCard from './CarCard';

import './FeaturedCars.css';

const FeaturedCars = () => {

    const [featuredCars, setFeaturedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFeaturedCars();
    }, []);

    const fetchFeaturedCars = async () => {
        try {
            const response = await Api.get('/cars/featured');

            setFeaturedCars(response.data.featuredCars);

        } catch (err) {
            setError('Unable to load featured cars.');
        } finally {
            setLoading(false);
        };
    };

  return (
      <section className="featured">
          <h2>Featured Cars</h2>
          {loading ? (
              <p className='feature-loading'>Loading...</p>
          ) : (
                  <div className="featured-grid">
                      {featuredCars.map((car) => (
                          <CarCard key={car._id} car={car} /> 
                      ))}
                  </div>
          )}
          <p>{error}</p>
    </section>
  )
}

export default FeaturedCars
