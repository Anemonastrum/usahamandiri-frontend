import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const ProductEditModal = ({
  isOpen,
  onRequestClose,
  product,
  onProductUpdated,
  categories,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // New state for image URL
  const [imageId, setImageId] = useState(""); // New state for image ID
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/productImages/product/${product._id}`
        );
        if (response.data.length > 0) {
          setImageUrl(response.data[0].url);
          setImageId(response.data[0]._id); // Set image ID
        }
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.category_id);
      fetchProductImage();
    }
  }, [product, apiUrl]);

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

      // Update the product
      await axios.patch(`${apiUrl}/products/${product._id}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      // Update the product image
      if (imageId) {
        await axios.patch(
          `${apiUrl}/productImages/${imageId}`,
          { url: imageUrl },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );
      }

      toast.success("Berhasil Mengedit Produk");
      setTimeout(() => {
        onProductUpdated();
      }, 1000);
    } catch (error) {
      toast.error("Gagal Mengedit Produk");
      console.error("Error updating product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop custom-fade show"></div>
      <div
        className="modal custom-fade show"
        tabIndex="-1"
        aria-labelledby="editProductModalLabel"
        aria-hidden={!isOpen}
        style={{ display: "block" }}
        onClick={(e) => e.target === e.currentTarget && onRequestClose()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProductModalLabel">
                Edit Produk
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onRequestClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Nama:
                  </label>
                  <input
                    id="productName"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">
                    Deskripsi:
                  </label>
                  <textarea
                    id="productDescription"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">
                    Harga:
                  </label>
                  <input
                    id="productPrice"
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productStock" className="form-label">
                    Stok:
                  </label>
                  <input
                    id="productStock"
                    type="number"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="productCategory" className="form-label">
                    Kategori:
                  </label>
                  <select
                    id="productCategory"
                    className="form-select"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="productImageUrl" className="form-label">
                    Image URL:
                  </label>
                  <input
                    id="productImageUrl"
                    type="text"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Perbarui Produk
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductEditModal;
