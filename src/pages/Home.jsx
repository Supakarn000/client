import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../component/navbar";
import "./Home.css";


const Home = () => {
  const [centerCardData, setCenterCardData] = useState([]);
  const [leftCardData, setLeftCardData] = useState([]);
  const [rightCardData, setRightCardData] = useState([]);
  const [isHeaderChanged, setIsHeaderChanged] = useState(false);
  const [bestSoldProduct, setBestSoldProduct] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${import.meta.env.VITE_API}/products/random`, true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setCenterCardData(data);
        } else {
          console.error(`${xhr.status}`);
        }
      };

      xhr.onerror = function () {
        console.error("error fetch data");
      };

      xhr.send();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${import.meta.env.VITE_API}/products/random`, true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setLeftCardData(data);
        } else {
          console.error(`${xhr.status}`);
        }
      };

      xhr.onerror = function () {
        console.error("Error fetch data");
      };

      xhr.send();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${import.meta.env.VITE_API}/products/random`, true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setRightCardData(data);
        } else {
          console.error(`${xhr.status}`);
        }
      };

      xhr.onerror = function () {
        console.error("Error fetch data");
      };

      xhr.send();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${import.meta.env.VITE_API}/products/best`, true);

      xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setBestSoldProduct(data);
        } else {
          console.error(`${xhr.status}`);
        }
      };

      xhr.onerror = function () {
        console.error("Error fetching best sold product data");
      };

      xhr.send();
    };
    fetchData();
  }, []);



  const changeHeaderText = () => {
    if (!isHeaderChanged) {
      const headerElement = document.getElementById("welcomeHeader");
      if (headerElement) {
        headerElement.querySelector("h1").textContent = "Enjoy Your Shopping";
      }
      setIsHeaderChanged(true);
    }
  };



  return (
    <div>
      <Navbar />
      <div className="container">
        <header className="header" id="welcomeHeader" onClick={changeHeaderText}>
          <h1>Welcome to MY SHOP</h1>
          <h2>Fullstock Store is Thailand’s No.1 fashion specialist store, Welcome to our Shop</h2>
          <div className="gradient-emulator"></div>
        </header>

        <section className="mid">
          <h1>FullStock Random For You</h1>
          <div className="cards-container">
            {/* left */}
            {leftCardData.map((product) => (
              <div className="card1" key={product.id}>
                <div className="card-content">
                  <h2>{product.name}</h2>
                  <img src={product.image} alt={product.name} />
                  <p>{product.price} ฿</p>
                </div>
              </div>
            ))}

            {/* center */}
            {centerCardData.map((product) => (
              <div className="card1" key={product.id}>
                <div className="card-content">
                  <h2>{product.name}</h2>
                  <img src={product.image} alt={product.name} />
                  <p>{product.price} ฿</p>
                </div>
              </div>
            ))}

            {/* right */}
            {rightCardData.map((product) => (
              <div className="card1" key={product.id}>
                <div className="card-content">
                  <h2>{product.name}</h2>
                  <img src={product.image} alt={product.name} />
                  <p>{product.price} ฿</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="down">
          <h1>Best Sold Product!!</h1>
          {bestSoldProduct && (
            <div className="card2">
              <div className="card-content">
                <h2>{bestSoldProduct.name}</h2>
                <img src={bestSoldProduct.image} alt={bestSoldProduct.name} />
                <p>{bestSoldProduct.price} ฿</p>
                <p>{bestSoldProduct.description}</p>
                <p>Has been create {bestSoldProduct.sold} sold</p>
                <p>and it was {bestSoldProduct.instock} instock left NOW!!!</p>
                <Link to="/product">
                  <button className="button">Buy this</button>
                </Link>
              </div>
            </div>
          )}
        </section>

        <footer className="credit">
          <h2>Credit</h2>
          <p>ศุภกานต์ บินไกรมาท์ 6404062616039</p>
          <p>ปกเกล้า ศรีนอม 6404062636340</p>
          <p>พัชรพล มากพร้อม 6404062636404</p>
          <p>ศุภกฤต นาคกุลวัฒน์ 6404062636510</p>
        </footer>

      </div>
    </div>
  );
};

export default Home;
