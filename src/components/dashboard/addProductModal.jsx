import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const ProductAddModal = ({ isOpen, onRequestClose, onProductAdded, categories }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // New state for image URL
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = Cookies.get("token");

            const newProduct = {
                name,
                description,
                price,
                stock,
                category_id: categoryId
            };

            // Save the new product
            const productResponse = await axios.post(
                `${apiUrl}/products`,
                newProduct,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                    },
                }
            );

            const productId = productResponse.data._id;

            // Save the product image
            if (imageUrl) {
                await axios.post(
                    `${apiUrl}/productImages`,
                    { url: imageUrl, product_id: productId },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                        },
                    }
                );
            }

            toast.success("Berhasil Menambahkan Produk");
            setTimeout(() => {
                onProductAdded();
            }, 1000);
        } catch (error) {
            toast.error("Gagal Menambahkan Produk");
        }
    };

    return (
        <div className={`modal fade ${isOpen ? "show d-block" : ""}`} id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addProductModalLabel">Tambah Produk</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onRequestClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Nama:</label>
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
                                <label htmlFor="productDescription" className="form-label">Deskripsi:</label>
                                <textarea
                                    id="productDescription"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productPrice" className="form-label">Harga:</label>
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
                                <label htmlFor="productStock" className="form-label">Stok:</label>
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
                                <label htmlFor="productCategory" className="form-label">Kategori:</label>
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
                                <label htmlFor="productImageUrl" className="form-label">Image URL:</label>
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
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onRequestClose}>Close</button>
                                <button type="submit" className="btn btn-primary">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAddModal;
