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
          <div key={i}>
            <motion.div
              className="Exchanges__list--card"
              key={i}
              onClick={() => handleClick(i)}
              initial={false}
              animate={{
                backgroundColor:
                  isOpen && i === index ? "rgb(171, 171, 171)" : "#fff",
              }}
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
            </motion.div>
            <AnimatePresence initial={false}>
              {isOpen && index === i && (
                <motion.section
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="description"
                >
                  <motion.div
                    variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
                    transition={{ duration: 0.8 }}
                  >
                    {HTMLReactParser(exchange.description || "")}
                  </motion.div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
