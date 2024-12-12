<?php

namespace App\Events;

//use Illuminate\Broadcasting\Channel;
//use Illuminate\Broadcasting\InteractsWithSockets;
//use Illuminate\Broadcasting\PresenceChannel;
//use Illuminate\Broadcasting\PrivateChannel;
//use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
//use Illuminate\Foundation\Events\Dispatchable;
//use Illuminate\Queue\SerializesModels;

//use Illuminate\Broadcasting\Channel;
//use Illuminate\Broadcasting\InteractsWithSockets;
//use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
//use Illuminate\Foundation\Events\Dispatchable;
//use Illuminate\Queue\SerializesModels;

//namespace App\Events;
//
//use Illuminate\Broadcasting\Channel;
//use Illuminate\Broadcasting\InteractsWithSockets;
//use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
//use Illuminate\Foundation\Events\Dispatchable;
//use Illuminate\Queue\SerializesModels;
//
//class NotificationsEvent implements ShouldBroadcast
//{
//    use Dispatchable, InteractsWithSockets, SerializesModels;
//
//    public $ids;
//
//    public function __construct($ids)
//    {
//        $this->ids = $ids;
//    }
//
//    // Phát sự kiện lên kênh Notifications
//    public function broadcastOn()
//    {
//        return new Channel('Notifications');  // Chỉ trả về kênh 'Notifications'
//    }
//
//    // Dữ liệu sự kiện sẽ được truyền đi khi phát
//    public function broadcastWith()
//    {
//        return ['message' => $this->ids];  // Truyền dữ liệu vào sự kiện
//    }
//}

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class NotificationsEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $ids;

    /**
     * Create a new event instance.
     */
    public function __construct($ids)
    {
        $this->ids = array_map('strval', $ids);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function broadcastOn()
    {
        return new Channel('Notifications');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function broadcastAs()
    {
        return 'Notifications';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'ids' =>  json_encode($this->ids)
        ];
    }
}
