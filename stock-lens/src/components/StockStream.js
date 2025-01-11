import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import '../styles/StockStream.css';

const socket = io('http://localhost:5000');

const StockStream = () => {
    const [stocks, setStocks] = useState({}); // Use an object instead of an array

    useEffect(() => {
        socket.on("stock_update", (data) => {
            setStocks((prevStocks) => ({
                ...prevStocks, 
                [data.ticker]: data  // ✅ Update stock price by ticker
            }));
        });

        return () => {
            socket.off("stock_update");
        };
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
