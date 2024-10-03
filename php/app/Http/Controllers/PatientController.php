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

            $patient = User::create([
                'fullName' => $request->newUser['fullName'],
                'phoneNumber' => $request->newUser['phoneNumber'],
                'password' => $request->newUser['password']
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
