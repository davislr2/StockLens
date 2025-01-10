import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';


const socket = io('http://localhost:5000');

const StockStream = () => {
    const [stocks, setStocks] = useState([]);
    useEffect(() => {
        socket.on("stock_update", (data) => {
            setStocks((prevStocks) => [data, ...prevStocks.slice(0,9)]);
        });

        return () => {
            socket.off("stock_update");
        };
    }, []);
    
    return (
       <div>
            <h2>Live Stock Prices</h2>
            <ul>
                {stocks.map((stock,index) => (
                    <li key={index}>
                        <strong>{stock.ticker}</strong>: ${stock.price} at {" "}{console.log("Ticker:" + stock.ticker)}
                        {new Date(stock.timestamp*1000).toLocaleTimeString()}
                    </li>
                ))}
            </ul>    
       </div> 
    );

};

export default StockStream;