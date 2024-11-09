<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use Illuminate\Http\Request;
use App\Http\Requests\HospitalRequest;

/**
 * @OA\Get(
 *     path="/api/v1/hospitals",
 *     tags={"Hospital Routes"},
 *     summary="Get all hospitals",
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
 *     path="/api/v1/hospitals/{id}",
 *     tags={"Hospital Routes"},
 *     summary="Get one hospital",
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
 *     path="/api/v1/hospitals/add",
 *     tags={"Hospital Routes"},
 *     summary="Add a Hospital",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="name", type="string", example="New Hospital"),
 *             @OA\Property(property="image", type="string", example="Description of the new Hospital"),
 *             @OA\Property(property="address", type="string", example="address of the new Hospital"),
 *             @OA\Property(property="hotline", type="string", example="hotline of the new Hospital")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 *  @OA\put(
 *     path="/api/v1/hospitals/update/{id}",
 *     tags={"Hospital Routes"},
 *     summary="Update Hospital",
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
 *             @OA\Property(property="name", type="string", example="New Hospital"),
 *             @OA\Property(property="image", type="string", example="Description of the new Hospital"),
 *             @OA\Property(property="address", type="string", example="address of the new Hospital"),
 *             @OA\Property(property="hotline", type="string", example="hotline of the new Hospital")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\delete(
 *     path="/api/v1/hospitals/delete/{id}",
 *     tags={"Hospital Routes"},
 *     summary="Update Hospital",
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

class HospitalController extends Controller
{
    public function getAllHospitals(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Hospital::where('isDeleted', false)->count();

            $hospitals = Hospital::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'hospitals retrieved successfully.',
                'data' => $hospitals,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

              return handleException($e);
        }
    }
    public function getOneHospital(Request $request)
    {
        try {
            $id = $request->route('id');
            $Hospital = Hospital::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Hospital) {
                return createError(404, 'Hospital not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'hospitals retrieved successfully.',
                'data' => $Hospital,
            ], 200);
        } catch (\Exception $e) {
              return handleException($e);
        }
    }
    public function createHospital(Request $request)
    {
        try {
            $HospitalRequest = new HospitalRequest();
            $Hospital = Hospital::create($request->validate($HospitalRequest->rules(), $HospitalRequest->messages()));
            return response()->json([
                'status' => 'success',
                'message' => 'Hospital created successfully.',
                'data' => $Hospital,
            ], 201);
        } catch (\Exception $e) {

              return handleException($e);
        }
    }
    public function updateHospital(Request $request)
    {
        try {
            $id = $request->route('id');

            $Hospital = Hospital::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Hospital) {
                return createError(404, 'Hospital not found');
            }
            $HospitalRequest = new HospitalRequest();

            $Hospital->update($request->validate($HospitalRequest->rules(), $HospitalRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Hospital update successfully.',
                'data' => $Hospital,
            ], 201);
        } catch (\Exception $e) {
              return handleException($e);
        }
    }
    public function deleteHospital($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $Hospital = Hospital::where('_id', $id)->where('isDeleted', false)->first();
            if (!$Hospital) {
                return createError(404, 'Hospital not found');
            }

            $Hospital->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Hospital deleted successfully.',
                'data' => $Hospital,
            ], 200);
        } catch (\Exception $e) {
              return handleException($e);
        }
    }
}
