import React from "react";

export const Services = (props) => {

  const assetUrl = process.env.REACT_APP_ASSET_URL;

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={`${assetUrl}/foto/6.webp`} className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Kenapa Memilih Kami?</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3> </h3>
              <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Pelajari Kenapa Harus Kami
                </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
