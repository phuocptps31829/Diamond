<?php

namespace App\Http\Middleware;

use App\Helpers\Helpers;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class CheckValidId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next): Response
    {
        $id = $request->route('id');

        if (!$id) {
            return createError(400, 'ID is required');
        }

        if (!isValidMongoId($id)) {
            return createError(400, 'Invalid mongo ID');
        }

        return $next($request);
    }
}