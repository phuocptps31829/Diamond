<?php

namespace App\Http\Controllers;

use App\Http\Requests\PrescriptionRequest;
use App\Models\Invoice;
use App\Models\Prescription;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectID;

class PrescriptionController extends Controller
{
    public function getAllPrescription(Request $request)
    {
        try {
            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Prescription::count();

            $prescription = Prescription::skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Prescription retrieved successfully.',
                'data' => $prescription,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }

    public function getOnePrescription(Request $request)
    {
        try {
            $id = $request->route('id');
            $Prescription = Prescription::where('_id', $id)->first();

            if (!$Prescription) {
                return createError(404, 'Prescription not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Prescription retrieved successfully.',
                'data' => $Prescription,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function createPrescription(Request $request)
    {
        try {
            $PrescriptionRequest = new PrescriptionRequest();
            $data = $request->validate($PrescriptionRequest->rules());
            $data['resultID'] = new ObjectID($data['resultID']);
            if (!empty($request->medicines) && is_array($request->medicines)) {
                $medicines = $request->medicines;
                foreach ($medicines as &$medicine) {
                    $medicine['medicineID'] = new ObjectID($medicine['medicineID']);
                }
                $data['medicines'] = $medicines;
            }
            $prescription = Prescription::create($data);

            $invoice = Invoice::create([
                "appointmentID" => $data['appointmentID'],
                "price" => $data['price'],
                "prescriptionID" => $prescription->id
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Prescription created successfully.',
                'data' => [
                    "prescription" => $prescription,
                    "invoice" => $invoice
                ],
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function updatePrescription(Request $request)
    {
        try {
            $id = $request->route('id');
            $PrescriptionRequest = new PrescriptionRequest();
            $Prescription = Prescription::where('_id', $id)->first();
            if (!$Prescription) {
                return createError(404, 'Prescription not found');
            }
            $data = $request->validate($PrescriptionRequest->update());
            if (isset($request->resultID)) {
                $data['resultID'] = new ObjectID($data['resultID']);
            }
            if (!empty($request->medicines) && is_array($request->medicines)) {
                $medicines = $request->medicines;
                foreach ($medicines as &$medicine) {
                    $medicine['medicineID'] = new ObjectID($medicine['medicineID']);
                }
                $data['medicines'] = $medicines;
            }

            $Prescription->update($data);

            return response()->json([
                'status' => 'success',
                'message' => 'News update successfully.',
                'data' => $Prescription,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function deletePrescription($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $prescription = Prescription::where('_id', $id)->first();
            if (!$prescription) {
                return createError(404, 'Prescription not found');
            }
            $prescription->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Prescription deleted successfully.',
                'data' => $prescription,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
}
