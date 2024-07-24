import React, { useState } from "react";

export const Image = ({ title, largeImage, smallImage, phoneNumber }) => {
  const [linkUrl, setLinkUrl] = useState(largeImage);

  const handleMouseEnter = () => {
    setLinkUrl(
      `https://wa.me/${phoneNumber}?text=Halo, saya berminat untuk menanyakan tentang ketersediaan produk ${title} dari website usahamandirimagelang.com.`
    );
  };

  const handleMouseLeave = () => {
    setLinkUrl(largeImage);
  };

  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        <a
          href={linkUrl}
          title={title}
          data-lightbox-gallery="gallery1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="hover-text">
            <h4>{title}</h4>
          </div>
          <img src={smallImage} className="img-responsive" alt={title} />
        </a>
      </div>
    </div>
  );
};
