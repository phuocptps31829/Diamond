<?php

namespace App\Http\Controllers;

use App\Models\User;

use App\Models\Doctor;
use App\Models\OTP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

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
    public function logout(Request $request)
    {
        try {

            return response()->json([
                'message' => 'logout successfully',
            ], 200);
        } catch (\Exception $e) {
            // Xử lý lỗi
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    public function refreshToken(Request $request)
    {
        try {
            $newTokens = generateAccessRefreshToken($request);

            return response()->json([
                'accessToken' => $newTokens['accessToken'],
                'refreshToken' => $newTokens['refreshToken'],
            ], 200);
        } catch (\Exception $e) {
            // Xử lý lỗi
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }
    public function forgotPassword(Request $request)
    {
        try {
            $phoneNumber = $request->newUser['phoneNumber'];

            $userFound = User::where('phoneNumber', $phoneNumber)
                ->where('isActivated', true)
                ->first();

            if (!$userFound) {
                return createError(404, "User not found");
            }

            $userFound->password = $request->password;
            $userFound->save();

            return response()->json([
                'message' => 'Updated user successfully',
                'data' => $userFound
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    public function checkOTPForgotPassword(Request $request)
    {
        try {
            $OTP = $request->input('OTP');
            $newUser = $request->newUser;

            $phoneNumber = $newUser['phoneNumber'];
            $password = $newUser['password'];
            $fullName = $newUser['fullName'];

            $otpToken = $this->generateOTPToken([
                'fullName' => $fullName,
                'phoneNumber' => $phoneNumber,
                'password' => $password,
            ]);

            return response()->json([
                'message' => 'OTP is correct',
                'data' => [
                    'OTP' => $OTP,
                    'otpToken' => $otpToken
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    public function sendOTPForgotPassword(Request $request, $phone)
    {
        try {
            $userFound = User::where('phoneNumber', $phone)->where('isActivated', true)->first();

            if (!$userFound) {
                return createError(404, 'Phone number not found');
            }

            $OTP = $this->sendOTP($phone);

            $hashedOTP = Hash::make($OTP);

            Otp::create([
                'otp' => $hashedOTP,
                'phoneNumber' => $phone
            ]);

            $otpToken = $this->generateOTPToken([
                'fullName' => $userFound->FullName,
                'phoneNumber' => $userFound->phoneNumber,
                'password' => $userFound->password,
            ]);

            return response()->json([
                'message' => 'New OTP is created successfully.',
                'data' => [
                    'otpToken' =>  $otpToken,
                ]
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    public function register(Request $request)
    {
        try {

            $request->validate([
                'fullName' => 'required|string',
                'phoneNumber' => 'required|string',
                'password' => 'required|string',
            ], [
                'fullName.required' => 'FullName is required',
                'fullName.string' => 'FullName should be a string',
                'phoneNumber.required' => 'Phone number is required',
                'phoneNumber.string' => 'Phone number should be a string',
                'password.required' => 'Password is required',
                'password.string' => 'Password should be a string'
            ]);
            $check = checkPhoneAndEmail($request->phoneNumber);

            if ($check) {
                return createError(500, $check);
            }

            $otp = sendOTP($request->phoneNumber);
            $optHash = Hash::make($otp);

            $newOTP = OTP::create([
                'otp' => $optHash,
                'phoneNumber' => $request->phoneNumber,
            ]);

            $token = generateOTPToken($request->fullName, $request->phoneNumber, $request->password);

            return response()->json([
                'message' => 'New OTP is created successfully.',
                'data' => [
                    'otpToken' =>  $token,
                ]
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
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
                return  createError(400, 'Số điện thoại hoặc mật khẩu không đúng.');
            }
            if (!$user->isActivated) {
                return   createError(400, 'Tài khoản chưa được kích hoạt.');
            }
            $token = generateAccessRefreshToken($user);

            return response()->json([
                'message' => 'User logged in successfully.',
                'data' => [
                    'accessToken' =>  $token['accessToken'],
                    'refreshToken' => $token['refreshToken']
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
