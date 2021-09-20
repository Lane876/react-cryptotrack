import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  AiOutlineMoneyCollect,
  AiOutlineDollarCircle,
  AiOutlineFund,
  AiOutlineExclamationCircle,
  AiOutlineStop,
  AiOutlineTrophy,
  AiOutlineCheckCircle,
  AiOutlineNumber,
  AiOutlineThunderbolt,
} from "react-icons/ai";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import LineChart from "../LineChart";
import "./CryptoDetails.scss";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return "Loading...";

  const time = ["24h", "7d", "30d", "1y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <AiOutlineDollarCircle />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <AiOutlineNumber /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <AiOutlineThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <AiOutlineDollarCircle />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <AiOutlineTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <AiOutlineFund />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <AiOutlineMoneyCollect />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <AiOutlineCheckCircle />
      ) : (
        <AiOutlineStop />
      ),
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <AiOutlineExclamationCircle />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <AiOutlineExclamationCircle />,
    },
  ];

  return (
    <div className="CoinDetail">
      <div className="coin-heading-container">
        <h4 className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
        </h4>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </div>
      <select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(e) => setTimeperiod(e.target.value)}
      >
        {time.map((date) => (
          <option key={date}>{date}</option>
        ))}
      </select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <div className="stats-container">
        <div className="coin-value-statistics">
          <div className="coin-value-statistics-heading">
            <h4 className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </h4>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          {stats.map(({ icon, title, value }) => (
            <div className="coin-stats" key={value}>
              <div className="coin-stats-name">
                <p>{icon}</p>
                <p>{title}</p>
              </div>
              <h4 className="stats">{value}</h4>
            </div>
          ))}
        </div>
        <div className="other-stats-info">
          <div className="coin-value-statistics-heading">
            <h4 className="coin-details-heading">Other Stats Info</h4>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          {genericStats.map(({ icon, title, value }) => (
            <div className="coin-stats">
              <div className="coin-stats-name">
                <p>{icon}</p>
                <p>{title}</p>
              </div>
              <p className="stats">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="coin-desc-link">
        <div className="coin-desc">
          <h4 className="coin-details-heading">
            What is {cryptoDetails.name}?
          </h4>
          {HTMLReactParser(cryptoDetails.description)}
        </div>
        <div className="coin-links">
          <h4 className="coin-details-heading">{cryptoDetails.name} Links</h4>
          {cryptoDetails.links?.map((link) => (
            <div className="coin-link" key={link.name}>
              <h4 className="link-name">{link.type}</h4>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
