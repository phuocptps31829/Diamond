<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * @OA\Post(
 *     path="/api/v1/images/upload-images",
 *     tags={"Image Routes"},
 *     summary="Upload multiple images",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 type="object",
 *                 required={"file[]"},
 *                 @OA\Property(
 *                     property="file[]",
 *                     type="array",
 *                     items=@OA\Items(
 *                         type="string",
 *                         format="binary",
 *                         description="Image files to upload"
 *                     ),
 *                     description="List of image files to be uploaded"
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successfully uploaded the images"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request, invalid data"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 * @OA\Post(
 *     path="/api/v1/images/upload",
 *     tags={"Image Routes"},
 *     summary="Upload an image",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 type="object",
 *                 required={"file"},
 *                 @OA\Property(
 *                     property="file",
 *                     type="string",
 *                     format="binary",
 *                     description="The image file to upload"
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successfully uploaded the image",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="imageUrl",
 *                 type="string",
 *                 format="uri",
 *                 description="The URL of the uploaded image"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request, invalid data"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 */
class ImageController extends Controller
{
    function uploadImages(Request $request)
    {
        try {
            if (!$request->hasFile('file')) {
                return createError(400, 'Không có ảnh tải lên!');
            }

            $images = $request->file('file');
            $uploadedImages = [];

            foreach ($images as $image) {
                if (checkValidImage($image)) {
                    return createError(400, 'Không có ảnh tải lên!');
                }
                $uploadedImages[] = uploadImage($image);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm ảnh thành công!',
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
                return createError(400, 'Không có ảnh tải lên!');
            }

            $image = uploadImage($request->file);

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm ảnh thành công!',
                'data' => $image,
            ], 201);
        } catch (\Exception $e) {

              return handleException($e);
        }
    }
}
