<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Clinic;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Requests\BranchRequest;
use MongoDB\BSON\ObjectId;

/**
 * @OA\Post(
 *     path="/api/v1/notifications/update/is-read/{notificationId}",
 *     summary="Mark notification as read",
 *     description="Mark the specified notification as read based on its ID.",
 *     tags={"Notifications"},
 *     @OA\Parameter(
 *         name="notificationId",
 *         in="path",
 *         required=true,
 *         description="The ID of the notification to be marked as read.",
 *         @OA\Schema(
 *             type="string",
 *             example="6745ee2b43032a8d4e001642"
 *         )
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *        @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 required={"OTP", "otpToken"},
 *                 @OA\Property(property="otpToken", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmdWxsTmFtZSI6InBoYW4gdHJcdTFlY2RuZyBwaFx1MDFiMFx1MWVkYmMgMiIsInBob25lTnVtYmVyIjoiMDM2NDg0MjY1NCIsInBhc3N3b3JkIjoiMTIzNDU2IiwiZXhwaXJlc0luIjoxNzMzMDIxNDM4fQ.g59D5pB_Csatkm8C3zMGspUMqmVyN4705dPQ9Lhtd-A"),
 *                 @OA\Property(property="OTP", type="integer", example=123456)
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Notification marked as read successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Notification updated successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid notification ID or OTP",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid notification ID or OTP")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Notification not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Notification not found")
 *         )
 *     )
 * )
 */

class NotificationController extends Controller
{
    public function updateIsRead(Request $request)
    {
        try {
            $id = $request->route('id');

            $notification = Notification::where('_id',new ObjectId( $id))->first();

            if (!$notification) {
                return createError(404, 'Không tìm thấy thông báo');
            }
            $notification->update(['isRead' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Đã cập nhật trạng thái thông báo!',
                'data' => $notification,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

}
