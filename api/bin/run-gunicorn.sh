#!/usr/bin/env bash

echo "Starting gunicorn..."
cd ./lojibackend
exec gunicorn lojibackend.wsgi:application \
    --bind 0.0.0.0:8090 \
    --workers 2
