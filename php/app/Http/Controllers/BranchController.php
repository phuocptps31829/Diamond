<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use App\Http\Requests\BranchRequest;

/**
 * @OA\Get(
 *     path="/api/v1/branches",
 *     tags={"Branch Routes"},
 *     summary="Get all branches",
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
 *     path="/api/v1/branches/{id}",
 *     tags={"Branch Routes"},
 *     summary="Get one Branch",
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
 *     path="/api/v1/branches/add",
 *     tags={"Branch Routes"},
 *     summary="Add a Branch",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="name", type="string", example="New Branch"),
 *             @OA\Property(property="image", type="array",
 *                @OA\Items(
 *                 type="string",
 *                    example="image_url_1.jpg"
 *                    )
 *                  ),
 *             @OA\Property(property="address", type="string", example="address of the new Branch"),
 *             @OA\Property(property="workingTime", type="string", example="2024-12-05"),
 *             @OA\Property(property="hotline", type="string", example="hotline of the new Branch"),
 *              @OA\Property(
 *                  property="coordinates",
 *                  type="object",
 *                  @OA\Property(property="Ing", type="number", example="10.762622"),
 *                  @OA\Property(property="Lat", type="number", example="106.660172")
 *               ),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 *  @OA\put(
 *     path="/api/v1/branches/update/{id}",
 *     tags={"Branch Routes"},
 *     summary="Update Branch",
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
 *             @OA\Property(property="name", type="string", example="New Branch"),
 *             @OA\Property(property="image", type="array",
 *                @OA\Items(
 *                 type="string",
 *                    example="image_url_1.jpg"
 *                    )
 *                  ),
 *             @OA\Property(property="address", type="string", example="address of the new Branch"),
 *             @OA\Property(property="workingTime", type="string", example="2024-12-05"),
 *             @OA\Property(property="hotline", type="string", example="hotline of the new Branch"),
 *              @OA\Property(
 *                  property="coordinates",
 *                  type="object",
 *                  @OA\Property(property="Ing", type="number", example="10.762622"),
 *                  @OA\Property(property="Lat", type="number", example="106.660172")
 *               ),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\delete(
 *     path="/api/v1/branches/delete/{id}",
 *     tags={"Branch Routes"},
 *     summary="Update Branch",
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

class BranchController extends Controller
{
    public function getAllBranches(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Branch::where('isDeleted', false)->count();

            $branches = Branch::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'branches retrieved successfully.',
                'data' => $branches,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    public function getOneBranch(Request $request)
    {
        try {
            $id = $request->route('id');
            $Branch = Branch::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Branch) {
                return createError(404, 'Branch not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'branches retrieved successfully.',
                'data' => $Branch,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }

    public function createBranch(Request $request)
    {
        try {

            $BranchRequest = new BranchRequest();
            $Branch = Branch::create($request->validate($BranchRequest->rules(), $BranchRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Branch created successfully.',
                'data' => $Branch,
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    public function updateBranch(Request $request)
    {
        try {
            $id = $request->route('id');

            $Branch = Branch::where('_id', $id)->where('isDeleted', false)->first();

            if (!$Branch) {
                return createError(404, 'Branch not found');
            }
            $BranchRequest = new BranchRequest();

            $Branch->update($request->validate($BranchRequest->rules(), $BranchRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Branch update successfully.',
                'data' => $Branch,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
    public function deleteBranch($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $Branch = Branch::where('_id', $id)->where('isDeleted', false)->first();
            if (!$Branch) {
                return createError(404, 'Branch not found');
            }

            $Branch->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Branch deleted successfully.',
                'data' => $Branch,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'fail',
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}