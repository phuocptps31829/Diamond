<?php

namespace App\Http\Controllers;

use App\Models\MedicalPackage;
use Illuminate\Http\Request;
use App\Http\Requests\MedicalPackageRequest;

/**
 * @OA\Get(
 *     path="/api/v1/medical-packages",
 *     tags={"Medical package Routes"},
 *     summary="Get all Medical packages",
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
 *     path="/api/v1/medical-packages/{id}",
 *     tags={"Medical package Routes"},
 *     summary="Get one Medical package",
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
 *     path="/api/v1/medical-packages/add",
 *     tags={"Medical package Routes"},
 *     summary="Add a Medical package",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="specialtyID", type="string", example="New MedicalPackage"),
 *             @OA\Property(property="name", type="string", example="name MedicalPackage"),
 *             @OA\Property(property="image", type="string", example="image MedicalPackage"),
 *             @OA\Property(property="shortDescription", type="string", example="shortDescription MedicalPackage"),
 *             @OA\Property(property="detail", type="string", example="detail MedicalPackage"),
 *             @OA\Property(property="isHidden", type="boolean", example=false),
 *             @OA\Property(property="isDeleted", type="boolean", example=false),
 *  *             @OA\Property(property="services", type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="serviceID", type="array",
 *                         @OA\Items(type="string", example="")
 *                     ),
 *                     @OA\Property(property="levelName", type="string", example="Level"),
 *                     @OA\Property(property="price", type="number", example=100),
 *                     @OA\Property(property="discountPrice", type="number", nullable=true, example=80),
 *                     @OA\Property(property="duration", type="number", nullable=true, example=80),
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response"
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/medical-packages/update/{id}",
 *     tags={"Medical package Routes"},
 *     summary="Update Medical package",
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
 *             @OA\Property(property="specialtyID", type="string", example="New MedicalPackage"),
 *             @OA\Property(property="name", type="string", example="name MedicalPackage"),
 *             @OA\Property(property="image", type="string", example="image MedicalPackage"),
 *             @OA\Property(property="shortDescription", type="string", example="shortDescription MedicalPackage"),
 *             @OA\Property(property="detail", type="string", example="detail MedicalPackage"),
 *             @OA\Property(property="isHidden", type="boolean", example=false),
 *             @OA\Property(property="isDeleted", type="boolean", example=false),
 *  *             @OA\Property(property="services", type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="serviceID", type="array",
 *                         @OA\Items(type="string", example="")
 *                     ),
 *                     @OA\Property(property="levelName", type="string", example="Level"),
 *                     @OA\Property(property="price", type="number", example=100),
 *                     @OA\Property(property="discountPrice", type="number", nullable=true, example=80),
 *                     @OA\Property(property="duration", type="number", nullable=true, example=80),
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 * @OA\Delete(
 *     path="/api/v1/medical-packages/delete/{id}",
 *     tags={"Medical package Routes"},
 *     summary="Delete Medical package",
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

class MedicalPackageController extends Controller
{
    public function getAllMedicalPackages(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = MedicalPackage::where('isDeleted', false)->count();

            $MedicineCategories = MedicalPackage::where('isDeleted', false)
                ->skip($skip)
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

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    public function getOneMedicalPackage(Request $request)
    {
        try {
            $id = $request->route('id');
            $MedicalPackage = MedicalPackage::where('_id', $id)->where('isDeleted', false)->first();

            if (!$MedicalPackage) {
                return createError(404, 'Medicine category not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine category retrieved successfully.',
                'data' => $MedicalPackage,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    public function createMedicalPackage(Request $request)
    {
        try {
            $MedicalPackageRequest = new MedicalPackageRequest();

            $isHidden = filter_var($request->input('isHidden'), FILTER_VALIDATE_BOOLEAN);
            $request->merge(['isHidden' => $isHidden]);

            $checkSlug = checkSlug($request->title, 'MedicalPackage');

            if ($checkSlug) {
                $request->merge(['slug' => $checkSlug]);
            }

            if (!$request->hasFile('file') || checkValidImage($request->file)) {
                return createError(400, 'No image uploaded!');
            }

            $image = uploadImage($request->file);
            $request->merge(['image' => $image]);

            $MedicalPackage = MedicalPackage::create($request->validate($MedicalPackageRequest->rules(), $MedicalPackageRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine category created successfully.',
                'data' => $MedicalPackage,
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    public function updateMedicalPackage(Request $request)
    {
        try {
            $id = $request->route('id');
            $isHidden = filter_var($request->input('isHidden'), FILTER_VALIDATE_BOOLEAN);
            $request->merge(['isHidden' => $isHidden]);

            $checkSlug = checkSlug($request->title, 'MedicalPackage');

            if ($checkSlug) {
                $request->merge(['slug' => $checkSlug]);
            }

            if (!$request->hasFile('file') || checkValidImage($request->file)) {
                return createError(400, 'No image uploaded!');
            }

            $image = uploadImage($request->file);
            $request->merge(['image' => $image]);
            $MedicalPackage = MedicalPackage::where('_id', $id)->where('isDeleted', false)->first();

            if (!$MedicalPackage) {
                return createError(404, 'Medicine category not found');
            }
            $MedicalPackageRequest = new MedicalPackageRequest();

            $MedicalPackage->update($request->validate($MedicalPackageRequest->rules(), $MedicalPackageRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine category update successfully.',
                'data' => $MedicalPackage,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    public function deleteMedicalPackage($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $MedicalPackage = MedicalPackage::where('_id', $id)->where('isDeleted', false)->first();
            if (!$MedicalPackage) {
                return createError(404, 'Medicine category not found');
            }

            $MedicalPackage->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'MedicalPackage deleted successfully.',
                'data' => $MedicalPackage,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
