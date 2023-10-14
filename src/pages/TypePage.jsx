import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../component/navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const TypePage = ({ productType }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const cookie = Cookies.get('userID');
        setIsLoggedIn(!!cookie);

        const fetchByType = () => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', import.meta.env.VITE_API + `/products?type=${productType}`, true);
            xhr.onreadystatechange = function () {
            const data = JSON.parse(xhr.responseText);
            setProducts(data);
            setFilteredProducts(data);
            setLoading(false);
            };
            xhr.send();
        };

        fetchByType();
    }, [productType]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleOrderClick = (product) => {
        if (isLoggedIn) {
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const updatedCartItems = [...existingCartItems, product];
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            navigate('/cart');
        } else {
            console.log("User is not logged in");
        }
    };

    const renderProductCards = () => {
        if (loading) {
            return <p>Loading...</p>;
        }

        if (filteredProducts.length === 0) {
            return <p>No products found for {productType}.</p>;
        }

        return filteredProducts.map((product) => (
            <div className="col" key={product.productID}>
                <div className="card h-100">
                    {product.image && (
                        <img src={product.image} className="card-img-top img-thumbnail" alt={product.name} style={{ "height": "100%", "width": "auto" }} />
                    )}
                    <div className="card-body text-center">
                        <h5 className="card-title">{product.name}</h5>
                        <h8 className="card-text">{product.description}</h8>
                        <p className="card-price">{product.price} ฿</p>

                        <button
                            className="btn btn-dark"
                            data-bs-toggle="modal"
                            data-bs-target={`#orderModal${product.productID}`}
                            disabled={!isLoggedIn}
                        >
                            Order
                        </button>

                        <div className="modal fade" id={`orderModal${product.productID}`} tabIndex="-1" aria-labelledby={`orderModalLabel${product.productID}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id={`orderModalLabel${product.productID}`}>Order {product.name}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body text-center">
                                        <img src={product.image} className="card-img-top img-thumbnail" alt={product.name} />
                                        <p>{product.description}</p>
                                        <p>{product.price} ฿</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-success" onClick={() => handleOrderClick(product)} data-bs-dismiss="modal">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <Navbar />
            <div className="container1 mt-4">
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by product name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {renderProductCards()}
                </div>
            </div>
        </div>
    );
};

export default TypePage;
