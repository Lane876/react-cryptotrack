import React, { useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../../services/cryptoApi";

import "./News.scss";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  if (!cryptoNews?.value) return "Loading...";
  return (
    <div className={!simplified ? "NewsContainer" : ""}>
      {!simplified && (
        <div className="Select">
          <select
            showSearch
            className="Select__select"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(e) => setNewsCategory(e.target.value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <option value="Cryptocurency">Cryptocurrency</option>
            {data?.data?.coins?.map((currency) => (
              <option value={currency.name}>{currency.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className={!simplified ? "SNews" : "News"}>
        {cryptoNews.value.map((news, i) => (
          <div key={i} className="News__container">
            <div className="News__container--card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="News__container--card--header">
                  <div
                    className="News__container--card--header--title"
                    level={4}
                  >
                    {news.name}
                  </div>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="News__container--card--provider">
                  <div className="News__container--card--provider--img">
                    <img
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <h4 className="provider-name">{news.provider[0]?.name}</h4>
                  </div>
                  <p>{moment(news.datePublished).startOf("ss").fromNow()}</p>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
