import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "react-hot-toast";

const CategoryAddModal = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState("");
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

      toast.success("Berhasil Menambahkan Kategori");
      setName("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Nama Kategori Tidak Boleh Sama atau Kosong");
    }
  };

  return (
    <div className={`modal fade ${isOpen ? 'show d-block' : ''}`} id="categoryAddModal" tabIndex="-1" aria-labelledby="categoryAddModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="categoryAddModalLabel">Tambah Kategori</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onRequestClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">Nama:</label>
                <input
                  id="categoryName"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Kategori"
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Tambah Kategori</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onRequestClose}>Tutup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAddModal;
