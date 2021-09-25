import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Cryptocurrencies from "../Cryptocurrencies";
import News from "../News";
import Loader from "../Loader";
import { HiArrowNarrowRight } from "react-icons/hi";

import "./HomePage.scss";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    <div className="HomePage">
      <h2 className="HomePage__crypto--heading">Global Crypto Stats</h2>
      <div className="HomePage__stats">
        <div>Total Cryptocurrencies: {globalStats.total}</div>
        <div>Total Exchanges: {millify(globalStats.totalExchanges)}</div>
        <div>Total Market Cap: {`$${millify(globalStats.totalMarketCap)}`}</div>
        <div>Total 24h Volume: {`$${millify(globalStats.total24hVolume)}`}</div>
        <div>Total Markets: {millify(globalStats.totalMarkets)}</div>
      </div>

      <div className="HomePage__crypto">
        <h2 className="HomePage__crypto--heading">
          Top 10 Cryptos In The World
        </h2>
        <Link
          to="/cryptocurrencies"
          className="HomePage__crypto--heading--link"
        >
          <span style={{ marginRight: ".5rem" }}>show more</span>{" "}
          <HiArrowNarrowRight size="25" color="#f79256" />
        </Link>
      </div>
      <Cryptocurrencies simplified />
      <div className="HomePage__crypto">
        <h2 className="HomePage__crypto--heading">Latest Crypto News</h2>
        <Link to="/news" className="HomePage__crypto--heading--link">
          <span style={{ marginRight: ".5rem" }}>show more</span>{" "}
          <HiArrowNarrowRight size="25" color="#f79256" />
        </Link>
      </div>
      <News simplified />
    </div>
  );
};

export default Homepage;
