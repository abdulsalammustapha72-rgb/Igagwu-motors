import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedCars from '../components/FeaturedCars';
import LatestCars from '../components/LatestCars';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>
                    Quality Cars for Sale in Lagos | Igagwu Motors
                </title>

                <meta
                    name="description"
                    content="Shop quality cars for sale in Lagos at Igagwu Motors. Browse Toyota, Lexus, Mercedes, Honda and other vehicles."
                />

                <meta
                    property="og:title"
                    content="Quality Cars for Sale in Lagos | Igagwu Motors"
                />

                <meta
                    property="og:description"
                    content="Browse quality vehicles for sale in Lagos at Igagwu Motors."
                />

                <meta
                    property="og:type"
                    content="website"
                />
            </Helmet>

            <Navbar />
            <Hero />
            <FeaturedCars />
            <LatestCars />
        </>
    );
};

export default Home;