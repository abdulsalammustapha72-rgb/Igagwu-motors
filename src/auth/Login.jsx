import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from '../api/Axios';

import './Auth.css';

const Login = () => {
    const [message, setMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const fetchData = async () => {
            try {
                const response = await Api.post('/login', {
                    email,
                    password,
                    rememberMe
                });

                const { accessToken, user } = response.data;

                if (user.role !== 'Admin') {
                    setError('Unauthorized. Admin access required.');

                    return;
                };

                setRegisterMessage(response.data.message);

                if (rememberMe) {
                    localStorage.setItem('token', response.data.accessToken);
                } else {
                    sessionStorage.setItem('token', response.data.accessToken);
                }; 

                setMessage('Login successful. Redirecting...');

                setTimeout(() => {
                    navigate('/Dashboard');
                }, 1500);

            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
            };
        };

        fetchData();

    };

    return (
        <div className="auth-page">
    
            <div className="auth-container">
    
                <div className="auth-logo">
                    <h1>Igagwu & Sons</h1>
                    <p>Motor LTD</p>
                </div>
    
                <h2>Welcome Back</h2>
    
                <p className="auth-subtitle">
                    Login to continue to your account.
                </p>
    
                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >
    
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
    
    
                    <label className="remember-container">
    
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
    
                        Remember me
    
                    </label>
    
    
                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Login
                    </button>
    
                </form>
    
    
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
                        <Link to="/register">
                            Don't have an account? Register
                        </Link>
                    </p>
    
                    <p>
                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>
                    </p>
    
                </div>
    
    
                <footer className="auth-footer">
                    Copyright &copy; 2026 Igagwu & Sons Motor LTD
                </footer>
    
            </div>
    
        </div>
    );
}

export default Login
