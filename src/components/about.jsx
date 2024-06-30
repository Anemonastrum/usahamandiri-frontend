import React from "react";

export const About = (props) => {
  return (
    <div id="about" className="">
      <div className="container outro">
        <div className="d-flex row justify-content-center align-items-center overlay">
          <div className="col-md-8 col-md-offset-2 intro-text">
            <h1>
              Tentang Kami
              <span></span>
            </h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="col-md-6">
          <div className="about-text">
            <p>{props.data ? props.data.paragraph : "loading..."}</p>
          </div>
          <div className="about-text">
            <p>{props.data ? props.data.paragraph2 : "loading..."}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="about-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.0775748981932!2d110.15123039999999!3d-7.566521499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8dfb39767c29%3A0xb4e61a40dd51cc20!2sUSAHA%20MANDIRI!5e0!3m2!1sid!2sid!4v1719322646122!5m2!1sid!2sid"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
