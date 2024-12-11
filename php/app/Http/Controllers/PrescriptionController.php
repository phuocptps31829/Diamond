<?php

namespace App\Http\Controllers;

use App\Http\Requests\PrescriptionRequest;
use App\Models\Appointment;
use App\Models\Invoice;
use App\Models\Medicine;
use App\Models\Prescription;
use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectID;
use PDF;

/**
 * @OA\Get(
 *     path="/api/v1/prescriptions/export/{invoiceID}",
 *     tags={"Prescriptions"},
 *     summary="Export prescription details",
 *     operationId="exportPrescription",
 *     @OA\Parameter(
 *         name="invoiceID",
 *         in="path",
 *         required=true,
 *         description="The ID of the prescription to export",
 *         @OA\Schema(
 *             type="string",
 *             example="674bbca3d0019d94410627d1"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Prescription exported successfully",
 *         @OA\MediaType(
 *             mediaType="application/pdf"
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Prescription not found"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 * @OA\Get(
 *     path="/api/v1/prescriptions",
 *     tags={"Prescriptions"},
 *     summary="Get a list of prescriptions",
 *     description="Retrieve a list of all prescriptions with optional filtering, sorting, and pagination",
 *     operationId="getPrescriptions",
 *     @OA\Parameter(
 *         name="page",
 *         in="query",
 *         description="Page number for pagination",
 *         required=false,
 *         @OA\Schema(
 *             type="integer",
 *             example=1
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="limitDocuments",
 *         in="query",
 *         description="Limit the number of documents returned",
 *         required=false,
 *         @OA\Schema(
 *             type="integer",
 *             example=10
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="skip",
 *         in="query",
 *         description="Number of documents to skip",
 *         required=false,
 *         @OA\Schema(
 *             type="integer",
 *             example=0
 *         )
 *     ),
 *     @OA\Parameter(
 *         name="sortOptions",
 *         in="query",
 *         description="Sorting options for the returned data (e.g., 'created_at:desc')",
 *         required=false,
 *         @OA\Schema(
 *             type="string",
 *             example="created_at:desc"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="success",
 *                 type="boolean",
 *                 example=true
 *             ),
 *             @OA\Property(
 *                 property="data",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(
 *                         property="id",
 *                         type="string",
 *                         example="6737629e24285b32fb061b3f"
 *                     ),
 *                     @OA\Property(
 *                         property="patient_name",
 *                         type="string",
 *                         example="John Doe"
 *                     ),
 *                     @OA\Property(
 *                         property="diagnose",
 *                         type="string",
 *                         example="Fever and Cough"
 *                     ),
 *                     @OA\Property(
 *                         property="price",
 *                         type="integer",
 *                         example=150
 *                     ),
 *                     @OA\Property(
 *                         property="created_at",
 *                         type="string",
 *                         format="date-time",
 *                         example="2024-12-01T12:00:00Z"
 *                     )
 *                 )
 *             ),
 *             @OA\Property(
 *                 property="pagination",
 *                 type="object",
 *                 @OA\Property(
 *                     property="total",
 *                     type="integer",
 *                     example=100
 *                 ),
 *                 @OA\Property(
 *                     property="perPage",
 *                     type="integer",
 *                     example=10
 *                 ),
 *                 @OA\Property(
 *                     property="currentPage",
 *                     type="integer",
 *                     example=1
 *                 ),
 *                 @OA\Property(
 *                     property="lastPage",
 *                     type="integer",
 *                     example=10
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="success",
 *                 type="boolean",
 *                 example=false
 *             ),
 *             @OA\Property(
 *                 property="message",
 *                 type="string",
 *                 example="An error occurred while processing the request."
 *             )
 *         )
 *     )
 * )
/**
 * @OA\Get(
 *     path="/api/v1/prescriptions/{id}",
 *     tags={"Prescriptions"},
 *     summary="Get details of a specific prescription",
 *     description="Retrieve detailed information of a prescription by its ID",
 *     operationId="getPrescriptionById",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="ID of the prescription to retrieve",
 *         required=true,
 *         @OA\Schema(
 *             type="string",
 *             example="674bb5b1d0019d94410627cc"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful operation",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="success",
 *                 type="boolean",
 *                 example=true
 *             ),
 *             @OA\Property(
 *                 property="data",
 *                 type="object",
 *                 @OA\Property(
 *                     property="id",
 *                     type="string",
 *                     example="674bb5b1d0019d94410627cc"
 *                 ),
 *                 @OA\Property(
 *                     property="appointmentID",
 *                     type="string",
 *                     example="67271b9ee1d22ded7f0ce0cc"
 *                 ),
 *                 @OA\Property(
 *                     property="serviceID",
 *                     type="string",
 *                     example="674a1072c79d72a91103babc"
 *                 ),
 *                 @OA\Property(
 *                     property="diagnose",
 *                     type="string",
 *                     example="Patient diagnosed with Fever and Cough"
 *                 ),
 *                 @OA\Property(
 *                     property="images",
 *                     type="array",
 *                     @OA\Items(
 *                         type="string",
 *                         example="image1.jpg"
 *                     )
 *                 ),
 *                 @OA\Property(
 *                     property="description",
 *                     type="string",
 *                     example="The patient is experiencing fever, cough, and fatigue."
 *                 ),
 *                 @OA\Property(
 *                     property="prescription",
 *                     type="object",
 *                     @OA\Property(
 *                         property="advice",
 *                         type="string",
 *                         example="Patient should rest and drink fluids."
 *                     ),
 *                     @OA\Property(
 *                         property="price",
 *                         type="integer",
 *                         example=150
 *                     ),
 *                     @OA\Property(
 *                         property="medicines",
 *                         type="array",
 *                         @OA\Items(
 *                             type="object",
 *                             @OA\Property(
 *                                 property="medicineID",
 *                                 type="string",
 *                                 example="6743583941f547ab370d9ade"
 *                             ),
 *                             @OA\Property(
 *                                 property="quantity",
 *                                 type="integer",
 *                                 example=1
 *                             ),
 *                             @OA\Property(
 *                                 property="dosage",
 *                                 type="string",
 *                                 example="Take 1 tablet twice daily."
 *                             )
 *                         )
 *                     )
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Prescription not found",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="success",
 *                 type="boolean",
 *                 example=false
 *             ),
 *             @OA\Property(
 *                 property="message",
 *                 type="string",
 *                 example="Prescription not found."
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="success",
 *                 type="boolean",
 *                 example=false
 *             ),
 *             @OA\Property(
 *                 property="message",
 *                 type="string",
 *                 example="An error occurred while processing the request."
 *             )
 *         )
 *     )
 * )
 * @OA\Post(
 *     path="/api/v1/prescriptions/add",
 *     tags={"Prescriptions"},
 *     summary="Add a new prescription",
 *     operationId="addPrescription",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(
 *                     property="resultID",
 *                     type="string",
 *                     example="6702b0083fa0ff24f42380e2"
 *                 ),
 *                 @OA\Property(
 *                     property="appointmentID",
 *                     type="string",
 *                     example="6728cb7874d535eea90b0873"
 *                 ),
 *                 @OA\Property(
 *                     property="advice",
 *                     type="string",
 *                     example="Patient should take rest and drink plenty of water."
 *                 ),
 *                 @OA\Property(
 *                     property="medicines",
 *                     type="array",
 *                     @OA\Items(
 *                         type="object",
 *                         @OA\Property(
 *                             property="medicineID",
 *                             type="string",
 *                             example="674358aa41f547ab370d9ae2"
 *                         ),
 *                         @OA\Property(
 *                             property="quantity",
 *                             type="integer",
 *                             example=2
 *                         ),
 *                         @OA\Property(
 *                             property="dosage",
 *                             type="string",
 *                             example="Take 1 tablet twice daily."
 *                         )
 *                     )
 *                 ),
 *                 @OA\Property(
 *                     property="price",
 *                     type="integer",
 *                     example=200
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Prescription added successfully"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
/**
 * @OA\Put(
 *     path="/api/v1/prescriptions/update/{invoiceID}",
 *     tags={"Prescriptions"},
 *     summary="Update an existing prescription",
 *     operationId="updatePrescription",
 *     @OA\Parameter(
 *         name="invoiceID",
 *         in="path",
 *         required=true,
 *         description="The ID of the prescription to be updated",
 *         @OA\Schema(
 *             type="string",
 *             example="674bbca3d0019d94410627d1"
 *         )
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="application/json",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(
 *                     property="resultID",
 *                     type="string",
 *                     example="6702b0083fa0ff24f42380e2"
 *                 ),
 *                 @OA\Property(
 *                     property="invoiceID",
 *                     type="string",
 *                     example="674bbca3d0019d94410627d2"
 *                 ),
 *                 @OA\Property(
 *                     property="advice",
 *                     type="string",
 *                     example="Patient should take rest and drink plenty of water."
 *                 ),
 *                 @OA\Property(
 *                     property="medicines",
 *                     type="array",
 *                     @OA\Items(
 *                         type="object",
 *                         @OA\Property(
 *                             property="medicineID",
 *                             type="string",
 *                             example="674358aa41f547ab370d9ae2"
 *                         ),
 *                         @OA\Property(
 *                             property="quantity",
 *                             type="integer",
 *                             example=2
 *                         ),
 *                         @OA\Property(
 *                             property="dosage",
 *                             type="string",
 *                             example="Take 1 tablet twice daily."
 *                         )
 *                     )
 *                 ),
 *                 @OA\Property(
 *                     property="price",
 *                     type="integer",
 *                     example=200
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Prescription updated successfully"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
/**
 * @OA\Delete(
 *     path="/api/v1/prescriptions/delete/{invoiceID}",
 *     tags={"Prescriptions"},
 *     summary="Delete a prescription",
 *     operationId="deletePrescription",
 *     @OA\Parameter(
 *         name="invoiceID",
 *         in="path",
 *         required=true,
 *         description="The ID of the prescription to be deleted",
 *         @OA\Schema(
 *             type="string",
 *             example="674bbca3d0019d94410627d1"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Prescription deleted successfully"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Prescription not found"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 */


