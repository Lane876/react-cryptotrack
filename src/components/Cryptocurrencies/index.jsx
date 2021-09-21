import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";

import "./Cryptocurrencies.scss";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";
  return (
    <div className={!simplified ? "Crypto" : ""}>
      {!simplified && (
        <div className="Crypto__search">
          <input
            placeholder="Search Cryptocurrency..."
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <div className="Currencies__container">
        {cryptos?.map((currency) => (
          <div className="Currencies__container--card" key={currency.id}>
            <Link
              key={currency.id}
              to={`/crypto/${currency.id}`}
              className="Currencies__container--card--link"
            >
              <div className="Currencies__container--card--link--container">
                <div className="Currencies__container--card--link--container--header">
                  <h4>{`${currency.rank}. ${currency.name}`}</h4>
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="crypto"
                    style={{ width: "40px", height: "40px" }}
                  />
                </div>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
