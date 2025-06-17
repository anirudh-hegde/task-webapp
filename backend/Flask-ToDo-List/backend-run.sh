#!/bin/bash

set -e

pip install -r requirements.txt

if ! command -v opentelemetry-instrument >/dev/null 2>&1; then
  echo "OpenTelemetry instrumentation not found. Installing now..."
  opentelemetry-bootstrap --action=install
else
  echo "OpenTelemetry instrumentation is already installed."
fi

# --- BACKEND SETUP ---
echo "🔧 Starting Flask backend with OpenTelemetry..."

# Set environment variables for OTel
export OTEL_RESOURCE_ATTRIBUTES="service.name=flask-app-backend" 
export OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.in.signoz.cloud:443" 
export OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=e9bfcba0-a5a1-4d45-b2d5-38d332625ac8" 
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true 

pip install -r requirements.txt
# Start backend in background
opentelemetry-instrument python3 app.py
