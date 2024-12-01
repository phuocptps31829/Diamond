<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\NewsRequest;
use MongoDB\BSON\ObjectId;

/**
 * @OA\Get(
 *     path="/api/v1/news",
 *     tags={"News Routes"},
 *     summary="Get all News",
 *     @OA\Parameter(
 *         name="page",
 *         in="query",
 *         description="Page number",
 *         required=false,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="limit",
 *         in="query",
 *         description="Number of items per page",
 *         required=false,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Parameter(
 *         name="sort",
 *         in="query",
 *         description="Sort order",
 *         required=false,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 * @OA\Get(
 *     path="/api/v1/news/{id}",
 *     tags={"News Routes"},
 *     summary="Get one News",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="id number",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\Post(
 *      path="/api/v1/news/add",
 *      tags={"News Routes"},
 *      summary="Add a News",
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  type="object",
 *                  required={},
 *                  @OA\Property(property="specialtyID", type="string", example="1"),
 *                  @OA\Property(property="title", type="string", example="Title of the new News"),
 *                  @OA\Property(property="image", type="string", description="dd"),
 *                  @OA\Property(property="content", type="string", example="Content of the new News"),
 *                  @OA\Property(property="author", type="string", example="Author of the new News"),
 *                  @OA\Property(property="isHidden", type="boolean", example=false)
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Successful response"
 *      )
 *  )
 *
 *  @OA\Put(
 *      path="/api/v1/news/update/{id}",
 *      tags={"News Routes"},
 *      summary="Update a News by ID",
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          @OA\Schema(
 *              type="string"
 *          ),
 *          description="ID of the news item to update"
 *      ),
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  type="object",
 *                  required={},
 *                  @OA\Property(property="specialtyID", type="string", example="1"),
 *                  @OA\Property(property="title", type="string", example="Title of the new News"),
 *                  @OA\Property(property="image", type="string",  description="rrrrrr"),
 *                  @OA\Property(property="content", type="string", example="Content of the new News"),
 *                  @OA\Property(property="author", type="string", example="Author of the new News"),
 *                  @OA\Property(property="isHidden", type="boolean", example=false)
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Successful response"
 *      )
 *  )
 *  @OA\delete(
 *     path="/api/v1/news/delete/{id}",
 *     tags={"News Routes"},
 *     summary="Update News",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="object id",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response"
 *     )
 * )
 * @OA\Patch(
 *     path="/api/v1/news/plus-view-count/{id}",
 *     tags={"News Routes"},
 *     summary="Increase the view count of a news item",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(
 *             type="string"
 *         ),
 *         description="ID of the news item for which the view count will be increased"
 *     ),
 *     @OA\RequestBody(
 *         required=false,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *         )
 *     ),
 *      @OA\Response(
 *          response=200,
 *          description="Successful response"
 *      )
 * )
 */

class NewsController extends Controller
{
    public function getAllNews(Request $request)
    {
        try {
            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = News::count();

            $News = News::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'News retrieved successfully.',
                'data' => $News,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneNews(Request $request)
    {
        try {
            $id = $request->route('id');
            $News = News::where('_id', $id)->first();

            if (!$News) {
                return createError(404, 'News not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'News retrieved successfully.',
                'data' => $News,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createNews(Request $request)
    {
        try {
            $NewsRequest = new NewsRequest();

            $checkSlug = checkSlug($request->title, 'News');
            if ($checkSlug) {
                $request->merge(['slug' => $checkSlug]);
            }

            $News = News::create($request->validate($NewsRequest->rules(), $NewsRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Tạo tin tức thành công!',
                'data' => $News,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    public function viewCount(Request $request)
    {
        try {
            $id = $request->route('id');

            $News = News::where('_id', $id)->first();

            if (!$News) {
                return createError(404, 'Không tìm thấy tin tức!');
            }
            $News->update([
                "viewCount" => $News->viewCount + 1
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Tăng lượt xem thành công!',
                'data' => $News,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function updateNews(Request $request)
    {
        try {
            $id = $request->route('id');

            $News = News::where('_id', $id)->first();

            if (!$News) {
                return createError(404, 'Không tìm thấy tin tức!');
            }

            $checkSlug = checkSlug($request->title, 'News', $id);
            if ($checkSlug) {
                $request->merge(['slug' => $checkSlug]);
            }
            $NewsRequest = new NewsRequest();

            $News->update($request->validate($NewsRequest->update()));

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật tin tức thành công!',
                'data' => $News,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function deleteNews($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID không được trống');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ!');
            }

            $News = News::where('_id', $id)->first();
            if (!$News) {
                return createError(404, 'Không tìm thấy tin tức!');
            }

            $News->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Xóa tin tức thành công!',
                'data' => $News,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
