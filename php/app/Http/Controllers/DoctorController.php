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
 *  @OA\Post(
 *      path="/api/v1/doctors/add",
 *      tags={"Doctor Routes"},
 *      summary="Add a new doctor",
 *      description="This endpoint is used to add a new doctor to the system.",
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  type="object",
 *                  required={"fullName", "roleID", "phoneNumber", "password", "isActivated", "otherInfo.specialtyID", "otherInfo.branchID", "otherInfo.verification.practicingCertificate", "otherInfo.verification.images"},
 *                  @OA\Property(property="fullName", type="string", description="Full name of the doctor"),
 *                  @OA\Property(property="roleID", type="string", description="Role ID of the doctor (MongoDB ObjectId)"),
 *                  @OA\Property(property="phoneNumber", type="string", pattern="^[0-9]{10,11}$", description="Phone number of the doctor"),
 *                  @OA\Property(property="email", type="string", format="email", description="Email address of the doctor"),
 *                  @OA\Property(property="dateOfBirth", type="string", format="date", description="Date of birth of the doctor"),
 *                  @OA\Property(property="address", type="string", description="Address of the doctor"),
 *                  @OA\Property(property="gender", type="string", description="Gender of the doctor"),
 *                  @OA\Property(property="password", type="string", description="Password for the doctor"),
 *                  @OA\Property(property="avatar", type="string", format="uri", description="Avatar image URL"),
 *                  @OA\Property(property="isActivated", type="boolean", description="Activation status of the doctor"),
 *                  @OA\Property(property="citizenIdentificationNumber", type="integer", description="Citizen identification number"),
 *                  @OA\Property(
 *                      property="otherInfo",
 *                      type="object",
 *                      @OA\Property(property="specialtyID", type="string", description="Specialty ID (MongoDB ObjectId)"),
 *                      @OA\Property(property="branchID", type="string", description="Branch ID (MongoDB ObjectId)"),
 *                      @OA\Property(property="title", type="string", description="Title of the doctor"),
 *                      @OA\Property(property="yearsExperience", type="string", description="Years of experience"),
 *                      @OA\Property(property="detail", type="string", description="Additional details about the doctor"),
 *                      @OA\Property(property="isInternal", type="boolean", description="Whether the doctor is internal or not"),
 *                      @OA\Property(
 *                          property="verification",
 *                          type="object",
 *                          @OA\Property(property="practicingCertificate", type="string", description="Practicing certificate number"),
 *                          @OA\Property(property="images", type="array", @OA\Items(type="string", format="uri", description="List of verification images"))
 *                      )
 *                  )
 *              )
 *          )
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Doctor successfully added",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Doctor added successfully")
 *          )
 *      ),
 *      @OA\Response(
 *          response=400,
 *          description="Bad request, invalid data",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Invalid data provided")
 *          )
 *      ),
 *      @OA\Response(
 *          response=500,
 *          description="Internal server error",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="An unexpected error occurred")
 *          )
 *      )
 *  )
 * @OA\Put(
 *     path="/api/v1/doctors/update/{id}",
 *     tags={"Doctor Routes"},
 *     summary="Update doctor information",
 *     description="This endpoint updates the information of an existing doctor.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Doctor ID to update (MongoDB ObjectId)",
 *         @OA\Schema(type="string", example="674bf42cd")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 required={"fullName", "roleID", "phoneNumber", "password", "isActivated", "otherInfo.specialtyID", "otherInfo.branchID", "otherInfo.verification.practicingCertificate", "otherInfo.verification.images"},
 *                 @OA\Property(property="fullName", type="string", description="Full name of the doctor"),
 *                 @OA\Property(property="roleID", type="string", description="Role ID of the doctor (MongoDB ObjectId)"),
 *                 @OA\Property(property="phoneNumber", type="string", pattern="^[0-9]{10,11}$", description="Phone number of the doctor"),
 *                 @OA\Property(property="email", type="string", format="email", description="Email address of the doctor"),
 *                 @OA\Property(property="dateOfBirth", type="string", format="date", description="Date of birth of the doctor"),
 *                 @OA\Property(property="address", type="string", description="Address of the doctor"),
 *                 @OA\Property(property="gender", type="string", description="Gender of the doctor"),
 *                 @OA\Property(property="password", type="string", description="Password for the doctor"),
 *                 @OA\Property(property="avatar", type="string", format="uri", description="Avatar image URL"),
 *                 @OA\Property(property="isActivated", type="boolean", description="Activation status of the doctor"),
 *                 @OA\Property(property="citizenIdentificationNumber", type="integer", description="Citizen identification number"),
 *                 @OA\Property(
 *                     property="otherInfo",
 *                     type="object",
 *                     @OA\Property(property="specialtyID", type="string", description="Specialty ID (MongoDB ObjectId)"),
 *                     @OA\Property(property="branchID", type="string", description="Branch ID (MongoDB ObjectId)"),
 *                     @OA\Property(property="title", type="string", description="Title of the doctor"),
 *                     @OA\Property(property="yearsExperience", type="string", description="Years of experience"),
 *                     @OA\Property(property="detail", type="string", description="Additional details about the doctor"),
 *                     @OA\Property(property="isInternal", type="boolean", description="Whether the doctor is internal or not"),
 *                     @OA\Property(
 *                         property="verification",
 *                         type="object",
 *                         @OA\Property(property="practicingCertificate", type="string", description="Practicing certificate number"),
 *                         @OA\Property(property="images", type="array", @OA\Items(type="string", format="uri", description="List of verification images"))
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Doctor information updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Doctor updated successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request, invalid data",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid data provided")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Doctor not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Doctor not found")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="An unexpected error occurred")
 *         )
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
                'message' => 'Thêm tài khoản thành công!',
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
                return createError(404, 'Không tìm thấy tài khoảng!');
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
                'message' => 'Cập nhật tài khoản thành công!',
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
                return createError(400, 'ID không được trống!');
            }
            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ!');
            }
            $Doctor = User::where('_id', $id)->first();
            if (!$Doctor) {
                return createError(404, 'Không tìm thấy tài khoản!');
            }
            $Doctor->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Xóa tài khoản thành công!',
                'data' => $Doctor,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
