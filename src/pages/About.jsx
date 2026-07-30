import Navbar from '../components/Navbar';
import { Helmet } from 'react-helmet-async';
import './About.css';

const About = () => {
    return (
        <>
            <Helmet>
                <title>
                    About Igagwu & Sons Motor LTD | Igagwu Motors
                </title>

                <meta
                    name="description"
                    content="Learn more about Igagwu & Sons Motor LTD, our mission, our values, and our commitment to quality vehicles and trusted customer service."
                />

                <meta
                    property="og:title"
                    content="About Igagwu & Sons Motor LTD | Igagwu Motors"
                />

                <meta
                    property="og:description"
                    content="Learn more about Igagwu & Sons Motor LTD and our commitment to quality vehicles, transparency, and customer service."
                />

                <meta
                    property="og:type"
                    content="website"
                />
            </Helmet>
            
            <Navbar />

            <main className="about-page">
                <section className="about-hero">
                    <div className="about-hero-content">
                        <p className="about-subtitle">ABOUT IGAGWU & SONS</p>

                        <h1>
                            Driving Trust.
                            <br />
                            Delivering Excellence.
                        </h1>

                        <p>
                            At Igagwu & Sons Motor LTD, we are committed to
                            providing quality vehicles and a trusted car-buying
                            experience for every customer.
                        </p>
                    </div>
                </section>

                <section className="about-intro">
                    <div className="about-intro-image">
                        <img
                            src="/images/about-car.jpg"
                            alt="Igagwu and Sons Motors"
                        />
                    </div>

                    <div className="about-intro-content">
                        <p className="section-label">WHO WE ARE</p>

                        <h2>
                            Your Trusted Partner
                            <br />
                            on the Road
                        </h2>

                        <p>
                            Igagwu & Sons Motor LTD is dedicated to helping
                            individuals and families find the right vehicle
                            for their needs.
                        </p>

                        <p>
                            We believe that buying a car should be simple,
                            transparent, and stress-free. That's why we
                            carefully select our vehicles and put our
                            customers first.
                        </p>

                        <p>
                            Whether you're looking for a reliable daily
                            driver, a family vehicle, or something special,
                            our goal is to help you drive away with
                            confidence.
                        </p>
                    </div>

                </section>

                <section className="mission-vision">

                    <div className="mission-card">
                        <span>01</span>

                        <h2>Our Mission</h2>

                        <p>
                            To provide customers with quality vehicles,
                            excellent service, and a seamless buying
                            experience built on trust and transparency.
                        </p>
                    </div>


                    <div className="vision-card">
                        <span>02</span>

                        <h2>Our Vision</h2>

                        <p>
                            To become a trusted and respected name in the
                            automotive industry, known for quality,
                            integrity, and exceptional customer service.
                        </p>
                    </div>

                </section>

                <section className="why-us">

                    <div className="why-us-heading">
                        <p className="section-label">WHY CHOOSE US</p>

                        <h2>
                            More Than Just
                            <br />
                            Selling Cars
                        </h2>
                    </div>

                    <div className="why-us-grid">
                        <div className="why-card">
                            <span>01</span>
                            <h3>Quality Vehicles</h3>
                            <p>
                                We carefully select our vehicles to provide
                                customers with quality and reliable options.
                            </p>
                        </div>

                        <div className="why-card">
                            <span>02</span>
                            <h3>Trusted Service</h3>
                            <p>
                                We believe in honest communication and
                                treating every customer with respect.
                            </p>
                        </div>

                        <div className="why-card">
                            <span>03</span>
                            <h3>Transparent Pricing</h3>
                            <p>
                                We aim to make the buying process clear and
                                straightforward, without unnecessary surprises.
                            </p>
                        </div>

                        <div className="why-card">
                            <span>04</span>
                            <h3>Customer First</h3>
                            <p>
                                Your satisfaction is important to us. We are
                                here to help you find a vehicle that suits you.
                            </p>
                        </div>

                    </div>

                </section>

                <section className="about-cta">

                    <div>
                        <p className="section-label">READY TO FIND YOUR CAR?</p>

                        <h2>
                            Let's Get You
                            <br />
                            Behind the Wheel.
                        </h2>
                    </div>

                    <div className="about-cta-buttons">
                        <a href="/cars">
                            Browse Cars
                        </a>

                        <a href="/contact">
                            Contact Us
                        </a>
                    </div>

                </section>

            </main>
        </>
    );
};

export default About;