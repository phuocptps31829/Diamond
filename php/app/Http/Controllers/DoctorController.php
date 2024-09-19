<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\DoctorRequest;
use App\Http\Requests\UserRequest;

/**
 * @OA\Get(
 *     path="/api/v1/doctors/",
 *     tags={"Doctor Routes"},
 *     summary="Get all Doctor",
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
 *     path="/api/v1/doctors/{id}",
 *     tags={"Doctor Routes"},
 *     summary="Get one Doctor",
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
 *     path="/api/v1/doctors/add",
 *     tags={"Doctor Routes"},
 *     summary="Add a Doctor",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={""},
 *             @OA\Property(property="specialtyID", type="string", example=""),
 *             @OA\Property(property="title", type="string", example="Title of the new Doctor"),
 *             @OA\Property(property="image", type="string", example="Image of the new Doctor"),
 *             @OA\Property(property="content", type="string", example="content of the new Doctor"),
 *             @OA\Property(property="author", type="string", example="author of the new Doctor"),
 *             @OA\Property(property="isHidden", type="boolean", example=false),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 *  @OA\put(
 *     path="/api/v1/doctors/update/{id}",
 *     tags={"Doctor Routes"},
 *     summary="Update Doctor",
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
 *             @OA\Property(property="specialtyID", type="string", example=""),
 *             @OA\Property(property="title", type="string", example="Title of the new Doctor"),
 *             @OA\Property(property="image", type="string", example="Image of the new Doctor"),
 *             @OA\Property(property="content", type="string", example="content of the new Doctor"),
 *             @OA\Property(property="author", type="string", example="author of the new Doctor"),
 *             @OA\Property(property="isHidden", type="boolean", example=false),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\delete(
 *     path="/api/v1/doctors/delete/{id}",
 *     tags={"Doctor Routes"},
 *     summary="Update Doctor",
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

class DoctorController extends Controller
{
    public function getAllDoctors(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Doctor::where('isDeleted', false)->count();

            $Doctors = Doctor::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Doctors retrieved successfully.',
                'data' => $Doctors,
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

    public function getOneDoctor(Request $request)
    {
        try {
            $id = $request->route('id');
            $Doctor = Doctor::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Doctor) {
                return createError(404, 'Doctor not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Doctor retrieved successfully.',
                'data' => $Doctor,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    public function createDoctor(Request $request)
    {
        try {
            $doctorRequest = new DoctorRequest();
            // 123
            $user = 123;
            $userRequest = new UserRequest();

            $user = User::create($request->validate($userRequest->rules(), $userRequest->messages()));
            $doctor = Doctor::create($request->validate($doctorRequest->rules(), $doctorRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Doctor created successfully.',
                'data' => $doctor,
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    public function updateDoctor(Request $request)
    {
        try {
            $id = $request->route('id');

            $Doctor = Doctor::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Doctor) {
                return createError(404, 'Doctor not found');
            }
            $DoctorRequest = new DoctorRequest();

            $Doctor->update($request->validate($DoctorRequest->rules(), $DoctorRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Doctor update successfully.',
                'data' => $Doctor,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    public function deleteDoctor($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $Doctor = Doctor::where('_id', $id)->where('isDeleted', false)->first();
            if (!$Doctor) {
                return createError(404, 'Doctor not found');
            }

            $Doctor->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Doctor deleted successfully.',
                'data' => $Doctor,
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