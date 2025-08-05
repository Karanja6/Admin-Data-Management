#!/bin/bash

# Set Node.js version
export NODE_VERSION=18.0.0

# Install dependencies
npm install

# Build the project
npm run build

# Verify build output
if [ -d "dist" ]; then
    echo "Build successful! Files in dist directory:"
    ls -la dist/
else
    echo "Build failed - dist directory not found"
    exit 1
fi 