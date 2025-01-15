<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Prescription;
use App\Models\Result;
use App\Http\Requests\ResultRequest;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectId;

/**
 * @OA\Get(
 *     path="/api/v1/results",
 *     summary="Get Results",
 *     description="This endpoint fetches results from the server.",
 *     operationId="getResults",
 *     tags={"Results"},
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="data", type="array",
 *                 @OA\Items(type="object",
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="name", type="string", example="Example Result")
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 * @OA\Get(
 *     path="/api/v1/results/{id}",
 *     summary="Get Result by ID",
 *     description="This endpoint fetches a result based on the provided ID.",
 *     operationId="getResultById",
 *     tags={"Results"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="The ID of the result to fetch",
 *         @OA\Schema(
 *             type="string",
 *             example="67376c9624285b32fb061b5a"
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="data", type="object",
 *                 @OA\Property(property="id", type="string", example="67376c9624285b32fb061b5a"),
 *                 @OA\Property(property="name", type="string", example="Example Result")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Bad request"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Result not found"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 * @OA\Post(
 *     path="/api/v1/results/add",
 *     tags={"Results"},
 *     summary="Add a new result",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"diagnose", "appointmentID", "serviceID"},
 *             @OA\Property(property="diagnose", type="string", example="Fever and headache"),
 *             @OA\Property(property="images", type="array", items=@OA\Items(type="string", example="image1.jpg")),
 *             @OA\Property(property="description", type="string", example="Patient has a fever and is experiencing headache"),
 *             @OA\Property(property="appointmentID", type="string", example="6728cb7874d535eea90b0873"),
 *             @OA\Property(property="serviceID", type="string", example="674a1072c79d72a91103babc")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Validation error or bad request",
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/results/update/{id}",
 *     tags={"Results"},
 *     summary="Update an existing result",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the result to be updated",
 *         @OA\Schema(type="string", example="674b66a0d0019d94410627c3")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"diagnose"},
 *             @OA\Property(property="diagnose", type="string", example="Fever and headache4444453434"),
 *             @OA\Property(property="images", type="array", items=@OA\Items(type="string", example="image1.jpg")),
 *             @OA\Property(property="description", type="string", example="Patient has a fever and is experiencing headache"),
 *             @OA\Property(property="appointmentID", type="string", example="6728cb7874d535eea90b0873"),
 *             @OA\Property(property="serviceID", type="string", example="674a1072c79d72a91103babc")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Validation error or bad request",
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Result not found",
 *     )
 * )
 * @OA\Post(
 *     path="/api/v1/results/result-prescription/add",
 *     tags={"Results"},
 *     summary="Add multiple results and prescriptions",
 *     description="API to add multiple results and their associated prescriptions.",
 *     operationId="addResultsAndPrescriptions",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(
 *                 property="payload",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(
 *                         property="result",
 *                         type="object",
 *                         @OA\Property(
 *                             property="appointmentID",
 *                             type="string",
 *                             description="MongoDB ObjectId of the appointment",
 *                             example="67271b9ee1d22ded7f0ce0cc"
 *                         ),
 *                         @OA\Property(
 *                             property="serviceID",
 *                             type="string",
 *                             description="MongoDB ObjectId of the service",
 *                             example="674a1072c79d72a91103babc"
 *                         ),
 *                         @OA\Property(
 *                             property="diagnose",
 *                             type="string",
 *                             description="Diagnosis details",
 *                             example="Patient diagnosed with Fever and Cough"
 *                         ),
 *                         @OA\Property(
 *                             property="images",
 *                             type="array",
 *                             @OA\Items(type="string"),
 *                             description="List of image file names",
 *                             example={"image1.jpg", "image2.jpg"}
 *                         ),
 *                         @OA\Property(
 *                             property="description",
 *                             type="string",
 *                             description="Additional notes about the diagnosis",
 *                             example="The patient is experiencing fever, cough, and fatigue."
 *                         )
 *                     ),
 *                     @OA\Property(
 *                         property="prescription",
 *                         type="object",
 *                         @OA\Property(
 *                             property="advice",
 *                             type="string",
 *                             description="Medical advice for the patient",
 *                             example="Patient should rest and drink fluids."
 *                         ),
 *                         @OA\Property(
 *                             property="price",
 *                             type="integer",
 *                             description="Cost of the prescription",
 *                             example=150
 *                         ),
 *                         @OA\Property(
 *                             property="medicines",
 *                             type="array",
 *                             @OA\Items(
 *                                 type="object",
 *                                 @OA\Property(
 *                                     property="medicineID",
 *                                     type="string",
 *                                     description="MongoDB ObjectId of the medicine",
 *                                     example="6743583941f547ab370d9ade"
 *                                 ),
 *                                 @OA\Property(
 *                                     property="quantity",
 *                                     type="integer",
 *                                     description="Quantity of the medicine prescribed",
 *                                     example=1
 *                                 ),
 *                                 @OA\Property(
 *                                     property="dosage",
 *                                     type="string",
 *                                     description="Dosage instructions for the medicine",
 *                                     example="Take 1 tablet twice daily."
 *                                 )
 *                             )
 *                         )
 *                     )
 *                 )
 *             )
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
 *                 property="message",
 *                 type="string",
 *                 example="Results and prescriptions added successfully."
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Validation error",
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
 *                 example="Validation error."
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
 * @OA\Delete(
 *     path="/api/v1/results/delete/{id}",
 *     tags={"Results"},
 *     summary="Delete a result",
 *     description="Delete a result by its ID",
 *     operationId="deleteResult",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="MongoDB ObjectId of the result to delete",
 *         required=true,
 *         @OA\Schema(
 *             type="string",
 *             example="6737629e24285b32fb061b3f"
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
 *                 property="message",
 *                 type="string",
 *                 example="Result deleted successfully."
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Result not found",
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
 *                 example="Result not found."
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
 */
