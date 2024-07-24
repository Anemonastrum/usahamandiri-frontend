import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { Modal } from 'react-bootstrap';

const EditInformationModal = ({
  isOpen,
  onRequestClose,
  information,
  onInformationUpdated,
}) => {
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (information) {
      setWhatsapp(information.whatsapp);
      setEmail(information.email);
      setAlamat(information.alamat);
    }
  }, [information]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      await axios.put(
        `${apiUrl}/information/${information._id}`,
        { whatsapp, email, alamat },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        }
      );
      toast.success('Information updated successfully');
      onInformationUpdated();
    } catch (error) {
      toast.error('Failed to update information');
    }
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="whatsapp" className="form-label">WhatsApp</label>
            <input
              type="text"
              className="form-control"
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">Alamat</label>
            <input
              type="text"
              className="form-control"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditInformationModal;
