#!/bin/bash
echo "Starting MongoDB restore..."

mongorestore --host mongodb --port 27017 --dir /data/db/dump --drop

echo "MongoDB restore completed!"
