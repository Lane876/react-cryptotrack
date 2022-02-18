import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
// import Exchanges from "./components/Exchanges";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import News from "./components/News";

import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Navbar">
          <Header />
        </div>
        <div className="Main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            {/* <Route path="/exchanges" element={<Exchanges />} /> */}
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
