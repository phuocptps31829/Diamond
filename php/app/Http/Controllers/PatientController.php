<?php

namespace App\Http\Controllers;


use App\Models\User;

use App\Http\Requests\PatientRequest;
use MongoDB\BSON\ObjectId;
use Illuminate\Http\Request;


/**
 * @OA\Post(
 *     path="/api/v1/patients/add",
 *     summary="Add a new patient",
 *     description="Add a new patient using OTP token and OTP",
 *     tags={"Patients"},
 *     @OA\RequestBody(
 *         required=true,
 *        @OA\MediaType(
 *        mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 required={"otpToken", "OTP"},
 *                 @OA\Property(property="otpToken", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmdWxsTmFtZSI6InBoYW4gdHJcdTFlY2RuZyBwaFx1MDFiMFx1MWVkYmMgMiIsInBob25lTnVtYmVyIjoiMDM2NDg0MjY1NCIsInBhc3N3b3JkIjoiMTIzNDU2IiwiZXhwaXJlc0luIjoxNzMzMDIxNDM4fQ.g59D5pB_Csatkm8C3zMGspUMqmVyN4705dPQ9Lhtd-A"),
 *                 @OA\Property(property="OTP", type="integer", example=123456)
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Patient added successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Patient added successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid OTP token or OTP",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid OTP token or OTP")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Patient not found or invalid data",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Patient not found or invalid data")
 *         )
 *     )
 * )
 * @OA\Post(
 *     path="/api/v1/patients/admin-add",
 *     tags={"Patients"},
 *     summary="Add a new patient by admin",
 *     description="Create a new patient record with detailed information",
 *     operationId="adminAddPatient",
 *     @OA\RequestBody(
 *         required=true,
 *              @OA\MediaType(
 *              mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 required={"fullName", "roleID", "phoneNumber", "password", "isActivated"},
 *                 @OA\Property(property="fullName", type="string", example="Nguyen Thi Lan"),
 *                 @OA\Property(property="roleID", type="string", example="603d8e3b75e736001f19e1b7"),
 *                 @OA\Property(property="phoneNumber", type="string", example="09876543741"),
 *                 @OA\Property(property="email", type="string", example="nguyenlan@e4mple.com"),
 *                 @OA\Property(property="dateOfBirth", type="string", format="date", example="1990-05-21"),
 *                 @OA\Property(property="address", type="string", example="123 Mai Hắc Đế, Hà Nội"),
 *                 @OA\Property(property="gender", type="string", example="Female"),
 *                 @OA\Property(property="password", type="string", example="password123"),
 *                 @OA\Property(property="avatar", type="string", example="avatar.jpg"),
 *                 @OA\Property(property="isActivated", type="boolean", example=true),
 *                 @OA\Property(property="citizenIdentificationNumber", type="string", example="1234567890"),
 *                 @OA\Property(
 *                     property="otherInfo",
 *                     type="object",
 *                     @OA\Property(property="occupation", type="string", example="Software Engineer"),
 *                     @OA\Property(property="insuranceCode", type="string", example="INS123456789"),
 *                     @OA\Property(property="ethnic", type="string", example="Kinh"),
 *                     @OA\Property(
 *                         property="relatedPatientsID",
 *                         type="array",
 *                         @OA\Items(type="string", example="670545cef069a29a830b6ad0")
 *                     ),
 *                     @OA\Property(
 *                         property="healthInformation",
 *                         type="array",
 *                         @OA\Items(
 *                             type="object",
 *                             @OA\Property(property="type", type="string", example="Blood Pressure"),
 *                             @OA\Property(property="data", type="string", example="120/80"),
 *                             @OA\Property(property="unit", type="string", example="mmHg"),
 *                             @OA\Property(property="date", type="string", format="date", example="2024-12-01")
 *                         )
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Patient added successfully",
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(property="message", type="string", example="Patient added successfully"),
 *                 @OA\Property(property="data", type="object")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid data provided",
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(property="message", type="string", example="Invalid input data"),
 *                 @OA\Property(property="errors", type="object")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
/**
 * @OA\Put(
 *     path="/api/v1/patients/update/{patientId}",
 *     summary="Update patient information",
 *     description="Update a patient's details using the given patient ID",
 *     tags={"Patients"},
 *     @OA\Parameter(
 *         name="patientId",
 *         in="path",
 *         required=true,
 *         description="ID of the patient to update",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(property="fullName", type="string", example="Nguyen Thi Lan"),
 *                 @OA\Property(property="roleID", type="string", example="603d8e3b75e736001f19e1b7"),
 *                 @OA\Property(property="phoneNumber", type="string", example="09876543741"),
 *                 @OA\Property(property="email", type="string", example="nguyenlan@e4mple.com"),
 *                 @OA\Property(property="dateOfBirth", type="string", format="date", example="1990-05-21"),
 *                 @OA\Property(property="address", type="string", example="123 Mai Hắc Đế, Hà Nội"),
 *                 @OA\Property(property="gender", type="string", example="Female"),
 *                 @OA\Property(property="password", type="string", example="password123"),
 *                 @OA\Property(property="avatar", type="string", example="avatar.jpg"),
 *                 @OA\Property(property="isActivated", type="boolean", example=true),
 *                 @OA\Property(property="citizenIdentificationNumber", type="string", example="1234567890"),
 *                 @OA\Property(
 *                     property="otherInfo",
 *                     type="object",
 *                     @OA\Property(property="occupation", type="string", example="Software Engineer"),
 *                     @OA\Property(property="patientCode", type="string", example="P0012345678"),
 *                     @OA\Property(property="insuranceCode", type="string", example="INS123456789"),
 *                     @OA\Property(property="ethnic", type="string", example="Kinh"),
 *                     @OA\Property(
 *                         property="relatedPatientsID",
 *                         type="array",
 *                         @OA\Items(type="string", example="670545cef069a29a830b6ad0")
 *                     ),
 *                     @OA\Property(
 *                         property="healthInformation",
 *                         type="array",
 *                         @OA\Items(
 *                             type="object",
 *                             @OA\Property(property="type", type="string", example="Blood Pressure"),
 *                             @OA\Property(property="data", type="string", example="120/80"),
 *                             @OA\Property(property="unit", type="string", example="mmHg"),
 *                             @OA\Property(property="date", type="string", format="date", example="2024-12-01")
 *                         )
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Patient updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Patient updated successfully"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid request",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid data provided")
 *         )
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/patients/update/avatar/{patientId}",
 *     summary="Update avatar for a patient",
 *     description="Update a patient's avatar by providing a string value for the avatar (e.g., file name or image URL)",
 *     tags={"Patients"},
 *     @OA\Parameter(
 *         name="patientId",
 *         in="path",
 *         required=true,
 *         description="ID of the patient whose avatar needs to be updated",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(property="avatar", type="string", description="URL or file name of the avatar image")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Avatar updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Avatar updated successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid request",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid input data")
 *         )
 *     )
 * )
 * @OA\Delete(
 *     path="/api/v1/patients/delete/{patientId}",
 *     summary="Delete a patient by ID",
 *     description="Deletes a patient record using the patient's ID",
 *     tags={"Patients"},
 *     @OA\Parameter(
 *         name="patientId",
 *         in="path",
 *         required=true,
 *         description="ID of the patient to delete",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Patient deleted successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Patient deleted successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid patient ID",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Invalid patient ID")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Patient not found",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Patient not found")
 *         )
 *     )
 * )
 */

