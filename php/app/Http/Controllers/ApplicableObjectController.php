<?php

namespace App\Http\Controllers;

use App\Models\ApplicableObject;
use Illuminate\Http\Request;
use App\Http\Requests\ApplicableObjectRequest;

/**
 * @OA\Get(
 *     path="/api/v1/applicable-objects",
 *     tags={"Applicable object Routes"},
 *     summary="Get all applicable objects",
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
 *     path="/api/v1/applicable-objects/{id}",
 *     tags={"Applicable object Routes"},
 *     summary="Get one Applicable object",
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
 *     path="/api/v1/applicable-objects/add",
 *     tags={"Applicable object Routes"},
 *     summary="Add a Applicable object",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={""},
 *             @OA\Property(property="medicalPackageID", type="string", example=""),
 *             @OA\Property(property="gender", type="string", example="Nữ"),
 *             @OA\Property(property="isFamily", type="boolean", example=false),
 *             @OA\Property(property="isMarried", type="boolean", example=false),
 *              @OA\Property(
 *                  property="age",
 *                  type="object",
 *                  @OA\Property(property="min", type="number", example=12),
 *                  @OA\Property(property="max", type="number", example=35)
 *               ),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 *  @OA\put(
 *     path="/api/v1/applicable-objects/update/{id}",
 *     tags={"Applicable object Routes"},
 *     summary="Update Applicable object",
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
 *             required={""},
 *             @OA\Property(property="medicalPackageID", type="string", example=""),
 *             @OA\Property(property="gender", type="string", example="Nữ"),
 *             @OA\Property(property="isFamily", type="boolean", example=false),
 *             @OA\Property(property="isMarried", type="boolean", example=false),
 *              @OA\Property(
 *                  property="age",
 *                  type="object",
 *                  @OA\Property(property="min", type="number", example=12),
 *                  @OA\Property(property="max", type="number", example=35)
 *               ),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\delete(
 *     path="/api/v1/applicable-objects/delete/{id}",
 *     tags={"Applicable object Routes"},
 *     summary="Update Applicable object",
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

class ApplicableObjectController extends Controller
{
    public function getAllApplicableObjects(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = ApplicableObject::where('isDeleted', false)->count();

            $ApplicableObjects = ApplicableObject::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Applicable objects retrieved successfully.',
                'data' => $ApplicableObjects,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function getOneApplicableObject(Request $request)
    {
        try {
            $id = $request->route('id');
            $ApplicableObject = ApplicableObject::where('_id', $id)->where('isDeleted', false)->first();

            if (!$ApplicableObject) {
                return createError(404, 'Applicable object not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Applicable object retrieved successfully.',
                'data' => $ApplicableObject,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function createApplicableObject(Request $request)
    {
        try {
            $ApplicableObjectRequest = new ApplicableObjectRequest();
            $ApplicableObject = ApplicableObject::create($request->validate($ApplicableObjectRequest->rules(), $ApplicableObjectRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Applicable object created successfully.',
                'data' => $ApplicableObject,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
    public function updateApplicableObject(Request $request)
    {
        try {
            $id = $request->route('id');

            $ApplicableObject = ApplicableObject::where('_id', $id)->where('isDeleted', false)->first();

            if (!$ApplicableObject) {
                return createError(404, 'Applicable object not found');
            }
            $ApplicableObjectRequest = new ApplicableObjectRequest();

            $ApplicableObject->update($request->validate($ApplicableObjectRequest->rules(), $ApplicableObjectRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Applicable object update successfully.',
                'data' => $ApplicableObject,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
    public function deleteApplicableObject($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $ApplicableObject = ApplicableObject::where('_id', $id)->where('isDeleted', false)->first();
            if (!$ApplicableObject) {
                return createError(404, 'Applicable object not found');
            }

            $ApplicableObject->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Applicable object deleted successfully.',
                'data' => $ApplicableObject,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
}
