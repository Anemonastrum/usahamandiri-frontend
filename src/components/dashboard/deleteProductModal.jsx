import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const DeleteProductModal = ({
  isOpen,
  onRequestClose,
  onProductDeleted,
  product,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDelete = async () => {
    try {
      const token = Cookies.get("token");

      // Hapus gambar produk
      if (product.imageId) {
        await axios.delete(`${apiUrl}/productImages/${product.imageId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });
      }

      // Hapus produk
      await axios.delete(`${apiUrl}/products/${product._id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      toast.success("Produk berhasil dihapus");
      setTimeout(() => {
        onProductDeleted();
      }, 1000);
    } catch (error) {
      toast.error("Gagal menghapus produk");
    }
  };

  return (
    <>
      {isOpen && <div className="modal-backdrop fade show"></div>}

      <div
        className={`modal fade custom-fade ${isOpen ? 'show d-block' : ''}`}
        tabIndex="-1"
        aria-labelledby="deleteProductModalLabel"
        aria-hidden={!isOpen}
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={e => e.target === e.currentTarget && onRequestClose()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteProductModalLabel">
                Hapus Produk
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onRequestClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>Anda yakin ingin menghapus produk {product.name}?</p>
            </div>
            <div className="modal-footer">
            <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Hapus
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onRequestClose}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProductModal;
