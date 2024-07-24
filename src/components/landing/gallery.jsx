import { Image } from "./image";
import React from "react";

export const Gallery = ({ products, phoneNumber }) => {
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
            {products.length > 0 ? (
              products.slice(0, 6).map((product, i) => (
                <div
                  key={`${product.name}-${i}`}
                  className="col-sm-6 col-md-4 col-lg-4"
                >
                  <Image
                    title={product.name}
                    largeImage={product.image ? product.image.url : ""}
                    smallImage={product.image ? product.image.url : ""}
                    phoneNumber={phoneNumber}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
