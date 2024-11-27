<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotificationListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        $url = env('LINK_NOTIFICATION');
        // Gửi POST request với dữ liệu từ sự kiện Chat
        Http::post($url, [
            'message' => $event->message,
        ]);
    }
}
