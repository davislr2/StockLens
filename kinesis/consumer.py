import boto3
import json
import time
from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


# Initialize the AWS Kinesis Client
kinesis = boto3.client('kinesis', region_name='us-east-1')

def stream_kinesis_data():
    # Repeatedly fetch stock data from Kinesis and send it to frontend via WebScoket
    response = kinesis.get_shard_iterator(
        StreamName='stock-price-stream',
        ShardId="shardId-000000000000",
        ShardIteratorType="LATEST"
    )
    
    shard_iterator=response["ShardIterator"]

    while True:
        # Get actual response from kinesis
        records_response = kinesis.get_records(ShardIterator=shard_iterator, Limit=10)

        # Load each line from kinesis
        for record in records_response["Records"]:
            data = json.loads(record["Data"])
            socketio.emit("stock_update", data)

        shard_iterator = records_response["NextShardIterator"]
        time.sleep(3)

@app.route("/")
def index():
    return "Stock Stream Server Running"

if __name__ == "__main__":
    socketio.start_background_task(target=stream_kinesis_data)
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
