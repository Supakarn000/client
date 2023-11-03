import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../component/navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const TypePage = ({ productType }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [getproducts, setGetproducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        //const token = localStorage.getItem('token');
        const cookie = Cookies.get('userID');
        setIsLoggedIn(!!cookie);

        const fetchproduct = () => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', import.meta.env.VITE_API + `/products?type=${productType}`, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const responseText = xhr.responseText;
                        if (responseText) {
                            const data = JSON.parse(responseText);
                            setProducts(data);
                            setGetproducts(data);
                            setLoading(false);
                        } else {
                            console.error('error');
                        }
                    } else {
                        console.error('error');
                    }
                }
            };
            xhr.send();
        };

        fetchproduct();
    }, [productType]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
    
        fetch(import.meta.env.VITE_API + `/products/search?query=${query}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`${response.status}`);
                }
            })
            .then((data) => {
                setGetproducts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleOrderClick = (product) => {
        if (isLoggedIn) {
            const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const updatedCartItems = [...existingCartItems, product];
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            navigate('/cart');
        } else {
            alert("User not logged in");
        }
    };

    const renderProductCards = () => {
        if (loading) {
            return <p>Loading</p>;
        }

        if (getproducts.length === 0) {
            return <p>No products found</p>;
        }

        return getproducts.map((product) => (
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
                            title={!isLoggedIn ? "You must be logged in to place an order" : ""}
                        >Order</button>

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

    // Main return
    return (
        <div>
            <Navbar />
            <div className="container1 mt-4">
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by product name"
                        value={search}
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
