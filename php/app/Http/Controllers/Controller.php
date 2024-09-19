<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="E-BookingHealthcare API - Swagger",
 *     description="E-BookingHealthcare API with Laravel",
 *     version="1.0.0",
 *     @OA\SecurityScheme(
 *       securityScheme="bearerAuth",
 *       in="header",
 *       name="bearerAuth",
 *       type="http",
 *       scheme="bearer",
 *       bearerFormat="JWT",
 *    ),
 *     @OA\Contact(
 *         name="Nguyen Chinh",
 *         email="chinhnguyennn24@gmail.com",
 *         url="https://github.com/ngchinhdev/"
 *     ),
 *     @OA\Server(
 *         url=L5_SWAGGER_CONST_HOST,
 *         description="Local server"
 *     ),
 *     @OA\Server(
 *         url="https://your-live-server-url",
 *         description="Live server"
 *     )
 * )
 */

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
