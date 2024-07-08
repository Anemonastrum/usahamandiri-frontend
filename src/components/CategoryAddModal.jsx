import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import "../styles/CategoryModal.css";

const CategoryAddModal = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');

      await axios.post(
        `${apiUrl}/categories`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      setMessage("Category added successfully!");
      setName("");
      setTimeout(() => {
        onRequestClose();
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage("Failed to add category. Please check your inputs.");
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="category-add-modal-content">
      <h2>Add Category</h2>
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
        <button type="submit">Add Category</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CategoryAddModal;
