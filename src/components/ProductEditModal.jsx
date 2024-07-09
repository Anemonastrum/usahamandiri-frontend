import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Cookies from 'js-cookie';

const ProductEditModal = ({ productId, onRequestClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageId, setImageId] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProduct();
    fetchCategories();
    fetchProductImage();
    const productEditCss = document.createElement("link");
    productEditCss.rel = "stylesheet";
    productEditCss.href = `http://localhost:3000/css/ProductEdit.css`;
    document.head.appendChild(productEditCss);

    return () => {
      document.head.removeChild(productEditCss);
    };
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/${productId}`);
      const product = response.data;
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.category_id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Product not found:", error);
        setMessage("Product not found. Please check the product ID.");
      } else {
        console.error("Error fetching product:", error);
        setMessage("Failed to fetch product. Please try again later.");
      }
    }
  };

  const fetchProductImage = async () => {
    try {
      const imageResponse = await axios.get(`${apiUrl}/productimages/product/${productId}`);
      const productImages = imageResponse.data;

      if (productImages.length > 0 && productImages[0].url) {
        setImageURL(productImages[0].url);
        setImageId(productImages[0]._id);
      } else {
        setImageURL("");
      }
    } catch (error) {
      console.error("Error fetching product image:", error);
    }
  };

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
      const token = Cookies.get("token");

      const updatedProduct = {
        name,
        description,
        price,
        stock,
        category_id: categoryId,
      };

      await axios.patch(
        `${apiUrl}/products/${productId}`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (imageId) {
        await axios.patch(
          `${apiUrl}/productimages/${imageId}`,
          { url: imageURL },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );
      }

      setMessage("Product updated successfully!");
      onRequestClose();
    } catch (error) {
      setMessage("Failed to update product. Please check your inputs.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onRequestClose}
      className="product-edit-modal"
      overlayClassName="product-edit-modal-overlay"
    >
      <div className="modal-header">
        <h2>Edit Product</h2>
      </div>
      <form className="edit-product-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary">Update Product</button>
        </div>
        {message && <p className="message">{message}</p>}
      </form>
    </Modal>
  );
};

export default ProductEditModal;
