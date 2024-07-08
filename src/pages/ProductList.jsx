import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProductList.css";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from "react-modal";
import ProductAddModal from "../components/ProductAddModal";
import ProductEditModal from "../components/ProductEditModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      const productsWithDetails = await Promise.all(
        response.data.map(async (product) => {
          const categoryResponse = await axios.get(
            `${apiUrl}/categories/${product.category_id}`
          );

          const productImageResponse = await axios.get(`${apiUrl}/productImages`, {
            params: { product_id: product._id }
          });

          const productImage = productImageResponse.data.find(image => image.product_id === product._id);

          return {
            ...product,
            categoryName: categoryResponse.data.name,
            productImage: productImage ? productImage.url : null
          };
        })
      );
      setProducts(productsWithDetails);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const productResponse = await axios.get(`${apiUrl}/products/${id}`);
      const product = productResponse.data;

      const token = Cookies.get('token');
      await axios.delete(`${apiUrl}/products/${id}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      if (product.productImageId) {
        await axios.delete(`${apiUrl}/productimages/${product.productImageId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
      }

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
  };

  const refreshProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      const productsWithDetails = await Promise.all(
        response.data.map(async (product) => {
          const categoryResponse = await axios.get(
            `${apiUrl}/categories/${product.category_id}`
          );

          const productImageResponse = await axios.get(`${apiUrl}/productImages`, {
            params: { product_id: product._id }
          });

          const productImage = productImageResponse.data.find(image => image.product_id === product._id);

          return {
            ...product,
            categoryName: categoryResponse.data.name,
            productImage: productImage ? productImage.url : null
          };
        })
      );
      setProducts(productsWithDetails);
      setLoading(false);
    } catch (error) {
      console.error("There was an error refreshing the products!", error);
    }
  };

  const handleProductAdded = () => {
    refreshProducts();
    setAddModalIsOpen(false);
  };

  const handleProductEdited = () => {
    refreshProducts();
    setEditModalIsOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <button type="submit" className="edit-button" onClick={() => setAddModalIsOpen(true)}>Tambah Product</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.categoryName}</td>
              <td>
                {product.productImage ? (
                  <img src={product.productImage} alt={product.name} className="product-image" />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <Link to="#" className="edit-button" onClick={() => {
                  setSelectedProductId(product._id);
                  setEditModalIsOpen(true);
                }}>Edit</Link>
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        className="product-add-modal"
        overlayClassName="product-add-modal-overlay"
      >
        <ProductAddModal
          isOpen={addModalIsOpen}
          onRequestClose={() => handleProductAdded()}
        />
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        className="product-edit-modal"
        overlayClassName="product-edit-modal-overlay"
      >
        {selectedProductId && (
          <ProductEditModal
            productId={selectedProductId}
            onRequestClose={() => handleProductEdited()}
          />
        )}
      </Modal>
    </div>
  );
};

export default ProductList;
