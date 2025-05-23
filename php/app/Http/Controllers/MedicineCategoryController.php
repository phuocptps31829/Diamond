<?php

namespace App\Http\Controllers;

use App\Models\MedicineCategory;
use Illuminate\Http\Request;
use App\Http\Requests\MedicineCategoryRequest;

/**
 * @OA\Get(
 *     path="/api/v1/medicine-categories",
 *     tags={"Medicine category Routes"},
 *     summary="Get all Medicine category",
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
 *     path="/api/v1/medicine-categories/{id}",
 *     tags={"Medicine category Routes"},
 *     summary="Get one Medicine category",
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
 * @OA\Post(
 *     path="/api/v1/medicine-categories/add",
 *     tags={"Medicine category Routes"},
 *     summary="Add a Medicine category",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="name", type="string", example="New MedicineCategory")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response"
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/medicine-categories/update/{id}",
 *     tags={"Medicine category Routes"},
 *     summary="Update Medicine category",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="object id",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="name", type="string", example="New MedicineCategory"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 * @OA\Delete(
 *     path="/api/v1/medicine-categories/delete/{id}",
 *     tags={"Medicine category Routes"},
 *     summary="Delete Medicine category",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="object id",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 */

class MedicineCategoryController extends Controller
{
    public function getAllMedicineCategories(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = MedicineCategory::count();

            $MedicineCategories = MedicineCategory::skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Medicine categories retrieved successfully.',
                'data' => $MedicineCategories,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneMedicineCategory(Request $request)
    {
        try {
            $id = $request->route('id');
            $MedicineCategory = MedicineCategory::where('_id', $id)->first();

            if (!$MedicineCategory) {
                return createError(404, 'Medicine category not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine category retrieved successfully.',
                'data' => $MedicineCategory,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createMedicineCategory(Request $request)
    {
        try {
            $MedicineCategoryRequest = new MedicineCategoryRequest();
            $MedicineCategory = MedicineCategory::create($request->validate($MedicineCategoryRequest->rules()));

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm danh mục thuốc thành công!',
                'data' => $MedicineCategory,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    public function updateMedicineCategory(Request $request)
    {
        try {
            $id = $request->route('id');

            $MedicineCategory = MedicineCategory::where('_id', $id)->first();

            if (!$MedicineCategory) {
                return createError(404, 'Không tìm thấy danh mục thuốc!');
            }
            $MedicineCategoryRequest = new MedicineCategoryRequest();

            $MedicineCategory->update($request->validate($MedicineCategoryRequest->update()));

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật danh mục thuốc thành công!',
                'data' => $MedicineCategory,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function deleteMedicineCategory($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID không được trống!');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ!');
            }

            $MedicineCategory = MedicineCategory::where('_id', $id)->first();
            if (!$MedicineCategory) {
                return createError(404, 'Không tìm thấy danh mục thuốc!');
            }

            $MedicineCategory->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Xóa danh mục thuốc thành công!',
                'data' => $MedicineCategory,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
