<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

/**

 * @OA\Post(
 *     path="/api/v1/auth",
 *     tags={"Auth Routes"},
 *     summary="Login",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={""},
 *             @OA\Property(property="phoneNumber", type="string", example="0364842673"),
 *             @OA\Property(property="password", type="string", example="123456")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 */

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {

            $request->validate([
                'phoneNumber' => 'required|string',
                'password' => 'required|string',
            ], [
                'phoneNumber.required' => 'Phone number is required',
                'phoneNumber.string' => 'Phone number should be a string',
                'password.required' => 'Password is required',
                'password.string' => 'Password should be a string'
            ]);
            $user = User::where('phoneNumber', '=', $request->phoneNumber)->first();
            if (!$user) {
                return  createError(400, 'Số điện thoại hoặc mật khẩu không đúng.');
            }
            $validPassword = Hash::check($request->password, $user->password);

            if (!$validPassword) {
                createError(400, 'Số điện thoại hoặc mật khẩu không đúng.');
            }
            if (!$user->isActivated) {
                createError(400, 'Tài khoản chưa được kích hoạt.');
            }

            $doctor = Doctor::where('userID', '=', new ObjectId($user->id))->first();
            $doctor->user = $user;
            $token = generateAccessRefreshToken($doctor);

            return response()->json([
                'message' => 'User logged in successfully.',
                'data' => [
                    'accessToken' =>  $token['accessToken'],
                    'doctor' => $doctor
                ]
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
