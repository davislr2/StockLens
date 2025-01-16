import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StockStream.css';

const API_URL = "https://ekaedtgx37.execute-api.us-east-1.amazonaws.com/prod/stocks"; 

const StockStream = () => {
    const [stocks, setStocks] = useState({});

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log("Stock data:", response.data); // Log the structure of response.data

                // Check if response.data is an array
                if (Array.isArray(response.data)) {
                    const stockData = response.data.reduce((acc, stock) => {
                        acc[stock.ticker] = stock;
                        return acc;
                    }, {});
                    setStocks(stockData);
                } else {
                    console.error("Expected an array but got:", response.data);
                }
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStocks();
        const interval = setInterval(fetchStocks, 5000); // Refresh data every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
       <div id="stock-prices-container">
            <h2 id="stock-prices-header">Live Stock Prices</h2>
            <ul id="stock-prices-list">
                {Object.values(stocks).map((stock) => (
                    <li key={stock.ticker} className="stock-price-list-item">
                        <strong>{stock.ticker}</strong>: ${stock.price.toFixed(2)} at {new Date(stock.timestamp * 1000).toLocaleTimeString()}
                    </li>
                ))}
            </ul>    
       </div> 
    );
};

export default StockStream;
