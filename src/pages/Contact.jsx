import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Api from '../api/Axios';
import './Contact.css';

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [showPhoneOption, setShowPhoneOption] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSuccess('');
        setError('');
        setLoading(true);

        try {
            const response = await Api.post('/enquiries', {
                name,
                email,
                phone,
                message
            });

            setSuccess(response.data.message);

            setName('');
            setEmail('');
            setPhone('');
            setMessage('');

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to send enquiry.');
        } finally {
            setLoading(false);
        };
    };

    return (
        <>
            <Navbar />

            <main className="contact-page">

                <section className="contact-hero">
                    <h1>Contact Us</h1>

                    <p>
                        Have a question or need help finding your dream car?
                        Get in touch with us today.
                    </p>
                </section>

                <section className="contact-container">

                    <div className="contact-info">

                        <h2>Get In Touch</h2>

                        <p>
                            We are here to help you find the right vehicle.
                            Send us a message and our team will get back to you.
                        </p>

                        <div className="contact-info-item">
                            <h3>Phone</h3>
                            
                            <button
                                type='button'
                                className='phone-number'
                                onClick={() => setShowPhoneOption(true)}
                            >
                                +234 8026484829
                            </button>
                        </div>

                        <div className="contact-info-item">
                            <h3>Email</h3>
                            <p>abdulsalammustapha72@gmail.com</p>
                        </div>

                        <div className="contact-info-item">
                            <h3>Location</h3>
                            <p>Lagos, Nigeria</p>
                        </div>

                    </div>


                    <div className="contact-form-container">

                        <h2>Send Us A Message</h2>

                        <form onSubmit={handleSubmit}>

                            <label htmlFor="name">
                                Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />


                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />


                            <label htmlFor="phone">
                                Phone
                            </label>

                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />


                            <label htmlFor="message">
                                Message
                            </label>

                            <textarea
                                id="message"
                                placeholder="How can we help you?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />


                            {success && (
                                <p className="contact-success">
                                    {success}
                                </p>
                            )}

                            {error && (
                                <p className="contact-error">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {loading
                                    ? 'Sending...'
                                    : 'Send Message'
                                }
                            </button>
                        </form>
                    </div>
                </section>

                <div className="contact-back">
                    <Link to="/">
                        Back to Home
                    </Link>
                </div>

                {showPhoneOption && (
                    <div
                        className="phone-modal-overlay"
                        onClick={() => setShowPhoneOption(false)}
                    >
                        <div
                            className="phone-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="close-modal"
                                onClick={() => setShowPhoneOption(false)}
                            >
                                ×
                            </button>

                            <h2>Contact Us</h2>

                            <p>
                                What would you like to do?
                            </p>

                            <div className="phone-modal-actions">

                                <a
                                    href="tel:+2348026484829"
                                    className="call-btn"
                                >
                                    📞 Call
                                </a>

                                <a
                                    href="sms:+2348026484829"
                                    className="message-btn"
                                >
                                    💬 Send Message
                                </a>

                            </div>
                            
                        </div>
                        
                    </div>
                )}

            </main>
        </>
    )
}

export default Contact;