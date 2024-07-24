import SignInForm from "../components/auth/signin";
import SignUpForm from "../components/auth/signup";
import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Auth() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const assetUrl = process.env.REACT_APP_ASSET_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const authCss = document.createElement("link");
    authCss.rel = "stylesheet";
    authCss.href = `${assetUrl}/css/auth.css`;
    document.head.appendChild(authCss);

    return () => {
      document.head.removeChild(authCss);
    };
  }, [assetUrl]);

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
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
          <div className="App">
            <h1 className="light-text">Portal Usaha Mandiri Magelang</h1>
            <br />
            <div className={containerClass} id="container">
              <SignUpForm />
              <SignInForm />
              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>Selamat Datang Kembali, Teman!</h1>
                    <p>Untuk melanjutkan dengan akun yang ada.</p>
                    <button
                      className="ghost"
                      id="signIn"
                      onClick={() => handleOnClick("signIn")}
                    >
                      Masuk Sekarang
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>Halo Sobat, Belum punya akun?</h1>
                    <p>
                      Bergabung dengan kami di Usaha Mandiri Magelang untuk
                      mengeksplor berbagai macam produk yang kami sediakan
                    </p>
                    <button
                      className="ghost "
                      id="signUp"
                      onClick={() => handleOnClick("signUp")}
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
