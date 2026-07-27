import { Link } from 'react-router-dom';

import './CarCard.css';

const CarCard = ({ car }) => {
  return (
      <div className="car-card">
          <img src={car.images[0]?.url} alt={car.title} />
          <div className="car-info">
              <h3>{car.title}</h3>
              <p>{car.brand}</p>
              <h2>₦{car.price.toLocaleString()}</h2>
              <Link to={`/cars/${car._id}`}>
                  View Details
              </Link>
          </div>
    </div>
  );
};

export default CarCard
