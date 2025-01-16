import React, { useEffect, useState } from 'react';


const StockStream = () => {
    const [stocks, setStocks] = useState({});

    useEffect(() => {
        const API_URL = 'https://7zb05ivko0.execute-api.us-east-1.amazonaws.com/Stage1';

        const fetchStockData = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any necessary authentication headers here
                        // 'x-api-key': 'your-api-key',  // If using API Key
                        // 'Authorization': 'Bearer your-token',  // If using bearer token
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStocks(data);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStockData();
        const interval = setInterval(fetchStockData, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="stock-prices-container">
            <h2 id="stock-prices-header">Live Stock Prices</h2>
            <ul id="stock-prices-list">
                {Object.values(stocks).map(stock => (
                    <li key={stock.ticker} className="stock-price-list-item">
                        <strong>{stock.ticker}</strong>: ${stock.price.toFixed(2)} at {new Date(stock.timestamp * 1000).toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockStream;