class PatientController extends Controller
{
    function updateImage(Request $request)
    {
        try {
            $id = $request->route('id');
            $patient = User::where('_id', $id)->first();

            if (!$patient) {
                return createError(404, 'Không tìm thấy tài khoản!');
            }
            $patient->update(['avatar' => $request->avatar]);
            return response()->json([
                'message' => 'Cập nhật tài khoản thành công!',
                'data' => $patient
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
    function createPatient(Request $request)
    {
        try {
            $roleID = env("ROLE_PATIENT");
            $endUser = user::where('roleID', new ObjectId($roleID))->whereNotNull('otherInfo.patientCode')->latest("id")->first();
            $codePatient = "";
            if ($endUser && isset($endUser->otherInfo['codePatient'])) {
                $codePatient = "BN" . ((int)substr($endUser->otherInfo['codePatient'], 2) + 1);
            } else {
                $codePatient = "BN1";
            }
            $otherInfo = [
                'patientCode' => $codePatient
            ];

            $patient = User::create([
                'fullName' => $request->newUser['fullName'],
                'phoneNumber' => $request->newUser['phoneNumber'],
                'password' => $request->newUser['password'],
                'patientCode' => $codePatient,
                'isActivated' => true,
                'roleID' => env("ROLE_PATIENT"),
                "otherInfo" => $otherInfo
            ]);

            return response()->json([
                'message' => 'Thêm tài khoản thành công!',
                'data' => $patient
            ], 201);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }

    function createPatientFromAdmin(Request $request)
    {
        try {
            $check = checkPhoneAndEmail($request->phoneNumber, $request->email);

            if ($check) {
                return createError(500, $check);
            }
            $roleID = env("ROLE_PATIENT");
            $endUser = User::where('roleID', new ObjectId($roleID))->whereNotNull('otherInfo.patientCode')->latest("id")->first();
            $codePatient = "";
            if ($endUser && isset($endUser->otherInfo['patientCode'])) {
                $codePatient = "BN" . ((int)substr($endUser->otherInfo['patientCode'], 2) + 1);
            } else {
                $codePatient = "BN1";
            }
            $otherInfo = $request->otherInfo;

            $otherInfo['patientCode'] = $codePatient;
            $request->merge(['roleID' => $roleID]);
            $request->merge(['otherInfo' => $otherInfo]);
            $patientRequest = new PatientRequest();
            $Service = User::create($request->validate($patientRequest->rules()));
            return response()->json([
                'message' => 'Thêm tài khoản thành công!',
                'data' => $Service
            ], 201);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }

    function updatePatient(Request $request)
    {
        try {
            $id = $request->route('id');
            $patient = User::where('_id', $id)->first();

            if (!$patient) {
                return createError(404, 'Không tìm thấy tài khoản!');
            }

            $check = checkPhoneAndEmail($request->phoneNumber, $request->email, $id);
            if ($check) {
                return createError(500, $check);
            }
            $otherInfo = $request->otherInfo;
            $request->merge(['roleID' => env("ROLE_PATIENT")]);
            $request->merge(['otherInfo' => $otherInfo]);
            $patientRequest = new PatientRequest();
            $patient->update($request->validate($patientRequest->update()));
            return response()->json([
                'message' => 'Cập nhật tài khoản thành công!',
                'data' => $patient
            ], 201);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }

    public function deletePatient($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID không được trống');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ!');
            }

            $Patient = User::where('_id', $id)->first();
            if (!$Patient) {
                return createError(404, 'Không tìm thấy tài khoản');
            }

            $Patient->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Xóa tài khoản thành công!',
                'data' => $Patient,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
}
