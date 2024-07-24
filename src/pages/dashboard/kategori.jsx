import React, { useState } from "react";
import EditCategoryModal from "../../components/dashboard/editCategoryModal";
import DeleteCategoryModal from "../../components/dashboard/deleteCategoryModal";
import AddCategoryModal from "../../components/dashboard/addCategoryModal";

const Kategori = ({ categories, products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("Filter");
  const [sortOrder, setSortOrder] = useState("Urutkan");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getProductCount = (categoryId) => {
    return products.filter((product) => product.category_id === categoryId)
      .length;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortTypeChange = (type) => {
    setSortType(type);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const sortedCategories = categories.sort((a, b) => {
    if (sortType === "Berdasarkan Huruf") {
      if (sortOrder === "Ascending") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (sortType === "Berdasarkan Total Produk") {
      if (sortOrder === "Ascending") {
        return getProductCount(a._id) - getProductCount(b._id);
      } else {
        return getProductCount(b._id) - getProductCount(a._id);
      }
    }
    return 0;
  });

  const filteredCategories = sortedCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleCategoryUpdated = () => {
    setShowEditModal(false);
    window.location.reload();
  };

  const handleCategoryDeleted = () => {
    setShowDeleteModal(false);
    window.location.reload();
  };

  return (
    <div className="content-t mt-3 ms-2 me-1">
      <h2>Kategori</h2>

      <div className="">
        <div className="mb-3 mt-3">
          <button
            data-bs-toggle="modal"
            data-bs-target="#categoryAddModal"
            href="#categoryAddModal"
            className="btn btn-success pe-4"
          >
            <i class="fas fa-plus fa-fw me-2"></i>Tambah Kategori
          </button>
        </div>
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="fw-bold">Daftar Kategori</div>
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
                    currentPage * categoriesPerPage,
                    filteredCategories.length
                  )}
                  </span>{" "}
                  dari total {filteredCategories.length} kategori.
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-end pe-2">
                <div className="dropdown me-2">
                  <button
                    className="btn bg-brand text-light dropdown-toggle"
                    type="button"
                    id="sortTypeDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {sortType}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="sortTypeDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSortTypeChange("Berdasarkan Huruf")}
                      >
                        Berdasarkan Huruf
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleSortTypeChange("Berdasarkan Total Produk")
                        }
                      >
                        Berdasarkan Total Produk
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="sortOrderDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {sortOrder}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="sortOrderDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSortOrderChange("Ascending")}
                      >
                        Ascending
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleSortOrderChange("Descending")}
                      >
                        Descending
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
                    <th>Nama</th>
                    <th>Total Produk</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.length > 0 ? (
                    currentCategories.map((category, index) => (
                      <tr key={category._id}>
                        <td className="number-column">
                          {indexOfFirstCategory + index + 1}
                        </td>
                        <td>{category.name}</td>
                        <td>{getProductCount(category._id)}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-1 p-2"
                            onClick={() => handleEdit(category)}
                          >
                            <i class="fas fa-edit me-2 ms-1"></i>Ubah
                          </button>
                          <button
                            className="btn btn-danger btn-sm me-1 p-2"
                            onClick={() => handleDelete(category)}
                          >
                            <i class="fas fa-trash me-2 ms-1"></i>Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Tidak ada kategori
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                {Array.from(
                  {
                    length: Math.ceil(
                      filteredCategories.length / categoriesPerPage
                    ),
                  },
                  (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(index + 1)}
                        className="page-link"
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <AddCategoryModal />
      {selectedCategory && (
        <>
          <EditCategoryModal
            category={selectedCategory}
            isOpen={showEditModal}
            onRequestClose={() => setShowEditModal(false)}
            onCategoryUpdated={handleCategoryUpdated}
          />
          <DeleteCategoryModal
            category={selectedCategory}
            isOpen={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
            onCategoryDeleted={handleCategoryDeleted}
          />
        </>
      )}
    </div>
  );
};

export default Kategori;
