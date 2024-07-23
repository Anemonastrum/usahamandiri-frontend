import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const DeleteCategoryModal = ({ category, isOpen, onRequestClose, onCategoryDeleted }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');

      await axios.delete(
        `${apiUrl}/categories/${category._id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      onCategoryDeleted();
      onRequestClose();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      {isOpen && <div className="modal-backdrop fade show"></div>}
      <div
        className={`modal fade custom-fade ${isOpen ? 'show d-block' : ''}`}
        tabIndex="-1"
        aria-labelledby="deleteCategoryModalLabel"
        aria-hidden={!isOpen}
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={e => e.target === e.currentTarget && onRequestClose()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteCategoryModalLabel">Hapus Kategori</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onRequestClose}></button>
            </div>
            <div className="modal-body">
              <p>Apakah Anda yakin akan mengahapus "{category?.name}"?</p>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Tutup</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCategoryModal;
