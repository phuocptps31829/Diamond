<?php

namespace App\Http\Controllers;

use App\Models\Specialty;
use Illuminate\Http\Request;
use App\Http\Requests\SpecialtyRequest;

/**
 * @OA\Get(
 *     path="/api/v1/specialties",
 *     tags={"Specialty Routes"},
 *     summary="Get all specialties",
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
 *     path="/api/v1/specialties/{id}",
 *     tags={"Specialty Routes"},
 *     summary="Get one specialty",
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
 *     path="/api/v1/specialties/add",
 *     tags={"Specialty Routes"},
 *     summary="Add a Specialty",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="name", type="string", example="New Specialty"),
 *             @OA\Property(property="image", type="string", example="Description of the new specialty"),
 *             @OA\Property(property="description", type="string", example="Description of the new specialty")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 *  @OA\put(
 *     path="/api/v1/specialties/update/{id}",
 *     tags={"Specialty Routes"},
 *     summary="Update specialty",
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
 *             @OA\Property(property="name", type="string", example="New Specialty"),
 *             @OA\Property(property="image", type="string", example="Description of the new specialty"),
 *             @OA\Property(property="description", type="string", example="Description of the new specialty")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\delete(
 *     path="/api/v1/specialties/delete/{id}",
 *     tags={"Specialty Routes"},
 *     summary="Update specialty",
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

class SpecialtyController extends Controller
{
    public function getAllSpecialties(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Specialty::where('isDeleted', false)->count();

            $specialties = Specialty::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Specialties retrieved successfully.',
                'data' => $specialties,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneSpecialty(Request $request)
    {
        try {
            $id = $request->route('id');
            $specialty = Specialty::where('_id', $id)->where('isDeleted', false)->first();

            if (!$specialty) {
                return createError(404, 'Specialty not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Specialties retrieved successfully.',
                'data' => $specialty,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createSpecialty(Request $request)
    {
        try {
            $SpecialtyRequest = new SpecialtyRequest();
            $specialty = Specialty::create($request->validate($SpecialtyRequest->rules(), $SpecialtyRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Specialty created successfully.',
                'data' => $specialty,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    public function updateSpecialty(Request $request)
    {
        try {
            $id = $request->route('id');

            $specialty = Specialty::where('_id', $id)->where('isDeleted', false)->first();

            if (!$specialty) {
                return createError(404, 'Specialty not found');
            }
            $specialtyRequest = new SpecialtyRequest();

            $specialty->update($request->validate($specialtyRequest->rules(), $specialtyRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Specialty update successfully.',
                'data' => $specialty,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function deleteSpecialty($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $specialty = Specialty::where('_id', $id)->where('isDeleted', false)->first();
            if (!$specialty) {
                return createError(404, 'Specialty not found');
            }

            $specialty->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Specialty deleted successfully.',
                'data' => $specialty,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
