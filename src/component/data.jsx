import React, { useState, useEffect } from "react";
import './data.css';

const Data = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const itemsPerPage = 5;

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
          console.error("Error fetching data");
        }
      };

      xhr.send();
    };

    fetchData2();
  }, []);

  const orderdata = data1.slice((page1 - 1) * itemsPerPage, page1 * itemsPerPage);
  const topbuydata = data2.slice((page2 - 1) * itemsPerPage, page2 * itemsPerPage);

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
          {orderdata.map((item, index) => (
            <tr key={index}>
              <td>{item.userID}</td>
              <td>{item.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="data1b">
        <button id='buttond' onClick={() => setPage1(page1 - 1)} disabled={page1 === 1}>
          Previous
        </button>
        <button id='buttond' onClick={() => setPage1(page1 + 1)} disabled={page1 * itemsPerPage >= data1.length}>
          Next
        </button>
      </div>

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
          {topbuydata.map((item, index) => (
            <tr key={index}>
              <td>{item.userID}</td>
              <td>{item.username}</td>
              <td>{item.total_orders}</td>
              <td>{item.total_amount_spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="data2b">
        <button id='buttond' onClick={() => setPage2(page2 - 1)} disabled={page2 === 1}>
          Previous
        </button>
        <button id='buttond' onClick={() => setPage2(page2 + 1)} disabled={page2 * itemsPerPage >= data2.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Data;
