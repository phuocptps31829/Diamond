<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageController extends Controller
{
    function uploadImages(Request $request)
    {
        try {
            if (!$request->hasFile('file')) {
                return createError(400, 'No images uploaded!');
            }

            $images = $request->file('file');
            $uploadedImages = [];

            foreach ($images as $image) {
                if (checkValidImage($image)) {
                    return createError(400, 'Invalid image uploaded!');
                }
                $uploadedImages[] = uploadImage($image);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Images uploaded successfully.',
                'data' => $uploadedImages,
            ], 201);
        } catch (\Exception $e) {

              return handleException($e);
        }
    }
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

              return handleException($e);
        }
    }
}
