<?php

namespace App\Providers;

use App\Events\NotificationsEvent;
use App\Events\ResetCacheEvent;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;
use MongoDB\Laravel\Eloquent\Model;

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

        $events = ['created', 'updated', 'deleted'];

        // Quét thư mục chứa model
        $modelPath = app_path('Models');
        $modelFiles = File::allFiles($modelPath);

        foreach ($modelFiles as $file) {
            $className = 'App\\Models\\' . $file->getFilenameWithoutExtension();
            if (class_exists($className)) {
                // Kiểm tra xem model có kế thừa Eloquent hay không
                if (is_subclass_of($className, \Illuminate\Database\Eloquent\Model::class)) {
                    foreach ($events as $event) {
                        // Đăng ký sự kiện cho model
                        $className::registerModelEvent($event, function ($model) use ($event) {
                            $modelName = class_basename($model);
                            // Gửi sự kiện reset cache
                            event(new ResetCacheEvent([$modelName]));
//                            \Log::info('Reset cache for model: ' . $modelName);
                        });
                    }
                }
            }
        }

    }
}
