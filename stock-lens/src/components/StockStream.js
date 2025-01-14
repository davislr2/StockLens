import React, { useEffect, useState } from 'react';

const API_URL = 'https://q31bo4hq5e.execute-api.us-east-1.amazonaws.com/default/';

const StockStream = () => {
    const [stocks, setStocks] = useState({});

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'omit', // or 'include' if your API requires credentials
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
        
                const updatedStocks = {};
                data.forEach(stock => {
                    updatedStocks[stock.ticker] = stock;
                });
        
                setStocks(updatedStocks);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        // Fetch stock data every 3 seconds
        const interval = setInterval(fetchStockData, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
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
