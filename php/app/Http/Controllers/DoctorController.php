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
 *             @OA\Property(property="fullName", type="string", example="BS moi"),
 *             @OA\Property(property="phoneNumber", type="string", example="0300099989"),
 *             @OA\Property(property="email", type="string", example="gmail123@gmail.com"),
 *             @OA\Property(property="dateOfBirth", type="string", example="2000-01-01"),
 *             @OA\Property(property="gender", type="string", example="Nam"),
 *             @OA\Property(property="password", type="string", example="123456"),
 *             @OA\Property(property="avatar", type="string", example="avatar"),
 *             @OA\Property(property="citizenIdentificationNumber", type="number", example=34256234),
 *             @OA\Property(property="isActivated", type="boolean", example=true),
 *             @OA\Property(property="specialtyID", type="string", example=""),
 *             @OA\Property(property="title", type="string", example="title"),
 *             @OA\Property(property="practicingCertificate", type="string", example="practicingCertificate"),
 *             @OA\Property(property="yearsExperience", type="number", example=2),
 *             @OA\Property(property="detail", type="string", example="detail"),
 *             @OA\Property(property="isInternal", type="boolean", example=true),
 *             @OA\Property(
 *                  property="address",
 *                  type="object",
 *                  @OA\Property(property="province", type="string", example="province"),
 *                  @OA\Property(property="district", type="string", example="106.660172"),
 *                  @OA\Property(property="ward", type="string", example="106.660172"),
 *                  @OA\Property(property="street", type="string", example="106.660172"),
 *               ),
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
 *             @OA\Property(property="fullName", type="string", example="BS moi"),
 *             @OA\Property(property="phoneNumber", type="string", example="0300099989"),
 *             @OA\Property(property="email", type="string", example="gmail123@gmail.com"),
 *             @OA\Property(property="dateOfBirth", type="string", example="2000-01-01"),
 *             @OA\Property(property="gender", type="string", example="Nam"),
 *             @OA\Property(property="password", type="string", example="123456"),
 *             @OA\Property(property="avatar", type="string", example="avatar"),
 *             @OA\Property(property="citizenIdentificationNumber", type="number", example=34256234),
 *             @OA\Property(property="isActivated", type="boolean", example=true),
 *             @OA\Property(property="specialtyID", type="string", example=""),
 *             @OA\Property(property="title", type="string", example="title"),
 *             @OA\Property(property="practicingCertificate", type="string", example="practicingCertificate"),
 *             @OA\Property(property="yearsExperience", type="number", example=2),
 *             @OA\Property(property="detail", type="string", example="detail"),
 *             @OA\Property(property="isInternal", type="boolean", example=true),
 *              @OA\Property(
 *                  property="address",
 *                  type="object",
 *                  @OA\Property(property="province", type="string", example="province"),
 *                  @OA\Property(property="district", type="string", example="106.660172"),
 *                  @OA\Property(property="ward", type="string", example="106.660172"),
 *                  @OA\Property(property="street", type="string", example="106.660172"),
 *               ),
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

            // $totalRecords = User::count();

            $Doctors = json_decode('{"province":"province","district":"106.660172","ward":"106.660172","street":"106.660172"}');

            return response()->json([
                'page' => $page,
                'message' => 'Doctors retrieved successfully.',
                'data' => $Doctors,
                'totalRecords' => 3,
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
            $userRequest = new UserRequest();

            $user = User::create($request->validate($userRequest->rules(), $userRequest->messages()));
            $request->merge(['userID' => $user->_id]);
            $doctor = Doctor::create($request->validate($doctorRequest->rules(), $doctorRequest->messages()));
            $doctor->user = $user;
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