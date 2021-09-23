import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rotate } from "hamburger-react";

import "./SideMenu.css";

const SideMenu = () => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarData = [
    { title: "Cryptocurrencies", path: "/cryptocurrencies", cName: "nav-text" },
    { title: "Exchanges", path: "/exchanges", cName: "nav-text" },
    { title: "News", path: "/news", cName: "nav-text" },
  ];

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    if (sidebar) {
      const body = document.body;
      body.style.overflowY = "hidden";
    } else {
      const body = document.body;
      body.style.overflowY = "visible";
    }
  }, [sidebar]);
  return (
    <>
      <Rotate color="white" toggled={sidebar} toggle={setSidebar} />
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <div className="nav-menu-items">
          {sidebarData.map((item, index) => {
            return (
              <div key={index} className={item.cName}>
                <Link to={item.path} onClick={showSidebar}>
                  <span>{item.title}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
