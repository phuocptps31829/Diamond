<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;
class PusherController extends Controller
{

    public function auth(Request $request)
    {

        $socketId = $request->input('socket_id');
        if (!$socketId) {
            return response()->json(['error' => 'Socket ID is missing'], 400);
        }

        $channel = 'presence-chat';

        $channelData = json_encode(['user_id' => 'guest', 'user_info' => ['name' => 'Guest']]);

        $authSignature = hash_hmac('sha256', "$socketId:$channel:$channelData", '37a9cc036054975d6710');
        $authResponse = "4f34585cce71129804f7:{$authSignature}";
        return response()->json([
            'auth' => $authResponse,
            'channel_data' => $channelData,
        ]);
    }
}
