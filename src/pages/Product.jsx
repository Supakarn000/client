import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../component/navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterProducts, setFilterProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const cookie = Cookies.get('userID');
        setIsLoggedIn(!!cookie);

        const fetchAllProducts = async () => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', import.meta.env.VITE_API + "/products", true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    setProducts(data);
                    setFilterProducts(data);
                } else {
                    console.error(`${xhr.status}`);
                }
            };

            xhr.send();
        };

        fetchAllProducts();
    }, []);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

        setFilterProducts(currentProducts);
    }, [currentPage, products, itemsPerPage]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilterProducts(filtered);
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

    const handleMouseEnter = (productID) => {
        const card = document.getElementById(`productCard${productID}`);
        card.style.backgroundColor = 'red';
    };

    const handleMouseLeave = (productID) => {
        const card = document.getElementById(`productCard${productID}`);
        card.style.backgroundColor = '';
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                    {filterProducts.map((product) => (
                        <div
                            className="col"
                            key={product.productID}
                            id={`productCard${product.productID}`}
                            onMouseEnter={() => handleMouseEnter(product.productID)}
                            onMouseLeave={() => handleMouseLeave(product.productID)}
                        >
                            <div className="card h-100">
                                {product.image && (
                                    <img
                                        src={product.image}
                                        className="card-img-top img-thumbnail"
                                        style={{ "height": "100%", "width": "auto" }}
                                        alt={product.name}
                                    />
                                )}
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.name}</h5>
                                    <h8 className="card-text">{product.description}</h8>
                                    <p className="card-price">{product.price} ฿</p>
                                    <p className="card-stock">{product.instock} in stock left</p>
                                    <button
                                        className="btn btn-dark"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#orderModal${product.productID}`}
                                        disabled={!isLoggedIn}>Order</button>

                                    <div className="modal fade" id={`orderModal${product.productID}`} tabIndex="-1" aria-labelledby={`orderModalLabel${product.productID}`} aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id={`orderModalLabel${product.productID}`}>Order {product.name}</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body text-center">
                                                    <img
                                                        src={product.image}
                                                        className="card-img-top img-thumbnail"
                                                        style={{ "height": "100%", "width": "auto" }}
                                                        alt={product.name}
                                                    />
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
                    ))}
                    <nav aria-label="Page navigation" className="custom-pagination">
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
                            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                </div>
            </div>
        </div>
    );
};

export default Product;