class PrescriptionController extends Controller
{
    public function export(Request $request){

        $id=$request->id;
        $prescription=Prescription::find($id);
        if(!$prescription){
            return createError(404, 'Không tìm thấy đơn thuốc!');
        }
    $medicines=[];
        foreach ($prescription->medicines as $medicine) {
            $nameUnit=Medicine::find($medicine['medicineID']);
            $medicine['unit']=$nameUnit->unit;
            $medicine['name']=$nameUnit->name;
            $medicines[]=$medicine;
        }
        $result=Result::find($prescription->resultID);
        $appointment=Appointment::find($result->appointmentID);
        $patient=User::find($appointment->patientID);

//        return view('pdf.prescription', compact('prescription','patient','medicines'))->render();
        // Render view thành HTML
        $pdf = PDF::loadView('pdf.prescription', compact('prescription','patient','medicines'));

        // Trả về file PDF
//        return $pdf->download('don-thuoc.pdf');
        return response($pdf->stream('don-thuoc.pdf'))
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline ; filename="don-thuoc.pdf"');
    }
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
                'message' => 'Tạo thành công đơn thuốc!',
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
                return createError(404, 'Không tìm thấy đơn thuốc!');
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
            $invoice=Invoice::find($request->invoiceID);
            $invoice->update(['price' =>  $data['price']]);

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật đơn thuốc thành công!',
                'data' => [
                    "prescription" => $Prescription,
                    "invoice" => $invoice
                ],
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function deletePrescription($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID không được trống');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ');
            }

            $prescription = Prescription::where('_id', $id)->first();
            if (!$prescription) {
                return createError(404, 'Không tìm thấy đơn thuốc!');
            }
            $prescription->delete();

            return response()->json([
                'status' => 'success',
                'message' => "Xóa đơn thuốc thành công!",
                'data' => $prescription,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
}
