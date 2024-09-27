<?php

use Illuminate\Support\Facades\DB;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Cookie;

if (!function_exists('searchInTable')) {

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
            'accessToken' =>  $accessToken,
            'refreshToken' => $refreshToken
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
}
