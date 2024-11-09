<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Events\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;
class ChatController extends Controller
{public function getChatRooms()
{
    $rooms = Redis::keys('chat:room:*:messages');
    $data = [];

    foreach ($rooms as $roomKey) {
        $roomId = str_replace(['chat:room:', ':messages'], '', $roomKey);
        $unreadCount = Redis::get("chat:room:{$roomId}:unread_count");

        $data[] = [
            'room_id' => $roomId,
            'unread_count' => $unreadCount ?: 0,
        ];
    }

    return response()->json($data);
}
    public function messageReceived(Request $request)
    {
        $rules = [
            'room_id' => 'required',
            'user' => 'required',
            'message' => 'required',
        ];

        $request->validate($rules);

        // Lưu tin nhắn vào Redis
        Redis::rpush("chat:room:{$request->room_id}:messages", json_encode([
            'user' => $request->user,
            'message' => $request->message,
            'timestamp' => now(),
        ]));

        // Tăng số lượng tin nhắn chưa đọc cho phòng chat
        Redis::incr("chat:room:{$request->room_id}:unread_count");

        // Phát sự kiện tới room này để mọi người nhận được tin nhắn
        broadcast(new MessageSent($request->room_id, $request->user, $request->message));

        return response()->json('Message broadcasted');
    }
    public function createRoom(Request $request)
    {
        $phone = $request->input('phone');
        $name = $request->input('name');

        // Tạo một ID phòng chat duy nhất, có thể là ID user hoặc UUID
        $roomId = 'room_' . uniqid();
        Redis::set("chat:room:{$roomId}:unread_count", 0);
        // Lưu phòng vào Redis
        Redis::hset("chat_rooms", $roomId, json_encode([
            'phone' => $phone,
            'name' => $name,
            'created_at' => now()->toDateTimeString()
        ]));

        // Trả về ID phòng cho người dùng
        return response()->json(['roomId' => $roomId]);
    }
    public function getRooms()
    {
        $rooms = Redis::hgetall("chat_rooms");

        // Chuyển dữ liệu về dạng array để hiển thị cho admin
        $roomList = [];
        foreach ($rooms as $id => $info) {
            $roomList[] = [
                'id' => $id,
                'info' => json_decode($info)
            ];
        }

        return response()->json($roomList);
    }
//    public function messageReceived(Request $request)
//    {
//        $rules = [
//            "user" => "required",
//            'message' => 'required',
//            'room_id' => 'required'
//        ];
//
//        $request->validate($rules);
//
//        $messageData = [
//            'user' => $request->user,
//            'message' => $request->message,
//            'timestamp' => now()->toDateTimeString()
//        ];
//
//        // Lưu tin nhắn vào Redis trong danh sách tin nhắn của phòng
//        Redis::rpush("chat_room:{$request->room_id}:messages", json_encode($messageData));
//
//        // Phát sự kiện đến kênh presence để thông báo có tin nhắn mới
//        broadcast(new MessageSent($request->room_id, $request->user, $request->message));
//
//        return response()->json('Message broadcasted');
//    }
    public function getMessages($room_id)
    {
        $messages = Redis::lrange("chat:room:{$room_id}:messages", 0, -1);

        $messages = array_map(function ($message) {
            return json_decode($message, true);
        }, $messages);

        return response()->json($messages);
    }
    public function sendMessage(Request $request)
    {
        $request->validate([
            'chat_room_id' => 'required|string',
            'message' => 'required|string',
        ]);

        // Lưu tin nhắn vào Redis để giữ lại lịch sử
        Redis::rpush("chat_room:{$request->chat_room_id}:messages", $request->message);

        // Phát tin nhắn mới đến Pusher
        broadcast(new MessageSent($request->chat_room_id, $request->message))->toOthers();

        return response()->json('Message sent');
    }
    public function deleteRoom($roomId)
    {
        // Xóa phòng khỏi Redis
        Redis::hdel("chat_rooms", $roomId);

        // Xóa tất cả tin nhắn của phòng
        Redis::del("chat_room:{$roomId}:messages");

        return response()->json('Room deleted');
    }
//    public function messageReceived(Request $request)
//    {
//        $rules = [
//            "user" => "required|string",
//            'message' => 'required|string',
//        ];
//
//        $request->validate($rules);
//
//        // Lấy thông tin user từ request
//        $user = $request->input('user');
//
//        // Phát sự kiện với thông tin user và message
//        broadcast(new MessageSent($user, $request->input('message')));
//
//        return response()->json('Message broadcast');
//    }
}
