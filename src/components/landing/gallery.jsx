import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  const { data, phoneNumber } = props;

  return (
    <div id="gallery" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Produk Kami</h2>
          <p>
            Kami menyediakan berbagai macam kebutuhan perkebunan maupun
            pertanian, mulai dari Tanaman hias hingga Bibit Buah Panen.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {data
              ? data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                      phoneNumber={phoneNumber} // Pass phone number here
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
