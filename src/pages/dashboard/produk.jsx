import React, { useState } from "react";
import AddProductModal from "../../components/dashboard/addProductModal";
import EditProductModal from "../../components/dashboard/editProductModal";
import DeleteProductModal from "../../components/dashboard/deleteProductModal";

function Produk({ products, productImages, categories }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Helper Functions
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  const getProductImageUrl = (productId) => {
    const image = productImages.find((img) => img.product_id === productId);
    return image ? image.url : "https://placehold.co/400";
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Sorting and Filtering
  const sortedProducts = products
    .filter(
      (product) =>
        selectedCategory === "" || product.category_id === selectedCategory
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "A-Z") {
        return a.name.localeCompare(b.name);
      } else if (sortType === "Harga Terendah") {
        return a.price - b.price;
      } else if (sortType === "Harga Tertinggi") {
        return b.price - a.price;
      } else if (sortType === "Stock") {
        return a.stock - b.stock;
      }
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Event Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortTypeChange = (type) => {
    setSortType(type);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    const productImage = productImages.find(
      (img) => img.product_id === product._id
    );
    const imageId = productImage ? productImage._id : null;

    setSelectedProduct({
      ...product,
      imageId, // Sertakan imageId di sini
    });
    setShowDeleteModal(true);
  };

  const handleProductAdded = () => {
    setShowAddModal(false);
    window.location.reload();
  };

  const handleProductUpdated = () => {
    setShowEditModal(false);
    window.location.reload();
  };

  const handleProductDeleted = () => {
    setShowDeleteModal(false);
    window.location.reload();
  };

  return (
    <div className="content-t mt-3 ms-2 me-1">
      <h2>Produk</h2>

      <div className="mb-3 mt-3">
        <button
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
          className="btn btn-success pe-4"
        >
          <i className="fas fa-plus fa-fw me-2"></i>Tambah Produk
        </button>
      </div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="fw-bold">Daftar Produk</div>
          <div className="input-group w-25">
            <span className="input-group-text" id="search-icon">
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-icon"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 ps-3 d-flex align-items-center">
              <div className="fw-bold">
              Menampilkan{" "}
                <span>
                  {Math.min(
                    currentPage * productsPerPage,
                    sortedProducts.length
                  )}
                </span>{" "}
                hasil dari <span>{sortedProducts.length}</span> produk.
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end pe-2">
              <div className="dropdown me-2">
                <button
                  className="btn bg-brand text-light dropdown-toggle"
                  type="button"
                  id="categoryDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedCategory
                    ? categories.find((cat) => cat._id === selectedCategory)
                        .name
                    : "Filter"}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="categoryDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      value=""
                      onClick={handleCategoryChange}
                    >
                      Semua Kategori
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <button
                        className="dropdown-item"
                        value={category._id}
                        onClick={handleCategoryChange}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="sortTypeDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {sortType || "Urutkan"}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="sortTypeDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSortTypeChange("A-Z")}
                    >
                      A-Z
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSortTypeChange("Harga Terendah")}
                    >
                      Harga Terendah
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSortTypeChange("Harga Tertinggi")}
                    >
                      Harga Tertinggi
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSortTypeChange("Stock")}
                    >
                      Stock
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="number-column">No</th>
                  <th className="table-image">Gambar</th>
                  <th>Nama</th>
                  <th>Deskripsi</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Kategori</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product, index) => (
                    <tr key={product._id}>
                      <td className="number-column">
                        {indexOfFirstProduct + index + 1}
                      </td>
                      <td className="table-image">
                        <img
                          src={getProductImageUrl(product._id)}
                          alt={product.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{formatPrice(product.price)}</td>
                      <td>{product.stock}</td>
                      <td>{getCategoryName(product.category_id)}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-1 p-2"
                          onClick={() => handleEdit(product)}
                        >
                          <i class="fas fa-edit me-2 ms-1"></i>Ubah
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-1 p-2"
                          onClick={() => handleDelete(product)}
                        >
                          <i class="fas fa-trash me-2 ms-1"></i>Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No products available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <AddProductModal
        isOpen={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        onProductAdded={handleProductAdded}
        categories={categories}
      />
      {selectedProduct && (
        <>
          <EditProductModal
            product={selectedProduct}
            isOpen={showEditModal}
            onRequestClose={() => setShowEditModal(false)}
            onProductUpdated={handleProductUpdated}
            categories={categories}
          />
          <DeleteProductModal
            product={selectedProduct}
            isOpen={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
            onProductDeleted={handleProductDeleted}
          />
        </>
      )}
    </div>
  );
}

export default Produk;
