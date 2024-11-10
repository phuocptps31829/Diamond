<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\RevokedToken;
use App\Models\Otp;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Illuminate\Support\Facades\Hash;
use Exception;

class VerifyOTP
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $otpToken = $request->otpToken;
        $OTP = $request->OTP;
        if (!$otpToken || !$OTP) {
            return createError(403, 'Thiếu token hoặc OTP.');
        }
        try {
            $revokedToken = RevokedToken::where('token', $otpToken)->first();
            if ($revokedToken) {
                return response()->json(['error' => 'Token đã hết hạn.'], 401);
            }

            $verifiedToken  = JWT::decode($otpToken, new Key(env('OTP_TOKEN_SECRET'), 'HS256'));
            $phoneNumber = $verifiedToken->phoneNumber;
            $fullName = $verifiedToken->fullName;
            $password = $verifiedToken->password;

            $otpHolder = Otp::where('phoneNumber', $phoneNumber)->get();

            if ((time()) > $verifiedToken->expiresIn) {
                return response()->json(['error' => 'Token hết hạn.'], 401);
            }

            $lastOTP = $otpHolder->last();
            if (!Hash::check($OTP, $lastOTP->otp)) {
                return response()->json(['error' => 'OTP không đúng.'], 403);
            }

            $revokedToken =   RevokedToken::create(['token' => $otpToken]);

            $request->merge([
                'newUser' => [
                    'phoneNumber' => $phoneNumber,
                    'password' => $password,
                    'fullName' => $fullName,
                ]
            ]);

            return $next($request);
        } catch (ExpiredException $e) {
            return response()->json(['error' => 'Token đã hết hạn.'], 401);
        } catch (Exception $e) {
            return response()->json(['error' => 'Có lỗi xảy ra.'], 500);
        }
    }
}
