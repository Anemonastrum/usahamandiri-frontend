import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import CategoryAddModal from "../components/CategoryAddModal";
import CategoryEditModal from "../components/CategoryEditModal";
import Cookies from 'js-cookie';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getCategories();

    // Load CSS dynamically
    const categoryListCss = document.createElement("link");
    categoryListCss.rel = "stylesheet";
    categoryListCss.href = `http://localhost:3000/css/CategoryList.css`;
    document.head.appendChild(categoryListCss);

    return () => {
      document.head.removeChild(categoryListCss);
    };
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`${apiUrl}/categories/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("There was an error deleting the category!", error);
    }
  };

  const refreshCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("There was an error refreshing the categories!", error);
    }
  };

  const handleCategoryAdded = () => {
    refreshCategories();
    setAddModalIsOpen(false);
  };

  const handleCategoryEdited = () => {
    refreshCategories();
    setEditModalIsOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="category-list-container">
      <h1>Category List</h1>
      <Link to="#" className="add-button" onClick={() => setAddModalIsOpen(true)}>Tambah Kategori</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <Link to="#" className="edit-button" onClick={() => {
                  setSelectedCategoryId(category._id);
                  setEditModalIsOpen(true);
                }}>Edit</Link>
                <button onClick={() => deleteCategory(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        className="category-add-modal"
        overlayClassName="category-add-modal-overlay"
      >
        <CategoryAddModal
          isOpen={addModalIsOpen}
          onRequestClose={() => handleCategoryAdded()}
        />
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        className="category-edit-modal"
        overlayClassName="category-edit-modal-overlay"
      >
        {selectedCategoryId && (
          <CategoryEditModal
            categoryId={selectedCategoryId}
            onRequestClose={() => handleCategoryEdited()}
          />
        )}
      </Modal>
    </div>
  );
};

export default CategoryList;
