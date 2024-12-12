<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;
use App\Http\Requests\ClinicRequest;

/**
 * @OA\Get(
 *     path="/api/v1/clinics",
 *     tags={"Clinic Routes"},
 *     summary="Get all Clinics",
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
 *     path="/api/v1/clinics/{id}",
 *     tags={"Clinic Routes"},
 *     summary="Get one Clinic",
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
 *     path="/api/v1/clinics/add",
 *     tags={"Clinic Routes"},
 *     summary="Add a Clinic",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={""},
 *             @OA\Property(property="branchID", type="string", example=""),
 *             @OA\Property(property="specialtyID", type="string", example=""),
 *             @OA\Property(property="name", type="string", example="name of the new Clinic"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 *  @OA\put(
 *     path="/api/v1/clinics/update/{id}",
 *     tags={"Clinic Routes"},
 *     summary="Update Clinic",
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
 *             @OA\Property(property="branchID", type="string", example=""),
 *             @OA\Property(property="specialtyID", type="string", example=""),
 *             @OA\Property(property="name", type="string", example="name of the new Clinic"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\delete(
 *     path="/api/v1/clinics/delete/{id}",
 *     tags={"Clinic Routes"},
 *     summary="Update Clinic",
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

class ClinicController extends Controller
{
    public function getAllClinics(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Clinic::count();

            $Clinics = Clinic::skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Clinics retrieved successfully.',
                'data' => $Clinics,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

              return handleException($e);
        }
    }

    public function getOneClinic(Request $request)
    {
        try {
            $id = $request->route('id');
            $Clinic = Clinic::where('_id', $id)->first();

            if (!$Clinic) {
                return createError(404, 'Clinic not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Clinics retrieved successfully.',
                'data' => $Clinic,
            ], 200);
        } catch (\Exception $e) {
              return handleException($e);
        }
    }

    public function createClinic(Request $request)
    {
        try {

            $ClinicRequest = new ClinicRequest();
            $Clinic = Clinic::create($request->validate($ClinicRequest->rules()));

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm phòng khám thành công!',
                'data' => $Clinic,
            ], 201);
        } catch (\Exception $e) {

              return handleException($e);
        }
    }
    public function updateClinic(Request $request)
    {
        try {
            $id = $request->route('id');

            $Clinic = Clinic::where('_id', $id)->first();

            if (!$Clinic) {
                return createError(404, 'Không tìm thấy phòng khám!');
            }
            $ClinicRequest = new ClinicRequest();

            $Clinic->update($request->validate($ClinicRequest->update()));

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật phòng khám thành công!',
                'data' => $Clinic,
            ], 201);
        } catch (\Exception $e) {
              return handleException($e);
        }
    }
    public function deleteClinic($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID không được trống!');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ!');
            }

            $Clinic = Clinic::where('_id', $id)->first();
            if (!$Clinic) {
                return createError(404, 'Không tìm thấy phòng khám!');
            }

            $Clinic->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xóa phòng khám thành công!',
                'data' => $Clinic,
            ], 200);
        } catch (\Exception $e) {
              return handleException($e);
        }
    }
}
