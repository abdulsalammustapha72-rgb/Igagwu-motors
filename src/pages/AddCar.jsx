import { useState } from 'react';
import Api from '../api/Axios';

import './AddCar.css';

const AddCar = () => {

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
    const [status, setStatus] = useState("Available");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
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

        images.forEach((img) => {
            formData.append('images', img)
        });

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            const response = await Api.post('/cars/add', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

        } catch (err) {
            setError('Unable to add car. Please try again.');
        };
    };

    const removeImage = (indexToRemove) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className='add-car-page'>
            <h1>Add car</h1>
            <form className='car-form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />

                <input
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Mileage"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                />

                <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                >
                    <option value="">Transmission</option>
                    <option>Automatic</option>
                    <option>Manual</option>
                </select>

                <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                >
                    <option value="">Fuel Type</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                    <option>Electric</option>
                </select>

                <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                >
                    <option value="">Condition</option>
                    <option>New</option>
                    <option>Used</option>
                </select>

                <input
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />

                <input
                    placeholder="Engine"
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                />

                <input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                        />
                        Featured
                    </label>
                </div>
                

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>Available</option>
                    <option>Reserved</option>
                    <option>Sold</option>
                </select>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(prev => [...prev, ...Array.from(e.target.files)])}
                />
              
                <div className="image-preview">
                    {images.map((image, index) => (
                        <div key={index} >
                            <img
                                src={URL.createObjectURL(image)}
                                alt={image.name}
                                width="150"
                                height="100"
                            />
                            <p>{image.name}</p>
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <button>Add Car</button>

            </form>
            <p>{error}</p>
        </div>
    );
};

export default AddCar
