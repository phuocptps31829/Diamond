<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\OTP;
use App\Models\revokedToken;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class PatientController extends Controller
{
    function createPatient(Request $request)
    {
        try {

            $endUser = user::latest("id")->first();
            $codePatient = "";
            if ($endUser) {
                $codePatient = "BN" . ((int) substr($endUser->patientCode, 2) + 1);
            } else {
                $codePatient = "BN1";
            }

            $patient = User::create([
                'fullName' => $request->newUser['fullName'],
                'phoneNumber' => $request->newUser['phoneNumber'],
                'password' => $request->newUser['password'],
                'patientCode' => $codePatient,
                'isActivated' => true
            ]);

            return response()->json([
                'message' => 'New Patient is created successfully.',
                'data' =>  $patient
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }

        return  $request;
    }
}
