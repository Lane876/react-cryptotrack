import React, { useEffect, useState } from "react";
import "./Header.scss";
import logo from "../../images/blockchain.svg";
import { Link } from "react-router-dom";
import SideMenu from "../SideMenu";

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [width]);

  return (
    <div className="Header">
      <div className="Header__container">
        <Link to="/" className="Header__container--logo">
          <img src={logo} className="Header__container--logo--img" alt="logo" />
          <h3 style={{ marginLeft: "1rem" }}>CryptoTrack</h3>
        </Link>
        <div className="Header__container--links">
          {width > 800 ? (
            <>
              <Link to="/cryptocurrencies" className="link">
                Cryptocurrencies
              </Link>
              <Link to="/exchanges" className="link">
                Exchanges
              </Link>
              <Link to="/news" className="link">
                News
              </Link>
            </>
          ) : (
            <SideMenu />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
