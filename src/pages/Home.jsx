import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedCars from '../components/FeaturedCars';
import LatestCars from '../components/LatestCars';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <FeaturedCars />
            <LatestCars />
        </>
    );
};

export default Home
