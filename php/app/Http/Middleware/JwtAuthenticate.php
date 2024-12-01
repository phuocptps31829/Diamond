<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $accessToken = $request->bearerToken();

        if (!$accessToken) {
            return createError(403, 'accessToken token not found.');
        }
        $verifiedUser = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN_SECRET'), 'HS256'));
        if (!$verifiedUser) {
            return createError(403, 'Invalid access token.');
        }
        if ((time()) > $verifiedUser->ext) {
            return response()->json(['error' => 'Token hết hạn.'], 401);
        }
        $request->merge(['jwtAuth' => $verifiedUser]);
        return $next($request);
    }
}
