<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Prescription;
use App\Models\Result;
use App\Http\Requests\ResultRequest;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectId;

class ResultController extends Controller
{
    public function getAllResult(Request $request)
    {
        try {
            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Result::where('isDeleted', false)->count();

            $result = Result::where('isDeleted', false)
                ->skip($skip)
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
            $result = Result::where('_id', $id)->where('isDeleted', false)->first();

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
                $newResult= Result::create($dataResult);
                $result[] =$newResult;

                if (isset($value['prescription'])) {
                    $dataPrescription = $value['prescription'];
                    $dataPrescription['resultID'] = new ObjectId($newResult->id);

                    if (!empty($dataPrescription['medicines']) && is_array($dataPrescription['medicines'])) {
                        foreach ($dataPrescription['medicines'] as &$medicine) {
                            $medicine['medicineID'] = new ObjectId($medicine['medicineID']);
                        }
                    }
                    $prescription[] = Prescription::create($dataPrescription);
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Result and prescription created successfully.',
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
                'message' => 'Result created successfully.',
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

            $result = Result::where('_id', $id)->where('isDeleted', false)->first();

            if (!$result) {
                return createError(404, 'Result not found');
            }

            $resultRequest = new ResultRequest();

            $result->update($request->validate($resultRequest->update()));

            return response()->json([
                'status' => 'success',
                'message' => 'News update successfully.',
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
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $result = Result::where('_id', $id)->where('isDeleted', false)->first();
            if (!$result) {
                return createError(404, 'Result not found');
            }

            $result->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Result deleted successfully.',
                'data' => $result,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
