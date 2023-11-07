import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import "./add.css";

const Add = () => {
    const [productId, setProductId] = useState("");
    const [product, setProduct] = useState({
        name: "",
        image: "",
        description: "",
        type: "",
        price: "",
        instock: ""
    });

    const [productCount, setProductCount] = useState(0);

    const handleIdChange = (e) => {
        const { value } = e.target;
        setProductId(value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();

        xhr.open("POST", import.meta.env.VITE_API + "/products/add", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201) {
                    console.log("Product created");
                    alert("Product created");
                    window.location.reload();
                } else {
                    console.error("Error:", xhr.statusText);
                }
            }
        };

        xhr.send(JSON.stringify(product));
    };
    
    const handleDelete = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();

        xhr.open("DELETE", import.meta.env.VITE_API + `/products/delete/${productId}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 204) {
                    alert("Product deleted");
                    window.location.reload();
                } else {
                    console.error("Error:", xhr.statusText);
                }
            }
        };

        xhr.send();
    };

    const handleEdit = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();

        xhr.open("PUT", import.meta.env.VITE_API + `/products/update/${productId}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    alert("Product updated");
                    window.location.reload();
                } else {
                    console.error("Error:", xhr.statusText);
                }
            }
        };

        xhr.send(JSON.stringify(product));
    };

    useEffect(() => {
        const fetchProductCount = async () => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', import.meta.env.VITE_API + "/products/count", true);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    setProductCount(data.productCount);
                } else {
                    console.error(`${xhr.status}`);
                }
            };

            xhr.send();
        };

        fetchProductCount();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>All product in database is {productCount} products</h1>
            <h2 style={{textAlign: "center"}}>Add Product Form</h2>
            <form onSubmit={handleAdd} className="main-form">
                <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange}/><br/>
                <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange}/><br/>
                <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange}/><br/>
                <input type="text" name="type" placeholder="Type" value={product.type} onChange={handleChange}/><br/>
                <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange}/><br/>
                <input type="number" name="instock" placeholder="In Stock" value={product.instock} onChange={handleChange}/><br/>
                <button type="submit">Add Product</button>
            </form>
            <br/>
            <h2 style={{textAlign: "center"}}>Delete Product Form</h2>
            <form onSubmit={handleDelete} className="del-form">
                <input type="text" name="productId" placeholder="Product ID" value={productId} onChange={handleIdChange} /><br/>
                <button type="submit">Delete Product</button>
            </form><br/>
            <h2 style={{ textAlign: "center" }}>Update Product Form</h2>
            <form onSubmit={handleEdit} className="main-form">
                <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} /><br />
                <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} /><br />
                <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} /><br />
                <input type="text" name="type" placeholder="Type" value={product.type} onChange={handleChange} /><br />
                <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} /><br />
                <input type="number" name="instock" placeholder="In Stock" value={product.instock} onChange={handleChange} /><br />
                <input type="text" name="productId" placeholder="Product ID" value={productId} onChange={handleIdChange} /><br />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default Add;
