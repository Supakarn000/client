import React, { useState, useEffect } from "react";
import './data.css';

const Data = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchData1 = () => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", import.meta.env.VITE_API + "/data", true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          const responseData = JSON.parse(xhr.responseText);
          setData1(responseData);
        }
      };

      xhr.send();
    };

    fetchData1();
  }, []);

  useEffect(() => {
    const fetchData2 = () => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", import.meta.env.VITE_API + "/data/2", true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          const responseData = JSON.parse(xhr.responseText);
          setData2(responseData);
        } else {
          console.error("Error ftech data");
        }
      };

      xhr.send();
    };

    fetchData2();
  }, []);

  return (
    <div>
      <h1>List of Order</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((item, index) => (
            <tr key={index}>
              <td>{item.userID}</td>
              <td>{item.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h1>Top Buyer</h1>
      <table className="custom-table2">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Total Orders</th>
            <th>Total Amount Spent</th>
          </tr>
        </thead>
        <tbody>
          {data2.map((item, index) => (
            <tr key={index}>
              <td>{item.userID}</td>
              <td>{item.username}</td>
              <td>{item.total_orders}</td>
              <td>{item.total_amount_spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
