import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "react-hot-toast";

const EditCategoryModal = ({ category, isOpen, onRequestClose, onCategoryUpdated }) => {
  const [name, setName] = useState(category?.name || "");
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('token');

      const response = await axios.patch(
        `${apiUrl}/categories/${category._id}`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      console.log(response);

      toast.success("Category updated successfully!");
      setTimeout(() => {
        onCategoryUpdated();
        onRequestClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop custom-fade show"></div>
      <div
        className="modal custom-fade show"
        tabIndex="-1"
        aria-labelledby="editCategoryModalLabel"
        aria-hidden={!isOpen}
        style={{ display: 'block' }}
        onClick={(e) => e.target === e.currentTarget && onRequestClose()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editCategoryModalLabel">Ubah Kategori</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onRequestClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="editCategoryName" className="form-label">Name:</label>
                  <input
                    id="editCategoryName"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Simpan</button>
              <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategoryModal;
