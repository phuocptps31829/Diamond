<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $database = \DB::connection('mongodb')->getMongoDB();
        $collection = $database->selectCollection('OTP');
        $collection->createIndex(
            ['time' => 1],
            ['expireAfterSeconds' => 300]
        );
    }
}
