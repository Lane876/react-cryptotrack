import React from "react";
import "./Header.scss";
import logo from "../../images/blockchain.svg";
import { Link } from "react-router-dom";
import MobileNavigation from "../MobileNavigation";

const Header = () => {
  return (
    <div className="Header">
      <div className="Header__container">
        <Link to="/" className="Header__container--logo">
          <img src={logo} className="Header__container--logo--img" alt="logo" />
          <h3 style={{ marginLeft: "1rem" }}>CryptoTrack</h3>
        </Link>
        <div className="Header__container--links">
          {/* <Link to="/cryptocurrencies" className="link">
            Cryptocurrencies
          </Link>
          <Link to="/exchanges" className="link">
            Exchanges
          </Link>
          <Link to="/news" className="link">
            News
          </Link> */}

          <MobileNavigation />
        </div>
      </div>
    </div>
  );
};

export default Header;
