#!/bin/bash

# Navigate to the back-end folder
cd ./chat_room || { echo "Error: Backend folder ("char_room") not found!"; exit 1; }

# Run npm start for the back end  in the background
npm start &

# Check if successfully ran back-end
if [ $? -ne 0]; then
    echo "Error: Failed to start back end!"
    exit 1
fi

# Navigate to the front-end folder
cd ../chat_room_react ||
    { echo "Error: Frontend folder ("chat_room_react") not found"; exit 1; }

# Run npm start for the front end in the foreground
npm start

# Check if successfully ran front-end
if [ $? -ne 0]; then
    echo "Error: Failed to start front end!"
    exit 1
fi

exit 0