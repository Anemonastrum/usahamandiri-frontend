import React, { useState } from "react";
import EditInformationModal from "../../components/dashboard/editInformationModal";

const Informasi = ({ information }) => {
  const [selectedInformation, setSelectedInformation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (info) => {
    setSelectedInformation(info);
    setShowEditModal(true);
  };

  const handleInformationUpdated = () => {
    setShowEditModal(false);
    window.location.reload();
  };

  return (
    <div className="content-t mt-3 ms-2 me-1">
      <h2>Information</h2>

      <div className="mb-3 mt-3"></div>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="fw-bold">Data Informasi</div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>WhatsApp</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {information.length > 0 ? (
                  information.map((info) => (
                    <tr key={info._id}>
                      <td>{info.whatsapp}</td>
                      <td>{info.email}</td>
                      <td>{info.alamat}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-1 p-2"
                          onClick={() => handleEdit(info)}
                        >
                          <i className="fas fa-edit me-2 ms-1"></i>Ubah
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No information found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedInformation && (
        <EditInformationModal
          information={selectedInformation}
          isOpen={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
          onInformationUpdated={handleInformationUpdated}
        />
      )}
    </div>
  );
};

export default Informasi;
