import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt1, HiX } from "react-icons/hi";

import "./SideMenu.scss";

const SideMenu = () => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarData = [
    { title: "Home", path: "/", cName: "nav-text" },
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
      <HiMenuAlt1 onClick={showSidebar} color="white" size="30" />
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {sidebar && (
          <Backdrop onClick={() => setSidebar(false)}>
            <motion.nav
              className="Nav"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: "200%" }}
              animate={{ x: "0", transition: { stiffness: 10 } }}
              exit={{ x: "200%" }}
            >
              <HiX
                className="Nav__close"
                onClick={showSidebar}
                color="white"
                size="30"
              />
              <div className="Nav__items">
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
            </motion.nav>
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
