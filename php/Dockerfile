# Dockerfile

FROM php:8.1-cli

# Set working directory
WORKDIR /var/www

# Install necessary extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    pkg-config

# Install MongoDB extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy composer files
COPY composer.json composer.lock /var/www/

# Install PHP dependencies
RUN composer install --no-scripts --no-autoloader

# Copy existing application directory contents
COPY . /var/www

# Run composer again to generate autoload files
# RUN composer dump-autoload --optimize

# Expose port 8000 and start php artisan serve
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
