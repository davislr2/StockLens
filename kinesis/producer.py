import yfinance as yf
import time
import boto3
import json

# Initialize the AWS Kinesis Client
kinesis = boto3.client('kinesis', region_name='us-east-1')


def fetch_price(ticker):
    stock = yf.Ticker(ticker)
    price = stock.history(period='1d')['Close'].iloc[-1]
    return price

def send_to_kinesis(ticker):
    price = fetch_price(ticker)
    record = {'ticker': ticker, 'price': price, 'timestamp': time.time()}
    kinesis.put_record(StreamName='stock-price-stream', Data=json.dumps(record), PartitionKey=ticker)

    print(f"Sent {ticker} price to Kinesis: {price}")

if __name__ == '__main__':
    while True:
        send_to_kinesis('TSLA')
        time.sleep(10)