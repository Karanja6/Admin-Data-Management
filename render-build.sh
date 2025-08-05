#!/bin/bash

# Set Node.js version explicitly
export NODE_VERSION=20.0.0

# Install dependencies
npm install

# Check if vite is accessible
if ! command -v vite &> /dev/null; then
    echo "Vite not found in PATH, trying npx..."
    npx vite build
else
    echo "Using system vite..."
    vite build
fi

# Verify build output
if [ -d "dist" ]; then
    echo "Build successful!"
    ls -la dist/
else
    echo "Build failed - dist directory not found"
    exit 1
fi 