import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import Exchanges from "./components/Exchanges";
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
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/cryptocurrencies"
              exact
              component={Cryptocurrencies}
            />
            <Route path="/exchanges" exact component={Exchanges} />
            <Route path="/crypto/:coinId" exact component={CryptoDetails} />
            <Route path="/news" exact component={News} />
          </Switch>
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
