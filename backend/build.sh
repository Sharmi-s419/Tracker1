#!/usr/bin/env bash
# Exit on error
set -o errexit

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
echo "Installing Python requirements..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Applying database migrations..."
python manage.py migrate

<<<<<<< HEAD
echo "Build completed successfully!"
=======
echo "Build completed successfully!"
=======
# Install Python requirements
pip install -r requirements.txt

# Collect static files for WhiteNoise
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate
>>>>>>> f1730d5570d481d6b12e9012a831895b47ab94f1
>>>>>>> 6a43f53b1ed3a28ca4e61ef2d1ee435bcc3e170f
