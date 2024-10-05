import React, { useState } from "react";
import WebSocketChart from './WebSocketChart.jsx';
import CoinToggle from "./CoinToggle";

const App = () => {
  const [symbol, setSymbol] = useState("ethusdt");
  const [interval, setInterval] = useState("1m");

  return (
    <div>
      <h1>Binance Market Data</h1>
      <CoinToggle setSymbol={setSymbol} />
      <select onChange={(e) => setInterval(e.target.value)}>
        <option value="1m">1 Minute</option>
        <option value="3m">3 Minutes</option>
        <option value="5m">5 Minutes</option>
      </select>
      <WebSocketChart symbol={symbol} interval={interval} />
    </div>
  );
};

export default App;
