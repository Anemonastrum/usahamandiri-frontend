import React, { useState, useEffect } from "react";
import { Navigation } from "../components/landing/navigation";
import { Header } from "../components/landing/header";
import { Features } from "../components/landing/features";
import { About } from "../components/landing/about";
import { Services } from "../components/landing/services";
import { Gallery } from "../components/landing/gallery";
import { Contact } from "../components/landing/contact";
import JsonData from "../data/data.json";
import { ThreeDots } from "react-loader-spinner";
import SmoothScroll from "smooth-scroll";
import axios from "axios";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const LandingPage = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const assetUrl = process.env.REACT_APP_ASSET_URL;
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {

    setTimeout(() => {
      setLandingPageData(JsonData);
      setLoading(false);
    }, 2000);

    const fetchPhoneNumber = async () => {
      try {
        const response = await axios.get(`${apiUrl}/information`);
        const info = response.data[0]; // Assuming the first entry contains the information you need
        setPhoneNumber(info.whatsapp); // Adjust to match the structure of your response
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    };

    fetchPhoneNumber();

    const bsCss = document.createElement("link");
    bsCss.rel = "stylesheet";
    bsCss.href = `${assetUrl}/css/bootstrap.css`;
    document.head.appendChild(bsCss);

    const landingCss = document.createElement("link");
    landingCss.rel = "stylesheet";
    landingCss.href = `${assetUrl}/css/landing.css`;
    document.head.appendChild(landingCss);

    const nvCss = document.createElement("link");
    nvCss.rel = "stylesheet";
    nvCss.href = `${assetUrl}/css/nivo-lightbox/nivo-lightbox.css`;
    document.head.appendChild(nvCss);

    const nvCss2 = document.createElement("link");
    nvCss2.rel = "stylesheet";
    nvCss2.href = `${assetUrl}/css/nivo-lightbox/default.css`;
    document.head.appendChild(nvCss2);

    // const jqScript = document.createElement("script");
    // jqScript.src = `${assetUrl}/js/jquery.1.11.1.js`;
    // jqScript.async = true;
    // document.body.appendChild(jqScript);

    // const bsScript = document.createElement("script");
    // bsScript.src = `${assetUrl}/js/bootstrap.js`;
    // bsScript.async = true;
    // document.body.appendChild(bsScript);

    return () => {
      document.head.removeChild(landingCss);
      document.head.removeChild(bsCss);
      document.head.removeChild(nvCss);
      document.head.removeChild(nvCss2);
      // document.body.removeChild(jqScript);
      // document.body.removeChild(bsScript);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <Navigation />
          <Header data={landingPageData.Header} />
          <Features data={landingPageData.Features} />
          <Services data={landingPageData.Services} />
          <Gallery data={landingPageData.Gallery} phoneNumber={phoneNumber} />
          <About data={landingPageData.About} />
          <Contact data={landingPageData.Contact} />
        </>
      )}
    </div>
  );
};

export default LandingPage;
