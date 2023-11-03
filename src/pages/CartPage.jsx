import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import './CartPage.css';
import Cookies from 'js-cookie';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);

        const storedUserID = Cookies.get('userID');
        if (storedUserID) {
            setUserID(storedUserID);
        }
    }, []);

    const removeFromCart = (productToRemove) => {
        const updatedCart = cartItems.filter((product) => product !== productToRemove);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, product) => total + product.price, 0);
    };

    const handleCheckout = () => {

        const cookie  = Cookies.get('userID');
        const requestBody = {
            userID: userID,
            cartItems: cartItems,
            totalPrice: calculateTotalPrice(),
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${import.meta.env.VITE_API}/order` , true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', cookie);

        xhr.onload = function () {
            if (xhr.status === 200 || this.readyState === 4) {
                localStorage.removeItem('cartItems');
                alert('Order placed successfully!');
                setCartItems([]);
            } else {
                alert('Error placing the order.');
            }
        };

        xhr.onerror = function () {
            console.error('Error placing the order.');
        };

        xhr.send(JSON.stringify(requestBody));
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30vh',
    };

    return (
        <div>
            <Navbar />
            <div className="container1 mt-4">
                <h1>Your Cart</h1>
                {cartItems.length === 0 ? (
                    <div style={containerStyle}>
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map((product, index) => (
                                <li key={index} className="cart-item">
                                    {product.image && (
                                        <img src={product.image} alt={product.name} className="cart-item-image"/>
                                    )}
                                    <div className="cart-item-details">
                                        <p>{product.name}</p>
                                        <p>Price: {product.price} ฿</p>
                                        <button onClick={() => removeFromCart(product)}>Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className='total'>Total Price: {calculateTotalPrice()} ฿</p>
                        <div className='check'>
                            <button onClick={handleCheckout}>Check Out</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;