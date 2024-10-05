import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WebSocketChart = ({ symbol, interval }) => {
  const [chartData, setChartData] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem(`${symbol}-${interval}`);
    if (storedData) {
      setChartData(JSON.parse(storedData));
    }

    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
    const newWs = new WebSocket(wsUrl);

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { k } = data;  // k contains the candlestick data
      const newChartData = [
        ...chartData, 
        { open: k.o, high: k.h, low: k.l, close: k.c, time: k.t }
      ];
      setChartData(newChartData);
      localStorage.setItem(`${symbol}-${interval}`, JSON.stringify(newChartData));
    };

    setWs(newWs);

    return () => {
      newWs.close();  // Clean up the WebSocket when the component unmounts
    };
  }, [symbol, interval]);

  const data = {
    labels: chartData.map(data => new Date(data.time).toLocaleTimeString()),
    datasets: [{
      label: `${symbol} Price`,
      data: chartData.map(data => data.close),
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    }]
  };

  return <Line key={`${symbol}-${interval}`} data={data} />;
};

export default WebSocketChart;
