import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const CategoryEditModal = ({ categoryId, onRequestClose }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    // Load CSS dynamically
    const categoryModalCss = document.createElement("link");
    categoryModalCss.rel = "stylesheet";
    categoryModalCss.href = `http://localhost:3000/css/CategoryModal.css`;
    document.head.appendChild(categoryModalCss);

    return () => {
      document.head.removeChild(categoryModalCss);
    };
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories/${categoryId}`);
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');

      await axios.patch(
        `${apiUrl}/categories/${categoryId}`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      setMessage("Category updated successfully!");
      setTimeout(() => {
        onRequestClose();
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage("Failed to update category. Please check your inputs.");
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="category-edit-modal-content">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Category</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CategoryEditModal;
