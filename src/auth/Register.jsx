import { useState } from "react";
import Api from '../api/Axios';
import { useNavigate, Link } from "react-router-dom";

import './Auth.css';

const Register = () => {
    const [message, setMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const strongPassword =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!strongPassword.test(password)) {
            setMessage(
                "Password must be at least 8 characters and contain one uppercase letter, one number and one special character."
            );
            return;
        };

        const fetchdata = async () => {
            try {
                const response = await Api.post('/register', {
                    name,
                    email,
                    password
                });

                setRegisterMessage(response.data.message);
                
                setTimeout(() => {
                    navigate('/verify', {
                        state: { email }
                    });
                }, 1500);

            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
            };
        };

        fetchdata();

    };

    return (
        <div className="auth-page">
    
            <div className="auth-container">
    
                <div className="auth-logo">
                    <h1>Igagwu & Sons</h1>
                    <p>Motor LTD</p>
                </div>
    
                <h2>Create Account</h2>
    
                <p className="auth-subtitle">
                    Register to get started.
                </p>
    
    
                <form
                    className="auth-form"
                    onSubmit={handleRegister}
                >
    
                    <label htmlFor="name">
                        Full Name
                    </label>
    
                    <input
                        id="name"
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
    
    
                    <label htmlFor="email">
                        Email
                    </label>
    
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="JohnDoe@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
    
    
                    <label htmlFor="password">
                        Password
                    </label>
    
                    <input
                        id="password"
                        type="password"
                        required
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
    
    
                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Register
                    </button>
    
                </form>
    
    
                {message && (
                    <p className="error-message">
                        {message}
                    </p>
                )}
    
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
    
                {registerMessage && (
                    <p className="success-message">
                        {registerMessage}
                    </p>
                )}
    
    
                <div className="auth-links">
    
                    <p>
                        Already have an account?
                    </p>
    
                    <Link to="/login">
                        Login
                    </Link>
    
                </div>
    
    
                <footer className="auth-footer">
                    Copyright &copy; 2026 Igagwu & Sons Motor LTD
                </footer>
    
            </div>
    
        </div>
    );
};

export default Register
