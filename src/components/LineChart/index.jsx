import React from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.scss";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="Chart">
        <h4 className="Chart__title">{coinName} Price Chart </h4>
        <div className="Chart__price--container">
          <h4 className="Chart__price--container--price">
            Change: {coinHistory?.data?.change}%
          </h4>
          <h4 className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </h4>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
