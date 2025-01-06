import boto3
import json
import time

# Initialize the AWS Kinesis Client
kinesis = boto3.client('kinesis', region_name='us-east-1')

# Shard Iterator
response = kinesis.get_shard_iterator(
    StreamName="stock-price-stream",
    ShardId="shardId-000000000000",
    ShardIteratorType="LATEST"
)

shard_iterator = response['ShardIterator']

while True:
    records_response = kinesis.get_records(ShardIterator=shard_iterator, Limit=10)

    for record in records_response["Records"]:
        data = json.loads(record["Data"])
        print(f"Received {data['ticker']} price from Kinesis: {data['price']}")

    shard_iterator = records_response["NextShardIterator"]
    time.sleep(5)
