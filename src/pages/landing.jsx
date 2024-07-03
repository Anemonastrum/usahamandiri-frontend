import React, { useState, useEffect } from "react";
import { Navigation } from "../components/navigation";
import { Header } from "../components/header";
import { Features } from "../components/features";
import { About } from "../components/about";
import { Services } from "../components/services";
import { Gallery } from "../components/gallery";
import { Contact } from "../components/contact";
import JsonData from "../data/data.json";

const LandingPage = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <About data={landingPageData.About} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default LandingPage;
