<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use App\Http\Requests\MedicineRequest;

/**
 * @OA\Get(
 *     path="/api/v1/medicines",
 *     tags={"Medicine Routes"},
 *     summary="Get all Medicine",
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
 *     path="/api/v1/medicines/{id}",
 *     tags={"Medicine Routes"},
 *     summary="Get one Medicine",
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
 * @OA\Post(
 *     path="/api/v1/medicines/add",
 *     tags={"Medicine Routes"},
 *     summary="Add a Medicine",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="medicineCategoryID", type="string", example=""),
 *             @OA\Property(property="medicineCode", type="string", example="New Medicine code"),
 *             @OA\Property(property="name", type="string", example="New Medicine"),
 *             @OA\Property(property="ingredients", type="string", example="New Medicine"),
 *             @OA\Property(property="unit", type="string", example="New Medicine"),
 *             @OA\Property(property="sideEffects", type="string", example="New Medicine"),
 *             @OA\Property(property="type", type="string", example="New Medicine"),
 *             @OA\Property(property="instruction", type="string", example="New Medicine"),
 *             @OA\Property(property="note", type="string", example="New Medicine"),
 *             @OA\Property(property="price", type="number", example=1231),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response"
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/medicines/update/{id}",
 *     tags={"Medicine Routes"},
 *     summary="Update Medicine",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         description="object id",
 *         required=true,
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="medicineCategoryID", type="string", example=""),
 *             @OA\Property(property="medicineCode", type="string", example="New Medicine code"),
 *             @OA\Property(property="name", type="string", example="New Medicine"),
 *             @OA\Property(property="ingredients", type="string", example="New Medicine"),
 *             @OA\Property(property="unit", type="string", example="New Medicine"),
 *             @OA\Property(property="sideEffects", type="string", example="New Medicine"),
 *             @OA\Property(property="type", type="string", example="New Medicine"),
 *             @OA\Property(property="instruction", type="string", example="New Medicine"),
 *             @OA\Property(property="note", type="string", example="New Medicine"),
 *             @OA\Property(property="price", type="number", example=1231),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 * @OA\Delete(
 *     path="/api/v1/medicines/delete/{id}",
 *     tags={"Medicine Routes"},
 *     summary="Delete Medicine",
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

class MedicineController extends Controller
{
    public function getAllMedicines(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Medicine::where('isDeleted', false)->count();

            $Medicines = Medicine::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Medicines retrieved successfully.',
                'data' => $Medicines,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneMedicine(Request $request)
    {
        try {
            $id = $request->route('id');
            $Medicine = Medicine::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Medicine) {
                return createError(404, 'Medicine not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine retrieved successfully.',
                'data' => $Medicine,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createMedicine(Request $request)
    {
        try {
            $MedicineRequest = new MedicineRequest();
            $Medicine = Medicine::create($request->validate($MedicineRequest->rules(), $MedicineRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine created successfully.',
                'data' => $Medicine,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    public function updateMedicine(Request $request)
    {
        try {
            $id = $request->route('id');

            $Medicine = Medicine::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Medicine) {
                return createError(404, 'Medicine not found');
            }
            $MedicineRequest = new MedicineRequest();

            $Medicine->update($request->validate($MedicineRequest->rules(), $MedicineRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine update successfully.',
                'data' => $Medicine,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function deleteMedicine($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $Medicine = Medicine::where('_id', $id)->where('isDeleted', false)->first();
            if (!$Medicine) {
                return createError(404, 'Medicine not found');
            }

            $Medicine->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine deleted successfully.',
                'data' => $Medicine,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
