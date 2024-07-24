import React, { useState, useEffect } from 'react';

function Home({ user, products, categories }) {
    const totalProducts = products.length;
    const latestProducts = products.slice(-3);
    const totalCategories = categories.length;
    const [showAlert, setShowAlert] = useState(false);

    const productsWithZeroStock = products.filter(product => product.stock === 0);

    useEffect(() => {
        const isFirstLogin = sessionStorage.getItem('isFirstLogin') !== 'false';
        if (isFirstLogin) {
            setShowAlert(true);
            sessionStorage.setItem('isFirstLogin', 'false');
        }
    }, []);

    return (
        <div className="content-t mt-3 ms-2 me-1">
            {showAlert && (
                <div className='alert alert-success alert-dismissible fade show'>
                    <button type='button' className='btn-close' data-bs-dismiss='alert'></button>
                    <strong>Login Success!</strong>, Welcome <strong>{user.username}</strong> to the Dashboard.
                </div>
            )}
            
            <h2>Dashboard</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-3">
                        <div className="card-header">
                            <div className="fw-bold">Total Kategori Produk</div>
                        </div>
                        <div className="card-body">
                            <h3>{totalCategories}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-3">
                        <div className="card-header">
                            <div className="fw-bold">Status</div>
                        </div>
                        <div className="card-body">
                            <h3 className="text-capitalize">{user.role}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <div className="fw-bold">Statistik Produk</div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h5>Total Produk</h5>
                            <h3 className="text-center" style={{ fontSize: '60px' }}>{totalProducts}</h3>
                            <p className="text-center">Tipe Produk</p>
                        </div>
                        <div className="col-md-6">
                            <h5>Produk Terakhir</h5>
                            <ul className="list-group">
                                {latestProducts.length > 0 ? (
                                    latestProducts.map((product, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            {product.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">Belum ada produk</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    Wilo el gato
                </div>
            </div>

            <div className="card mt-4">
          <div className="card-header">
            <div className="fw-bold">Produk Habis</div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productsWithZeroStock.length > 0 ? (
                    productsWithZeroStock.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.stock}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">Tidak ada produk yang habis</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer"></div>
        </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">TIPS</h5>
                    <div className="card-img-center container align-items-center justify-content-center">
                    </div>
                    <p className="card-text">Lorem ipsum sit dolor amet</p>
                    <a href="https://www.google.com/search?q=cara+membuat+RPS" className="btn btn-primary bg-brand">Read More</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
