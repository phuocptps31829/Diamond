<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ChekcSecret
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $secret = $request->header('secret');

        if (!$secret) {
            return createError(403, 'No secret key.');
        }
        if($secret!==env('AUTH_SECRET')){
            return createError(403, 'No secret key.');
        }
        return $next($request);
    }
}
