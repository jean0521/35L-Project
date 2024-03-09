#!/bin/bash

echo "Installing dependencies for backend..."
cd ./chat_room && npm install
echo "Installing dependencies for frontend..."
cd ../chat_room_react && npm install

exit 0