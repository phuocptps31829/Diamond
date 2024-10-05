<?php

use Illuminate\Support\Facades\DB;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Cookie;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Storage;

if (!function_exists('searchInTable')) {

    function generateOTPToken($fullName, $phoneNumber, $password)
    {
        $payload = [
            'fullName' => $fullName,
            'phoneNumber' => $phoneNumber,
            'password' => $password,
            'expiresIn' => time() + 300
        ];

        $otpToken = JWT::encode($payload, getenv('OTP_TOKEN_SECRET'), 'HS256');

        return $otpToken;
    }
    function sendOTP($phoneNumber)
    {
        return '123456';
    }
    function checkValidImage($file)
    {
        if (!$file || !$file->isValid()) {
            return 'File does not exist.';
        }

        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        $mimeType = $file->getMimeType();
        $extension = $file->getClientOriginalExtension();

        if (!in_array($mimeType, $allowedMimeTypes) || !in_array(strtolower($extension), $allowedExtensions)) {
            return 'The file must be jpg, jpeg, png or gif.';
        }

        return null;
    }
    function uploadImage($image, $nameFolder = null)
    {
        $newName = time() . '_' .   $image->getClientOriginalName();
        if ($nameFolder) {
            $image->move(public_path('images/' . $nameFolder . '/'), $newName);
        } else {
            $image->move('images/', $newName);
        }
        return $newName;
    }

    function checkSlug($title, $table, $id = null)
    {

        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while (DB::table($table)->where('slug', $slug)->exists()) {

            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    function saveRefreshToken($refreshToken)
    {
        return response()->json([
            'message' => 'Token saved successfully.'
        ])->cookie('refreshToken', $refreshToken, 48 * 60 * 60, null, null, false, true);
    }
    function generateAccessRefreshToken($user)
    {
        $accessToken = JWT::encode(['id' => $user->id, 'ext' => time() + 300], env('ACCESS_TOKEN_SECRET'), 'HS256');
        $refreshToken = JWT::encode(['id' => $user->id, 'isAdmin' => $user->isAdmin, 'ext' => time() + 7 * 24 * 60 * 60], env('REFRESH_TOKEN_SECRET'), 'HS256');

        return [
            'accessToken' =>
            [
                'token' => $accessToken,
                'expires' => time() + 60
            ],
            'refreshToken' =>
            [
                'token' => $refreshToken,
                'expires' => time() + (7 * 24 * 60 * 60)
            ]
        ];
    };

    function searchInTable($table, $keyword)
    {
        $columns = DB::getSchemaBuilder()->getColumnListing($table);
        $query = DB::table($table);
        foreach ($columns as $column) {
            $query->orWhere($column, 'LIKE', '%' . $keyword . '%');
        }
        return $query->get();
    };
    function isValidMongoId($id)
    {
        return preg_match('/^[0-9a-fA-F]{24}$/', $id);
    }
    function createError($code, $message)
    {
        return response()->json([
            'status' => 'fail',
            'message' => $message,
            'data' => null,
        ], $code);
    }

    function checkPhoneAndEmail($phoneNumber = null, $email = null, $userId = null)
    {
        if (!$phoneNumber  && !$email) {
            createError(500, 'Required phone number or email');
        }
        if ($userId) {
            $user = User::where('_id', $userId)->first();
            if (!$user) {
                return 'User not found';
            }
            if ($phoneNumber && $user->phoneNumber != $phoneNumber) {
                $user = User::where('phoneNumber', $phoneNumber)->first();
                if ($user) {
                    return 'Phone number already exists';
                }
            }
            if ($email && $user->email != $email) {
                $user = User::where('email', $email)->first();
                if ($user) {
                    return  'Email already exists';
                }
            }
            return null;
        } else {
            if ($phoneNumber) {
                $user = User::where('phoneNumber', $phoneNumber)->first();
                if ($user) {
                    return 'Phone number already exists';
                }
            }
            if ($email) {
                $user = User::where('email', $email)->first();
                if ($user) {
                    return  'Email already exists';
                }
            }
        }
    }
}
