import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Api from "../api/Axios";

import './Auth.css';

const Verify = () => {
    const location = useLocation();

    const email = location.state?.email;

    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [resendCodeMessage, setResendCodeMessage] = useState('');
    const [resendCodeError, setResendCodeError] = useState('');
    const [countDown, setCountDown] = useState(0);
    const [isResending, setIsResending] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let timer;

        if (countDown > 0) {
            timer = setInterval(() => {
                setCountDown(prev => prev - 1)
            }, 1000);
        };

        return () => clearInterval(timer);

    }, [countDown]);

    const handleVerify = async () => {
        e.preventDefault();

        try {
            const response = await Api.post("/verify", {
                email,
                code
            });

                localStorage.setItem("token", response.data.token);

                setTimeout(() => {
                    setMessage(response.data.message);

                    navigate('/login');
                }, 1500);

        } catch(err) {
                setError(err.response?.data?.message || err.message || 'Verification failed');
        };
    };

    const handleResend = async () => {

        if (countDown > 0) return;

        try {
            setIsResending(true);

            const response = await Api.post('/resend-code', {
                email
            });

            setResendCodeMessage(response.data.message);

            setCountDown(60);

        } catch (err) {
            setResendCodeError(err.response?.data?.message || err.message);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="auth-page">
    
            <div className="auth-container">
    
                <div className="auth-logo">
                    <h1>Igagwu & Sons</h1>
                    <p>Motor LTD</p>
                </div>
    
                <h2>Email Verification</h2>
    
                <p className="auth-subtitle">
                    Enter the verification code sent to:
                </p>
    
                <p style={{ textAlign: 'center' }}>
                    <strong>{email}</strong>
                </p>
    
    
                <form
                    className="auth-form"
                    onSubmit={handleVerify}
                >
    
                    <label>
                        Verification Code
                    </label>
    
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
    
    
                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Verify Email
                    </button>
    
                </form>
    
    
                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}
    
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
    
    
                <div className="auth-links">
    
                    <Link to="/register">
                        Back to Register
                    </Link>
    
                </div>
    
    
                <button
                    className="resend-btn"
                    onClick={handleResend}
                    disabled={countDown > 0 || isResending}
                >
                    {countDown > 0
                        ? `Resend code in ${countDown}s`
                        : isResending
                            ? 'Sending...'
                            : 'Resend Code'
                    };
                </button>
    
    
                {resendCodeMessage && (
                    <p className="success-message">
                        {resendCodeMessage}
                    </p>
                )};
    
                {resendCodeError && (
                    <p className="error-message">
                        {resendCodeError}
                    </p>
                )};
    
    
                <footer className="auth-footer">
                    Copyright &copy; 2026 Igagwu & Sons Motor LTD
                </footer>
    
            </div>
    
        </div>
    );
};

export default Verify
