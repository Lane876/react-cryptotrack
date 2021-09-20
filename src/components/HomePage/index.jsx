import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Cryptocurrencies from "../Cryptocurrencies";
import News from "../News";

import "./HomePage.scss";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return "loading...";
  return (
    <div className="HomePage">
      <h2 className="HomePage__heading">Global Crypto Stats</h2>
      <div className="HomePage__stats">
        <div>Total Cryptocurrencies: {globalStats.total}</div>
        <div>Total Exchanges: {millify(globalStats.totalExchanges)}</div>
        <div>Total Market Cap: {`$${millify(globalStats.totalMarketCap)}`}</div>
        <div>Total 24h Volume: {`$${millify(globalStats.total24hVolume)}`}</div>
        <div>Total Markets: {millify(globalStats.totalMarkets)}</div>
      </div>

      <div className="HomePage__crypto">
        <h2 className="HomePage__heading">Top 10 Cryptos In The World</h2>
        <h2>
          <Link to="/cryptocurrencies" className="HomePage__heading">
            Show more
          </Link>
        </h2>
      </div>
      <Cryptocurrencies simplified />
      <div className="HomePage__crypto">
        <h2 className="HomePage__heading">Latest Crypto News</h2>
        <h2>
          <Link to="/news" className="HomePage__heading">
            Show more
          </Link>
        </h2>
      </div>
      <News simplified />
    </div>
  );
};

export default Homepage;
