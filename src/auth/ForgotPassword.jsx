import { useState } from "react";
import Api from '../api/Axios';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await Api.post('/forgot-password', {
                email
            });

            setMessage(response.data.message);

            sessionStorage.setItem('resetEmail', email);

            setTimeout(() => {
                navigate('/reset-password');
            }, 1500);

        } catch (err) {
            setErrorMessage(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
        };
    };

    return (
        <div className="auth-page">
            
            <Helmet>
            <title>Reset Your Password | Igagwu & Sons Motor LTD</title>

            <meta
                name="description"
                content="Reset your Igagwu & Sons Motor LTD account password."
            />
            </Helmet>
    
            <div className="auth-container">
    
                <div className="auth-logo">
                    <h1>Igagwu & Sons</h1>
                    <p>Motor LTD</p>
                </div>
    
                <h2>Forgot Password?</h2>
    
                <p className="auth-subtitle">
                    Enter your email and we'll send you a reset code.
                </p>
    
    
                <form
                    className="auth-form"
                    onSubmit={handleForgotPassword}
                >
    
                    <label htmlFor="email">
                        Email
                    </label>
    
                    <input
                        id="email"
                        type="email"
                        placeholder="JohnDoe@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
    
    
                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Send Reset Code
                    </button>
    
                </form>
    
    
                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}
    
                {errorMessage && (
                    <p className="error-message">
                        {errorMessage}
                    </p>
                )}
    
    
                <div className="auth-links">
    
                    <Link to="/login">
                        Back to Login
                    </Link>
    
                </div>
    
    
                <footer className="auth-footer">
                    Copyright &copy; 2026 Igagwu & Sons Motor LTD
                </footer>
    
            </div>
    
        </div>
    );
};

export default ForgotPassword
