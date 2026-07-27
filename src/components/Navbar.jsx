import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

import './Navbar.css';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            <Link to="/" className="logo" onClick={closeMenu}>
                <span>IGAGWU</span> MOTORS
            </Link>


            <ul className={menuOpen ? 'nav-links active' : 'nav-links'}>

                <li>
                    <NavLink to="/" onClick={closeMenu}>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/cars" onClick={closeMenu}>
                        Cars
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/about" onClick={closeMenu}>
                        About
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/contact" onClick={closeMenu}>
                        Contact
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/login" className="login-link" onClick={closeMenu}>
                        Login
                    </NavLink>
                </li>

            </ul>

            <button
                className={`menu-icon ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

        </nav>
    );
};

export default Navbar;