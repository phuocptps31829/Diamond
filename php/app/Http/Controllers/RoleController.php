<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;

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
 *             @OA\Property(property="name", type="string", example="New Role")
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
 *             @OA\Property(property="name", type="string", example="New Role")
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
            $Role = Role::create($request->validate($RoleRequest->rules(), $RoleRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Role created successfully.',
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

            $Role = Role::where('_id', $id)->first();

            if (!$Role) {
                return createError(404, 'Role not found');
            }
            $RoleRequest = new RoleRequest();

            $Role->update($request->validate($RoleRequest->rules(), $RoleRequest->messages()));

            return response()->json([
                'status' => 'success',
                'message' => 'Role update successfully.',
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
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $Role = Role::where('_id', $id)->first();
            if (!$Role) {
                return createError(404, 'Role not found');
            }

            $Role->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Role deleted successfully.',
                'data' => $Role,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
