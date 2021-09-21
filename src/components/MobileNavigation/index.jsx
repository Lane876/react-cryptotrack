import React, { useEffect, useState } from "react";
import "./MobileNavigation.scss";
import { Rotate } from "hamburger-react";
import { Link } from "react-router-dom";

const MobileNavigation = () => {
  const [isOpen, setIsopen] = useState(false);

  const classes = isOpen ? "Menu__open" : "Menu__close";

  useEffect(() => {
    if (isOpen) {
      const body = document.body;
      body.style.overflowY = "hidden";
    } else {
      const body = document.body;
      body.style.overflowY = "visible";
    }
  }, [isOpen]);

  return (
    <div>
      <Rotate toggled={isOpen} toggle={setIsopen} color="white" />

      <div className={classes}>
        <Link to="/cryptocurrencies" className="link">
          Cryptocurrencies
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

export default MobileNavigation;
