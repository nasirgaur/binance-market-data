import React from 'react';

const CoinToggle = ({ setSymbol }) => {
  return (
    <select onChange={(e) => setSymbol(e.target.value)}>
      <option value="ethusdt">ETH/USDT</option>
      <option value="bnbusdt">BNB/USDT</option>
      <option value="dotusdt">DOT/USDT</option>
    </select>
  );
};

export default CoinToggle;
