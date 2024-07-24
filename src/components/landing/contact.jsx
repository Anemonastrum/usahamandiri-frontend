import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [contactInfo, setContactInfo] = useState({});

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await axios.get(`${apiUrl}/information`);
        if (response.data.length > 0) {
          setContactInfo(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchInformation();
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactInfo.whatsapp) {
      // Format the message for WhatsApp
      const messageText = `Nama: ${name} Email: ${email} Message: ${message}`;
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(messageText)}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");
      
      clearState();
    } else {
      console.error("WhatsApp number not available");
    }
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Kontak Kami</h2>
                <p>
                  Isi formulir berikut yang telah kami sediakan untuk menhubungi kami. Kami akan berusaha menanggapi anda secepat mungkin.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Nama"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Pesan"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Kirimkan Pesan
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Info Kontak Kami</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Alamat
                </span>
                {contactInfo.alamat || "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Nomor Telepon
                </span>{" "}
                {contactInfo.whatsapp || "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope"></i> Email
                </span>{" "}
                {contactInfo.email || "loading"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <footer className="container text-center footer bg-light">
          <p>
            &copy; 2024 Usaha Mandiri Magelang{" "}
          </p>
        </footer>
      </div>
    </div>
  );
};
