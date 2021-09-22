import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const links = ["Cryptocurrencies", "Exchange", "News"];
const to = ["/cryptocurrencies", "/exchanges", "/news"];

export const MenuItem = ({ i, toggle }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to[i]}
        style={{ textDecoration: "none", color: "black", marginLeft: "3rem" }}
        onClick={toggle}
      >
        {links[i]}
      </Link>
    </motion.li>
  );
};
