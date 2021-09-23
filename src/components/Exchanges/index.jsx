import React from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useGetExchangesQuery } from "../../services/cryptoApi";
import Loader from "../Loader";
import "./Exchanges.scss";

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  const [isOpen, setIsopen] = useState(false);
  const [index, setIndex] = useState(null);

  if (isFetching) return <Loader />;

  const handleClick = (i) => {
    setIsopen(!isOpen);
    setIndex(i);
  };

  const transitionVariant = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      // y: 0,
      opacity: 1,
      transition: {
        // delay: 0.1,
        // type: "spring",
        y: 0,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div className="Exchanges">
      <div className="Exchanges__list">
        {exchangesList.map((exchange, i) => (
          <div key={i}>
            <div
              className="Exchanges__list--card"
              key={i}
              onClick={() => handleClick(i)}
            >
              <div className="Exchanges__list--card--header">
                <strong style={{ marginRight: "1rem" }}>
                  {exchange.rank}.
                </strong>
                <img
                  className="exchange-image"
                  src={exchange.iconUrl}
                  style={{ width: "30px", height: "30px", marginRight: "1rem" }}
                  alt="avatar"
                />
                <strong>{exchange.name}</strong>
              </div>

              <div>24h Trade Volume: ${millify(exchange.volume)}</div>
              <div>Markets: {millify(exchange.numberOfMarkets)}</div>
              <div>Change: {millify(exchange.marketShare)}%</div>
            </div>
            <AnimatePresence>
              {isOpen && index === i && (
                <motion.div
                  variants={transitionVariant}
                  animate="visible"
                  initial="hidden"
                  exit="exit"
                  className="description"
                >
                  {HTMLReactParser(exchange.description || "")}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
