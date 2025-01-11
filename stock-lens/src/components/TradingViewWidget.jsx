import React, { useEffect, useRef, memo } from 'react';
import '../styles/TradingViewWidget.css';

function TradingViewWidget() {
  const container = useRef(null);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;

    // Create a new div element to hold the script
    const scriptContainer = document.createElement('div');
    scriptContainer.id = "tradingview-widget-container";
    currentContainer.appendChild(scriptContainer);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "NASDAQ:AAPL",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;

    scriptContainer.appendChild(script);


    return () => {
      // Cleanup the script and script container
      if (scriptContainer.contains(script)) {
        scriptContainer.removeChild(script);
      }
      if (currentContainer.contains(scriptContainer)) {
        currentContainer.removeChild(scriptContainer);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);