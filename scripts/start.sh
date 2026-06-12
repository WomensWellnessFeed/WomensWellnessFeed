#!/bin/sh
node backend/server.js &
BACKEND_PID=$!
trap "kill $BACKEND_PID 2>/dev/null" EXIT INT TERM
expo start
