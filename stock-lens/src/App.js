import logo from './logo.svg';
import './App.css';
//import StockStream from './components/StockStream.js'
import TradingViewWidget from './components/TradingViewWidget.jsx'

function App() {
  return (
      <div className="App">
        <div id='container'>
          <h1>Real-Time Stock Tracker</h1>
          {/*<StockStream />*/}
          <div id='trade-view-widget'>
            <TradingViewWidget />
          </div>
        </div>
      </div>
  );
}

export default App;
