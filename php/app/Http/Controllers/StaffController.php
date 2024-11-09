<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\OTP;
use App\Models\revokedToken;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use App\Http\Requests\StaffRequest;
use MongoDB\BSON\ObjectId;

class StaffController extends Controller
{

    function createStaffFromAdmin(Request $request)
    {
        try {
            $check = checkPhoneAndEmail($request->phoneNumber, $request->email);
            if ($check) {
                return createError(500, $check);
            }
            $StaffRequest = new StaffRequest();
            $data=$request->validate($StaffRequest->rules(), $StaffRequest->messages());
            if (isset($data['roleID'])) {
                $data['roleID'] = new ObjectId($data['roleID']);
            }
            $Service = User::create($data);
            return response()->json([
                'message' => 'New Staff is created successfully.',
                'data' => $Service
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    function updateStaff(Request $request)
    {
        try {
            $id = $request->route('id');

            $Staff = User::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Staff) {
                return createError(404, 'Staff not found');
            }

            $check = checkPhoneAndEmail($request->phoneNumber, $request->email, $id);

            if ($check) {
                return createError(500, $check);
            }

            $StaffRequest = new StaffRequest();

            $data=$request->validate($StaffRequest->update(), $StaffRequest->messages());
            if (isset($data['roleID'])) {
                $data['roleID'] = new ObjectId($data['roleID']);
            }
            $Staff->update($data);
            return response()->json([
                'message' => 'update Staff is created successfully.',
                'data' => $Staff
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function deleteStaff($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $Staff = User::where('_id', $id)->where('isDeleted', false)->first();
            if (!$Staff) {
                return createError(404, 'Staff not found');
            }

            $Staff->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Staff deleted successfully.',
                'data' => $Staff,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
}
