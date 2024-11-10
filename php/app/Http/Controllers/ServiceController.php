<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Requests\ServiceRequest;

/**
 * @OA\Get(
 *     path="/api/v1/services",
 *     tags={"Service Routes"},
 *     summary="Get all Service",
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
 *     path="/api/v1/services/{id}",
 *     tags={"Service Routes"},
 *     summary="Get one Service",
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
 *     path="/api/v1/services/add",
 *     tags={"Service Routes"},
 *     summary="Add a Service",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={""},
 *             @OA\Property(property="specialtyID", type="string", example=""),
 *             @OA\Property(property="name", type="string", example="Name of the new Service"),
 *             @OA\Property(property="price", type="number", example=32443242),
 *             @OA\Property(property="shortDescription", type="string", example="content of the new Service"),
 *             @OA\Property(property="image", type="string", example="author of the new Service"),
 *             @OA\Property(property="detail", type="string", example="detail"),
 *             @OA\Property(property="discountPrice", type="number", example=312412),
 *             @OA\Property(property="duration", type="number", example=2342),
 *             @OA\Property(property="isHidden", type="boolean", example=false),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 *  @OA\put(
 *     path="/api/v1/services/update/{id}",
 *     tags={"Service Routes"},
 *     summary="Update Service",
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
 *             required={""},
 *             @OA\Property(property="specialtyID", type="string", example=""),
 *             @OA\Property(property="name", type="string", example="Name of the new Service"),
 *             @OA\Property(property="price", type="number", example=34224),
 *             @OA\Property(property="shortDescription", type="string", example="content of the new Service"),
 *             @OA\Property(property="image", type="string", example="author of the new Service"),
 *             @OA\Property(property="detail", type="string", example="detail"),
 *             @OA\Property(property="discountPrice", type="number", example=312412),
 *             @OA\Property(property="duration", type="number", example=2342),
 *             @OA\Property(property="isHidden", type="boolean", example=false),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\delete(
 *     path="/api/v1/services/delete/{id}",
 *     tags={"Service Routes"},
 *     summary="Update Service",
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

class ServiceController extends Controller
{


    public function getAllServices(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Service::where('isDeleted', false)->count();

            $Services = Service::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'Services retrieved successfully.',
                'data' => $Services,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneService(Request $request)
    {
        try {
            $id = $request->route('id');
            $Service = Service::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Service) {
                return createError(404, 'Service not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Service retrieved successfully.',
                'data' => $Service,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createService(Request $request)
    {
        try {
            $ServiceRequest = new ServiceRequest();

            $checkSlug = checkSlug($request->name, 'Service');

            if ($checkSlug) {
                $request->merge(['slug' => $checkSlug]);
            }

            $Service = Service::create($request->validate($ServiceRequest->rules(), $ServiceRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Service created successfully.',
                'data' => $Service,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    public function updateService(Request $request)
    {
        try {
            $id = $request->route('id');
            $checkSlug = checkSlug($request->name, 'Service', $id);

            if ($checkSlug) {
                $request->merge(['slug' => $checkSlug]);
            }

            $Service = Service::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Service) {
                return createError(404, 'Service not found');
            }
            $ServiceRequest = new ServiceRequest();

            $Service->update($request->validate($ServiceRequest->rules(), $ServiceRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Service update successfully.',
                'data' => $Service,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function deleteService($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $Service = Service::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Service) {
                return createError(404, 'Service not found');
            }

            $Service->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Service deleted successfully.',
                'data' => $Service,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
