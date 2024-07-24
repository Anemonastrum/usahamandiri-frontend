import React, { useState } from "react";

const Pengguna = ({ userAdmin }) => {
  const { users, admins } = userAdmin;

  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [usersPerPage] = useState(7);

  const [currentPageAdmins, setCurrentPageAdmins] = useState(1);
  const [adminsPerPage] = useState(5);

  const indexOfLastUser = currentPageUsers * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const indexOfLastAdmin = currentPageAdmins * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const paginateUsers = (pageNumber) => setCurrentPageUsers(pageNumber);
  const paginateAdmins = (pageNumber) => setCurrentPageAdmins(pageNumber);

  return (
    <div className="content-t mt-3 ms-2 me-1">
      <h2>User & Admin</h2>

      <div className="mb-3 mt-3">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="fw-bold">Pengguna</div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="number-column">No</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Alamat</th>
                    <th>Notelp</th>
                    <th>Dibuat</th>
                    <th>Diubah</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td className="number-column">
                          {indexOfFirstUser + index + 1}
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{new Date(user.createdAt).toLocaleString()}</td>
                        <td>{new Date(user.updatedAt).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <nav className="d-flex justify-content-center mt-3">
              <ul className="pagination">
                {Array.from(
                  { length: Math.ceil(users.length / usersPerPage) },
                  (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPageUsers === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginateUsers(index + 1)}
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

        <div className="card mt-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="fw-bold">Admin</div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="number-column">No</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Dibuat</th>
                    <th>Diubah</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAdmins.length > 0 ? (
                    currentAdmins.map((admin, index) => (
                      <tr key={admin._id}>
                        <td className="number-column">
                          {indexOfFirstAdmin + index + 1}
                        </td>
                        <td>{admin.username}</td>
                        <td>{admin.email}</td>
                        <td>{new Date(admin.createdAt).toLocaleString()}</td>
                        <td>{new Date(admin.updatedAt).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No admins found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer">
            <nav className="d-flex justify-content-center mt-3">
              <ul className="pagination">
                {Array.from(
                  { length: Math.ceil(admins.length / adminsPerPage) },
                  (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPageAdmins === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginateAdmins(index + 1)}
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
    </div>
  );
};

export default Pengguna;
