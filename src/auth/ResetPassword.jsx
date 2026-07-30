import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Api from '../api/Axios';

import './Auth.css';

const ResetPassword = () => {
    const [email, setEmail] = useState( sessionStorage.getItem('resetEmail') || '' );
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [countDown, setCountDown] = useState(0);
    const [isResending, setIsResending] = useState(false);
    const [resendCodeError, setResendCodeError] = useState('');
    const [resendCodeMessage, setResendCodeMessage] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
            let timer;
    
            if (countDown > 0) {
                timer = setInterval(() => {
                    setCountDown(prev => prev - 1);
                }, 1000);
            }
            return () => clearInterval(timer);

        }, [countDown]);

    const handleResetPassword = async (e) => {

        e.preventDefault();

        try {
            const response = await Api.post('/reset-password', {
                email,
                code,
                password
            });

            setMessage(response.data.message);

            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (err) {
            setErrorMessage(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
        };
    };

    const handleResend = async () => {

            if (countDown > 0) return;

            try {
                setIsResending(true);
    
                const response = await Api.post('/resend-reset-code', {
                    email
                });

                setResendCodeMessage(response.data.message);

                setCountDown(60);

            } catch (err) {
                console.log(err)
                setResendCodeError(err.response?.data?.message || err.message || 'Something went wrong, Please try again.');
            } finally {
                setIsResending(false);
            };
    };
    
    return (
        <div className="auth-page">

        <Helmet>
            <title>Reset Password | Igagwu & Sons Motor LTD</title>

            <meta
                name="description"
                content="Enter your verification code and create a new password for your Igagwu & Sons Motor LTD account."
            />
        </Helmet>
    
            <div className="auth-container">
    
                <div className="auth-logo">
                    <h1>Igagwu & Sons</h1>
                    <p>Motor LTD</p>
                </div>
    
                <h2>Reset Password</h2>
    
                <p className="auth-subtitle">
                    Enter the code sent to your email and create a new password.
                </p>
    
    
                <form
                    className="auth-form"
                    onSubmit={handleResetPassword}
                >
    
                    <label>
                        Email
                    </label>
    
                    <input
                        type="email"
                        placeholder="JohnDoe@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
    
    
                    <label>
                        Reset Code
                    </label>
    
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        required
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
    
    
                    <label>
                        New Password
                    </label>
    
                    <input
                        type="password"
                        required
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
    
    
                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Reset Password
                    </button>
    
                </form>
    
    
                <button
                    className="back-btn"
                    onClick={handleResend}
                    disabled={countDown > 0 || isResending}
                >
                    {countDown > 0
                        ? `Resend code in ${countDown}s`
                        : isResending
                            ? 'Sending...'
                            : 'Resend Code'
                    }
                </button>
    
    
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
    
                {resendCodeMessage && (
                    <p className="success-message">
                        {resendCodeMessage}
                    </p>
                )}
    
                {resendCodeError && (
                    <p className="error-message">
                        {resendCodeError}
                    </p>
                )}
    
    
                <div className="auth-links">
                    <Link to="/">
                        Back to Login
                    </Link>
                </div>
    
    
                <footer className="auth-footer">
                    Copyright &copy; 2026 Igagwu & Sons Motor LTD
                </footer>
    
            </div>
    
        </div>
    );
}

export default ResetPassword
