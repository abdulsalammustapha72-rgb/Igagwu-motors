import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../api/Axios';

import './EditCar.css';

const EditCar = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [mileage, setMileage] = useState("");
    const [transmission, setTransmission] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [condition, setCondition] = useState("");
    const [color, setColor] = useState("");
    const [engine, setEngine] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);
    const [status, setStatus] = useState("");
    const [existingImages, setExistingImages] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchCar = async () => {
        try {
            const response = await Api.get(`/cars/${id}`);

            const car = response.data.car;

            setTitle(car.title);
            setBrand(car.brand);
            setModel(car.model);
            setYear(car.year);
            setPrice(car.price);
            setMileage(car.mileage);
            setTransmission(car.transmission);
            setFuelType(car.fuelType);
            setCondition(car.condition);
            setColor(car.color);
            setEngine(car.engine);
            setLocation(car.location);
            setDescription(car.description);
            setFeatured(car.featured);
            setStatus(car.status);
            setExistingImages(car.images);

        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchCar();
    }, []);

    const handleUpdate = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("year", year);
        formData.append("price", price);
        formData.append("mileage", mileage);
        formData.append("transmission", transmission);
        formData.append("fuelType", fuelType);
        formData.append("condition", condition);
        formData.append("color", color);
        formData.append("engine", engine);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("featured", featured);
        formData.append("status", status);

        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.put(`/cars/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'multipart/form-data'
                }
            });

            setMessage('Car edited successfully.');

            setTimeout(() => {
                navigate('/dashboard/cars');
            }, 1500);

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
        };
    };

    return (
        <div className='edit-car-page'>
    
            <h1>Edit Car</h1>
    
            <form className='edit-form' onSubmit={handleUpdate}>
    
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
    
                <input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Brand"
                />
    
                <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Model"
                />
    
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year"
                />
    
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                />
    
                <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="Mileage"
                />
    
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
    
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(prev => [...prev, ...Array.from(e.target.value)])}
                />

                {existingImages.map((image) => (
                    <img
                        key={image.public_id}
                        src={image.url}
                        width={'120'}
                        alt={title}
                    />
                ))};
    
                <button type="submit">
                    Save Changes
                </button>
    
            </form>
    
            <p className='Success-message' >{message}</p>
    
            <p className='error-message'>{error}</p>
    
        </div>
    );
};

export default EditCar
