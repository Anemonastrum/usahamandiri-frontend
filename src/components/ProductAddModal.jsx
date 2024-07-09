import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Cookies from 'js-cookie';

const ProductAddModal = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchCategories();
    const productAddCss = document.createElement("link");
    productAddCss.rel = "stylesheet";
    productAddCss.href = `http://localhost:3000/css/ProductAdd.css`;
    document.head.appendChild(productAddCss);

    return () => {
      document.head.removeChild(productAddCss);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');

      const productResponse = await axios.post(
        `${apiUrl}/products`,
        {
          name,
          description,
          price,
          stock,
          category_id: categoryId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      const productId = productResponse.data._id;

      await axios.post(
        `${apiUrl}/productImages`,
        {
          url: imageURL,
          product_id: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      setMessage("Product added successfully!");
      setName("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setCategoryId("");
      setImageURL("");

      onRequestClose();
    } catch (error) {
      setMessage("Failed to add product. Please check your inputs.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="product-add-modal"
      overlayClassName="product-add-modal-overlay"
    >
      <div className="modal-header">
        <h2>Add Product</h2>
      </div>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            required
          />
        </label>
        <label>
          Category:
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            required
          />
        </label>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
        {message && <p className="message">{message}</p>}
      </form>
    </Modal>
  );
};

export default ProductAddModal;
