#!/bin/bash

# start backend index server
python ./index_server.py &

# wait for the server to start - if creating a brand new huge index, on startup, increase this further
sleep 60

# start the flask server
# python ./flask_demo.py
gunicorn --workers 2 --bind 0.0.0.0:5601 flask_demo:app
