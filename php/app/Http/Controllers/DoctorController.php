<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\DoctorRequest;
use App\Http\Requests\UserRequest;
use Hamcrest\Type\IsString;
use MongoDB\BSON\ObjectId;

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
 *         required=false,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 required={},
 *                 @OA\Property(property="fullName", type="string", example="BS moi"),
 *                 @OA\Property(property="roleID", type="string", example="1"),
 *                 @OA\Property(property="phoneNumber", type="string", example="0300099989"),
 *                 @OA\Property(property="email", type="string", example="gmail123@gmail.com"),
 *                 @OA\Property(property="dateOfBirth", type="string", format="date", example="2000-01-01"),
 *                 @OA\Property(property="gender", type="string", example="Nam"),
 *                 @OA\Property(property="password", type="string", example="123456"),
 *                 @OA\Property(
 *                     property="file",
 *                     type="string",
 *                     format="binary",
 *                     description="File ảnh đại diện của bác sĩ"
 *                 ),
 *                 @OA\Property(property="citizenIdentificationNumber", type="number", example=34256234),
 *                 @OA\Property(property="isActivated", type="boolean", example=true),
 *                 @OA\Property(property="address[province]", type="string", example="province"),
 *                 @OA\Property(property="address[district]", type="string", example="district"),
 *                 @OA\Property(property="address[ward]", type="string", example="ward"),
 *                 @OA\Property(property="address[street]", type="string", example="street"),
 *                  @OA\Property(property="otherInfo[specialtyID]", type="string", example="specialtyID"),
 *                  @OA\Property(property="otherInfo[title]", type="string", example="title"),
 *                  @OA\Property(property="otherInfo[practicingCertificate]", type="string", example="practicingCertificate"),
 *                  @OA\Property(property="otherInfo[yearsExperience]", type="number", example=2),
 *                  @OA\Property(property="otherInfo[detail]", type="string", example="detail"),
 *                  @OA\Property(property="otherInfo[isInternal]", type="boolean", example=true),
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 * @OA\put(
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
 *             @OA\Property(property="roleID", type="string", example="1"),
 *             @OA\Property(property="phoneNumber", type="string", example="0300099989"),
 *             @OA\Property(property="email", type="string", example="gmail123@gmail.com"),
 *             @OA\Property(property="dateOfBirth", type="string", example="2000-01-01"),
 *             @OA\Property(property="gender", type="string", example="Nam"),
 *             @OA\Property(property="password", type="string", example="123456"),
 *             @OA\Property(property="avatar", type="string", example="avatar"),
 *             @OA\Property(property="citizenIdentificationNumber", type="number", example=34256234),
 *             @OA\Property(property="isActivated", type="boolean", ),
 *              @OA\Property(
 *                  property="address",
 *                  type="object",
 *                  @OA\Property(property="province", type="string", example="province"),
 *                  @OA\Property(property="district", type="string", example="106.660172"),
 *                  @OA\Property(property="ward", type="string", example="106.660172"),
 *                  @OA\Property(property="street", type="string", example="106.660172"),
 *               ),
 *              @OA\Property(
 *                  property="otherInfo",
 *                  type="object",
 *                  @OA\Property(property="specialtyID", type="string", example=""),
 *                  @OA\Property(property="title", type="string", example="title"),
 *                  @OA\Property(property="practicingCertificate", type="string", example="practicingCertificate"),
 *                  @OA\Property(property="yearsExperience", type="number", example=2),
 *                  @OA\Property(property="detail", type="string", example="detail"),
 *                  @OA\Property(property="isInternal", type="boolean", ),
 *               ),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 * @OA\delete(
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
            $totalRecords = User::where('isDeleted', false)->count();
            $user = User::skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Doctors retrieved successfully.',
                'data' => $user,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneDoctor(Request $request)
    {
        try {
            $id = $request->route('id');

            $Doctor = User::where('_id', $id)->first();

            if (!$Doctor) {
                return createError(404, 'Doctor not found');
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Doctor retrieved successfully.',
                'data' => $Doctor,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createDoctor(Request $request)
    {
        try {
            $doctorRequest = new DoctorRequest();
            $phoneNumber = $request->phoneNumber;
            $email = $request->email;
            $check = checkPhoneAndEmail($phoneNumber, $email);
            if ($check) {
                return createError(500, $check);
            }
            $roleID = env('ROLE_DOCTOR');
            $request->merge(['roleID' => $roleID]);

            $dataDoctor = $request->validate($doctorRequest->rules());
            if (isset($dataDoctor['otherInfo'])) {
                $otherInfo =$dataDoctor['otherInfo'];
                $otherInfo['specialtyID'] = new ObjectId($otherInfo['specialtyID']);
                $otherInfo['branchID'] = new ObjectId($otherInfo['branchID']);
                $dataDoctor['otherInfo'] = $otherInfo;
            }
            $doctor = User::create($dataDoctor);


            return response()->json([
                'status' => 'success',
                'message' => 'Doctor created successfully.',
                'data' => $doctor,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function updateDoctor(Request $request)
    {
        try {
            $id = $request->route('id');
            $Doctor = User::where('_id', $id)->first();

            if (!$Doctor) {
                return createError(404, 'Doctor not found');
            }

            $check = checkPhoneAndEmail($request->phoneNumber, $request->email, $Doctor->id);

            if ($check) {
                return createError(500, $check);
            }

            $doctorRequest = new DoctorRequest();
            $dataDoctor = $request->validate($doctorRequest->update());
            if (isset($dataDoctor['otherInfo'])) {
                $otherInfo =$dataDoctor['otherInfo'];
                $otherInfo['specialtyID'] = new ObjectId($otherInfo['specialtyID']);
                $otherInfo['branchID'] = new ObjectId($otherInfo['branchID']);
                $dataDoctor['otherInfo'] = $otherInfo;
            }
            $Doctor->update($dataDoctor);
            $Doctor->refresh();
            $otherInfo = $Doctor->otherInfo;
            if (isset($Doctor->otherInfo)) {
                $otherInfo['specialtyID'] = (string)$Doctor->otherInfo['specialtyID'];
                $otherInfo['branchID'] = (string)$Doctor->otherInfo['branchID'];
            }
            $Doctor->otherInfo = $otherInfo;
            return response()->json([
                'status' => 'success',
                'message' => 'Doctor update successfully.',
                'data' => $Doctor,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
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

            $Doctor = User::where('_id', $id)->first();
            if (!$Doctor) {
                return createError(404, 'Doctor not found');
            }

            $Doctor->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Doctor deleted successfully.',
                'data' => $Doctor,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
