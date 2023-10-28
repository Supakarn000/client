import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import './Profile.css';
import Cookies from 'js-cookie';
import { text } from '@fortawesome/fontawesome-svg-core';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddressFormVisible, setAddressFormVisible] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userID = Cookies.get('userID');
        //profile
        const userxhr = new XMLHttpRequest();
        userxhr.open('GET', import.meta.env.VITE_API + '/profile', true);
        userxhr.setRequestHeader('Authorization', userID);
    
        userxhr.onload = function () {
          if (userxhr.status === 200) {
            const data = JSON.parse(userxhr.responseText);
            setUserData(data);
          } else {
            setIsLoading(false);
          }
        };
    
        userxhr.onerror = function () {
          setIsLoading(false);
        };
    
        userxhr.send();

        //history
        const historyxhr = new XMLHttpRequest();
        historyxhr.open('GET', import.meta.env.VITE_API + '/orderhistory', true);
        historyxhr.setRequestHeader('Authorization', userID);
    
        historyxhr.onload = function () {
          if (historyxhr.status === 200) {
            const data = JSON.parse(historyxhr.responseText);
            const order = data.map((order) => ({
              ...order,
              cartItems: JSON.parse(order.cartItems),
            }));
            setOrderHistory(order);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        };
    
        historyxhr.onerror = function () {
          setIsLoading(false);
        };
    
        historyxhr.send();
      }, []);

    const renderhistory = (cartItem) => (
        <div className="cart-item" key={cartItem.productID}>
            <img src={cartItem.image} alt={cartItem.name} />
            <div className="cart-item-details">
                <h3>{cartItem.name}</h3>
                <p>Description: {cartItem.description}</p>
                <p>Price: ฿{cartItem.price}</p>
            </div>
        </div>
    );

    const handleUpdateAddressClick = () => {
        setAddressFormVisible(true);
    };

    const handleAddressChange = (e) => {
        setNewAddress(e.target.value);
    };

    const handleUpdateAddressSubmit = () => {
        const token = localStorage.getItem("token");
        const userID = Cookies.get('userID');
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', import.meta.env.VITE_API + '/profile/address', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', userID);
    
        xhr.onload = function () {
          if (xhr.status === 200) {
            setUpdateSuccess(true);
            setAddressFormVisible(false);
          } else {
            setUpdateSuccess(false);
          }
        };
    
        xhr.onerror = function () {
          setUpdateSuccess(false);
        };
    
        xhr.send(JSON.stringify({ newAddress }));
      };

    return (
        <div className="profile-container">
            <Navbar />
            <h1>Profile Page</h1>
            {isLoading ? (
                <p>Loading user data</p>
            ) : (
                userData ? (
                    <div className="user-info">
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                        <p>Address : {userData.address}</p>
                        <button onClick={handleUpdateAddressClick}>Update Address</button>
                        {isAddressFormVisible && (
                            <div className="address-form">
                                <input
                                    type="text"
                                    placeholder="New Address"
                                    value={newAddress}
                                    onChange={handleAddressChange}
                                />
                                <button onClick={handleUpdateAddressSubmit}>Submit</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Error loading user data</p>
                )
            )}

            <h2>Order History</h2>
            {isLoading ? (
                <p>Loading order history</p>
            ) : (
                orderHistory.length > 0 ? (
                    <ul className="order-list">
                        {orderHistory.map((order) => (
                            <li key={order.orderID} className="order-item">
                                <strong>Order ID:</strong> {order.orderID}<br />
                                <strong>Date:</strong> {order.orderDate}<br />
                                <strong>Total:</strong> ฿{order.totalPrice}<br />
                                <strong>Order Details:</strong>
                                {order.cartItems.map(renderhistory)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No order history available.</p>
                )
            )}
        </div>
    );
};

export default Profile;
