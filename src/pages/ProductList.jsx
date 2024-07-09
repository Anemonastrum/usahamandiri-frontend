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
  const [sortOption, setSortOption] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getProducts();
    getCategories();
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

  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("There was an error fetching the categories!", error);
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

  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts = [...products];
    switch (option) {
      case 'alphabetical':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stock':
        sortedProducts.sort((a, b) => b.stock - a.stock);
        break;
      case 'price':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  const filteredProducts = filterCategory
    ? products.filter(product => product.categoryName === filterCategory)
    : products;

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
      <div className="sort-filter-controls">
        <div className="sort-options">
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value="">Urutkan Berdasarkan</option>
            <option value="alphabetical">Alfabet</option>
            <option value="stock">Stock</option>
            <option value="price">Harga</option>
          </select>
        </div>
        <div className="filter-options">
          <select onChange={(e) => handleFilterCategory(e.target.value)}>
            <option value="">Semua Kategori</option>
            {categories.map(category => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="edit-button" onClick={() => setAddModalIsOpen(true)}>Tambah Produk</button>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Stock</th>
            <th>Kategori</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
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
