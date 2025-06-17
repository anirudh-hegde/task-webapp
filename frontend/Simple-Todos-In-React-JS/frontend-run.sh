#!/bin/bash

set -e
# --- FRONTEND SETUP ---
echo "🌐 Starting React frontend..."

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  npm install
fi

# Start frontend
npm start

