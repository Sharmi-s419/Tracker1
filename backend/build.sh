#!/usr/bin/env bash
# Render Build Script for Hotel Lara International Django Backend
set -o errexit

echo "Installing Python requirements..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Applying database migrations..."
python manage.py migrate

echo "Build completed successfully!"
