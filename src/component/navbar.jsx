import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
    const isLoggedIn = Cookies.get("userID") !== undefined;
    const username = Cookies.get("username");
    const isAdmin = Cookies.get("isAdmin") === "1";
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("userID");
        Cookies.remove("username");
        Cookies.remove("isAdmin");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("cartItems");
        window.location.reload();
    };

    const handleTextMouseEnter = (event) => {
        event.target.style.color = 'red';
    };

    const handleTextMouseLeave = (event) => {
        event.target.style.color = '';
    };

    const handleTipclick = () => {
        const tipclick = document.getElementById("tip");
        if (tipclick) {
            tipclick.textContent = "Login to order products!!";
        }
    };

    const Adminpanel = () => {
        navigate('/add');
    }

    const data = () => {
        navigate('/data');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/product"
                            onMouseEnter={handleTextMouseEnter}
                            onMouseLeave={handleTextMouseLeave}
                        >
                            Product
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/product" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onMouseEnter={handleTextMouseEnter} onMouseLeave={handleTextMouseLeave}>
                            All Types
                        </a>
                        <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown" >
                            <a className="dropdown-item" href="/shoes" onMouseEnter={handleTextMouseEnter} onMouseLeave={handleTextMouseLeave}>Shoes</a>
                            <a className="dropdown-item" href="/shirt" onMouseEnter={handleTextMouseEnter} onMouseLeave={handleTextMouseLeave}>Shirts</a>
                            <a className="dropdown-item" href="/pants" onMouseEnter={handleTextMouseEnter} onMouseLeave={handleTextMouseLeave}>Pants</a>
                            <a className="dropdown-item" href="/other" onMouseEnter={handleTextMouseEnter} onMouseLeave={handleTextMouseLeave}>Other</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="https://github.com/Supakarn000/FullStock-MySql-"
                            onMouseEnter={handleTextMouseEnter}
                            onMouseLeave={handleTextMouseLeave}
                        >
                            Contact
                        </a>
                    </li>
                    {isLoggedIn ? (
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span style={{ color: 'red' }}>Hello {username}
                                </span>
                            </a>
                            <div className="dropdown-menu  dropdown-menu-dark" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href='/profile' onMouseEnter={handleTextMouseEnter} onMouseLeave={handleTextMouseLeave}>Profile</a>
                                <hr className="dropdown-divider bg-light" />
                                <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                            </div>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="/login"
                                onMouseEnter={handleTextMouseEnter}
                                onMouseLeave={handleTextMouseLeave}
                            >
                                Login
                            </a>
                        </li>
                    )}
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            id='tip'
                            onMouseEnter={handleTextMouseEnter}
                            onMouseLeave={handleTextMouseLeave}
                            onClick={handleTipclick}
                        >
                            Tip to buy Product
                        </a>
                    </li>

                    {isAdmin && (
                        <li className="nav-item">
                            <a className="nav-link" onClick={Adminpanel}
                                onMouseEnter={handleTextMouseEnter}
                                onMouseLeave={handleTextMouseLeave}>
                                ADMIN PANAL
                            </a>
                        </li>
                    )}
                    {isAdmin && (
                        <li className="nav-item">
                            <a className="nav-link" onClick={data}
                                onMouseEnter={handleTextMouseEnter}
                                onMouseLeave={handleTextMouseLeave}>
                                DATACHECK
                            </a>
                        </li>
                    )}
                </ul>

                {isLoggedIn && (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ">
                            <a className="nav-link " href="/cart">
                                <FontAwesomeIcon icon={faCartShopping} style={{ color: "#fff000" }} />
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
