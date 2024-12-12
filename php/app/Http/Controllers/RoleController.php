<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;
use MongoDB\BSON\ObjectId;

/**
 * @OA\Get(
 *     path="/api/v1/roles",
 *     tags={"Role Routes"},
 *     summary="Get all roles",
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
 *     path="/api/v1/roles/{id}",
 *     tags={"Role Routes"},
 *     summary="Get one Role",
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
 *     path="/api/v1/roles/add",
 *     tags={"Role Routes"},
 *     summary="Add a Role",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="name", type="string", example="New Role"),
 *             @OA\Property(property="description", type="string", example="Description New Role")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     ),
 * )
 *  @OA\put(
 *     path="/api/v1/roles/update/{id}",
 *     tags={"Role Routes"},
 *     summary="Update Role",
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
 *             @OA\Property(property="name", type="string", example="New Role"),
 *              @OA\Property(property="description", type="string", example="Description New Role")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 *  @OA\delete(
 *     path="/api/v1/roles/delete/{id}",
 *     tags={"Role Routes"},
 *     summary="Update Role",
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

class RoleController extends Controller
{
    public function getAllroles(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = Role::count();

            $roles = Role::
                skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'roles retrieved successfully.',
                'data' => $roles,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneRole(Request $request)
    {
        try {
            $id = $request->route('id');
            $Role = Role::where('_id', $id)->first();

            if (!$Role) {
                return createError(404, 'Role not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'roles retrieved successfully.',
                'data' => $Role,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createRole(Request $request)
    {
        try {
            $RoleRequest = new RoleRequest();
            $Role = Role::create($request->validate($RoleRequest->rules()));

            return response()->json([
                'status' => 'success',
                'message' => 'Tạo Role thành công!',
                'data' => $Role,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    public function updateRole(Request $request)
    {
        try {
            $id = $request->route('id');
            $Role = Role::where('_id', new ObjectId($id))->first();

            if (!$Role) {
                return createError(404, 'Không tim thấy Role');
            }
            $RoleRequest = new RoleRequest();
            $Role->update($request->validate($RoleRequest->update()));

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật Role thành công!',
                'data' => $Role,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function deleteRole($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID không được trống');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ');
            }

            $Role = Role::where('_id', $id)->first();
            if (!$Role) {
                return createError(404, 'Không tìm thấy Role');
            }
            $Role->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xóa Role thành công!',
                'data' => $Role,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