class ResultController extends Controller
{
    public function getAllResult(Request $request)
    {
        try {
            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Result::count();

            $result = Result::skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Result retrieved successfully.',
                'data' => $result,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }

    public function getOneResult(Request $request)
    {
        try {
            $id = $request->route('id');
            $result = Result::where('_id', new  ObjectId($id))->first();

            if (!$result) {
                return createError(404, 'Result not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Result retrieved successfully.',
                'data' => $result,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function createResultAndPrescription(Request $request)
    {
        try {
            $resultRequest = new ResultRequest();
            $dataAll = $request->validate($resultRequest->createResultAndPrescription());
            $data = $request->payload;
            $result = [];
            $prescription = [];

            foreach ($data as $value) {
                $dataResult = $value['result'];
                $dataResult['appointmentID'] = new ObjectId($dataResult['appointmentID']);
                $dataResult['serviceID'] = new ObjectId($dataResult['serviceID']);
                $newResult = Result::create($dataResult);
                $result[] = $newResult;

                if (isset($value['prescription'])) {
                    $dataPrescription = $value['prescription'];
                    $dataPrescription['resultID'] = new ObjectId($newResult->id);

                    if (!empty($dataPrescription['medicines']) && is_array($dataPrescription['medicines'])) {
                        foreach ($dataPrescription['medicines'] as &$medicine) {
                            $medicine['medicineID'] = new ObjectId($medicine['medicineID']);
                        }
                    }

                    $prescriptionNew = Prescription::create([
                        "medicines" => $dataPrescription['medicines'],
                        "advice" => $dataPrescription['advice'],
                        "resultID" => $dataPrescription['resultID'],
                    ]);

                    $prescription[] = $prescriptionNew;
                            if(isset($prescriptionNew)){
                                $invoice = Invoice::create([
                                    "appointmentID" => $dataResult['appointmentID'],
                                    "price" => $dataPrescription['price'],
                                    "prescriptionID" => $prescriptionNew->id
                                ]);
                            }
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Thêm kết quả khám thành công!',
                'data' => [
                    'result' => $result,
                    'prescription' => $prescription,
                ],
            ], 201);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }

    public function createResult(Request $request)
    {
        try {
            $resultRequest = new resultRequest();
            $result = Result::create($request->validate($resultRequest->rules()));
            return response()->json([
                'status' => 'success',
                'message' => 'Thêm kết quả khám thành công!',
                'data' => $result,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function updateResult(Request $request)
    {
        try {
            $id = $request->route('id');
            $result = Result::where('_id',new ObjectId( $id))->first();

            if (!$result) {
                return createError(404, 'Không tìm thấy kết quả khám!');
            }

            $resultRequest = new ResultRequest();

            $result->update($request->validate($resultRequest->update()));

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật kết quả thành công!',
                'data' => $result,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function deleteResult($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID không được trống!');
            }
            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ!');
            }
            $result = Result::where('_id', new ObjectId($id))->first();
            if (!$result) {
                return createError(404, 'Không tìm thấy kết quả khám!');
            }
            $result->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Xóa kết quả khám thành công!',
                'data' => $result,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }
}
