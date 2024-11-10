<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\OTP;
use App\Models\revokedToken;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Http\Requests\PatientRequest;
use MongoDB\BSON\ObjectId;

class PatientController extends Controller
{
    function createPatient(Request $request)
    {
        try {
            $roleID = '66fcca5b682b8e25c2dc43a4';

            $endUser = user::where('roleID', new ObjectId($roleID))->whereNotNull('otherInfo.patientCode')->latest("id")->first();
            $codePatient = "";

            if ($endUser && isset($endUser->otherInfo['codePatient'])) {
                $codePatient = "BN" . ((int) substr($endUser->otherInfo['codePatient'], 2) + 1);
            } else {
                $codePatient = "BN1";
            }

            $patient = User::create([
                'fullName' => $request->newUser['fullName'],
                'phoneNumber' => $request->newUser['phoneNumber'],
                'password' => $request->newUser['password'],
                'patientCode' => $codePatient,
                'isActivated' => true,
                'roleID' => env("ROLE_PATIENT"),
                'otherInfo'=>new \stdClass()
            ]);

            return response()->json([
                'message' => 'New Patient is created successfully.',
                'data' =>  $patient
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
            $roleID = '66fcca5b682b8e25c2dc43a4';
            $endUser = User::where('roleID', new ObjectId($roleID))->whereNotNull('otherInfo.patientCode')->latest("id")->first();
            $codePatient = "";
            if ($endUser && isset($endUser->otherInfo['patientCode'])) {
                $codePatient = "BN" . ((int) substr($endUser->otherInfo['patientCode'], 2) + 1);
            } else {
                $codePatient = "BN1";
            }
            $otherInfo = $request->otherInfo;

            $otherInfo['patientCode'] = $codePatient;
            $request->merge(['roleID' => $roleID]);
            $request->merge(['otherInfo' => $otherInfo]);
            $patientRequest = new PatientRequest();
            $Service = User::create($request->validate($patientRequest->rules(), $patientRequest->messages()));
            return response()->json([
                'message' => 'New Patient is created successfully.',
                'data' =>   $Service
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    function updatePatient(Request $request)
    {
        try {
            $id = $request->route('id');
            $patient = User::where('_id', $id)->where('isDeleted', false)->first();

            if (!$patient) {
                return createError(404, 'patient not found');
            }

            $check = checkPhoneAndEmail($request->phoneNumber, $request->email, $id);
            if ($check) {
                return createError(500, $check);
            }
            $otherInfo = $request->otherInfo;
            $request->merge(['roleID' => env("ROLE_PATIENT")]);
            $request->merge(['otherInfo' => $otherInfo]);
            $patientRequest = new PatientRequest();
            $patient->update($request->validate($patientRequest->update(), $patientRequest->messages()));
            return response()->json([
                'message' => 'update Patient is created successfully.',
                'data' =>  $patient
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function deletePatient($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $Patient = User::where('_id', $id)->where('isDeleted', false)->first();
            if (!$Patient) {
                return createError(404, 'Patient not found');
            }

            $Patient->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Patient deleted successfully.',
                'data' => $Patient,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
