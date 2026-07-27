import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
      <section className='hero'>
          <div className="hero-content">
              <h1>
                  Find Your Dream Car Today.
              </h1>
              <p>
                  Welcome to Igagwu & Sons Motor LTD.
                  We provide quality, reliable and affordable vehicles for individuals, families and businesses.
              </p>
              <div className="hero-buttons">
                  <Link to={'/cars'} className="btn">
                      Browse Cars
                  </Link>

                  <Link to={'/contact'} className="btn-outline">
                      Contact Us
                  </Link>
              </div>
            </div>
    </section>
  )
}

export default Hero
