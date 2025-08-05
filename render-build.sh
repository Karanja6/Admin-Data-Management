#!/bin/bash

echo "🔧 Starting build with render-build.sh"

# Check if vite is accessible
if ! command -v vite &> /dev/null; then
    echo "⚠️  Vite not found globally, using npx..."
    npx vite build
else
    echo "✅ Using globally installed Vite..."
    vite build
fi

# Confirm output
if [ -d "dist" ]; then
    echo "🎉 Build successful!"
    ls -la dist/
else
    echo "❌ Build failed: 'dist/' directory not found"
    exit 1
fi
