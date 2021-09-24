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

  return (
    <div className="Exchanges">
      <div className="Exchanges__list">
        {exchangesList.map((exchange, i) => (
          <motion.div
            key={i}
            className="Exchanges__list--container"
            onClick={() => handleClick(i)}
          >
            <div className="Exchanges__list--container--card">
              <div className="Exchanges__list--container--card--header">
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
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { height: "auto" },
                    collapsed: { height: 0 },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  style={{ overflow: "hidden" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div className="description">
                    {HTMLReactParser(exchange.description || "")}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
