<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    function uploadImage(Request $request)
    {
        try {
            if (!$request->hasFile('file') || checkValidImage($request->file)) {
                return createError(400, 'No image uploaded!');
            }

            $image = uploadImage($request->file);

            return response()->json([
                'status' => 'success',
                'message' => 'Image upload successfully.',
                'data' => $image,
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
