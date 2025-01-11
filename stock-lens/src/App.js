import logo from './logo.svg';
import './App.css';
import StockStream from './components/StockStream.js'
import TradingViewWidget from './components/TradingViewWidget.jsx'

function App() {
  return (
      <div className="App">
        <h1>Real-Time Stock Tracker</h1>
        <div id='container'>
          <StockStream />
          <TradingViewWidget />
        </div>
      </div>
  );
}

export default App;
