# Use the official PHP image as the base image
FROM php:8.1-cli

# Set working directory
WORKDIR /app

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install the MongoDB PHP extension
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the application code
COPY . .

# Run Composer install
RUN composer install

# Run Laravel commands
ENTRYPOINT ["sh", "-c", "php artisan migrate && php artisan db:seed && php artisan cache:clear && php artisan serve --host=0.0.0.0 --port=8000"]
