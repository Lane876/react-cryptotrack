import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="Footer">
      <h3 style={{ color: "white", textAlign: "center" }}>
        Copyright © {new Date().getFullYear()}{" "}
        <Link to="/" className="link">
          CryptoTrack Inc.
        </Link>{" "}
        <br />
        All Rights Reserved.
      </h3>
      <div className="Footer__links">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/exchanges" className="link">
          Exchanges
        </Link>
        <Link to="/news" className="link">
          News
        </Link>
      </div>
    </div>
  );
};

export default Footer;
