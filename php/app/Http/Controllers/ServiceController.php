<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Requests\ServiceRequest;
use MongoDB\BSON\ObjectId;

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
 *     description="API để thêm một dịch vụ mới vào hệ thống.",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"specialtyID", "name", "price", "shortDescription", "image", "details", "discountPrice", "duration", "isHidden", "applicableObject"},
 *             @OA\Property(property="specialtyID", type="string", example="674b4e121fb4a41e2108f653", description="ID của chuyên môn"),
 *             @OA\Property(property="name", type="string", example="Name of the new Service", description="Tên của dịch vụ"),
 *             @OA\Property(property="price", type="number", example=32443242, description="Giá của dịch vụ"),
 *             @OA\Property(property="shortDescription", type="string", example="content of the new Service", description="Mô tả ngắn về dịch vụ"),
 *             @OA\Property(property="image", type="string", example="author of the new Service", description="Hình ảnh minh họa của dịch vụ"),
 *             @OA\Property(property="details", type="string", example="detail", description="Chi tiết đầy đủ của dịch vụ"),
 *             @OA\Property(property="discountPrice", type="number", example=312412, description="Giá sau giảm giá"),
 *             @OA\Property(property="duration", type="number", example=2342, description="Thời gian thực hiện dịch vụ (tính bằng phút)"),
 *             @OA\Property(property="isHidden", type="boolean", example=false, description="Trạng thái ẩn/hiện của dịch vụ"),
 *             @OA\Property(
 *                 property="applicableObject",
 *                 type="object",
 *                 required={"gender", "age", "isFamily"},
 *                 @OA\Property(property="gender", type="string", example="Nam", description="Giới tính áp dụng"),
 *                 @OA\Property(
 *                     property="age",
 *                     type="object",
 *                     required={"min", "max"},
 *                     @OA\Property(property="min", type="integer", example=0, description="Tuổi tối thiểu"),
 *                     @OA\Property(property="max", type="integer", example=100, description="Tuổi tối đa")
 *                 ),
 *                 @OA\Property(property="isFamily", type="boolean", example=true, description="Áp dụng cho gia đình hay không")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Service added successfully"),
 *             @OA\Property(property="data", type="object", description="Thông tin chi tiết của dịch vụ mới được tạo")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input data",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Invalid specialtyID or other required fields are missing")
 *         )
 *     )
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
 *             required={"specialtyID", "name", "price", "shortDescription", "image", "details", "discountPrice", "duration", "isHidden", "applicableObject"},
 *             @OA\Property(property="specialtyID", type="string", example="674b4e121fb4a41e2108f653", description="ID của chuyên môn"),
 *             @OA\Property(property="name", type="string", example="Name of the new Service", description="Tên của dịch vụ"),
 *             @OA\Property(property="price", type="number", example=32443242, description="Giá của dịch vụ"),
 *             @OA\Property(property="shortDescription", type="string", example="content of the new Service", description="Mô tả ngắn về dịch vụ"),
 *             @OA\Property(property="image", type="string", example="author of the new Service", description="Hình ảnh minh họa của dịch vụ"),
 *             @OA\Property(property="details", type="string", example="detail", description="Chi tiết đầy đủ của dịch vụ"),
 *             @OA\Property(property="discountPrice", type="number", example=312412, description="Giá sau giảm giá"),
 *             @OA\Property(property="duration", type="number", example=2342, description="Thời gian thực hiện dịch vụ (tính bằng phút)"),
 *             @OA\Property(property="isHidden", type="boolean", example=false, description="Trạng thái ẩn/hiện của dịch vụ"),
 *             @OA\Property(
 *                 property="applicableObject",
 *                 type="object",
 *                 required={"gender", "age", "isFamily"},
 *                 @OA\Property(property="gender", type="string", example="Nam", description="Giới tính áp dụng"),
 *                 @OA\Property(
 *                     property="age",
 *                     type="object",
 *                     required={"min", "max"},
 *                     @OA\Property(property="min", type="integer", example=0, description="Tuổi tối thiểu"),
 *                     @OA\Property(property="max", type="integer", example=100, description="Tuổi tối đa")
 *                 ),
 *                 @OA\Property(property="isFamily", type="boolean", example=true, description="Áp dụng cho gia đình hay không")
 *             )
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

            $totalRecords = Service::count();

            $Services = Service::
                skip($skip)
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
            $Service = Service::where('_id', new ObjectId($id))->first();

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
            $Service = Service::create($request->validate($ServiceRequest->rules()));

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm dịch vụ thành công!',
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
            $Service = Service::where('_id',new ObjectId( $id))->first();
            if (!$Service) {
                return createError(404, 'Không tìm thấy dịch vụ!');
            }
            $ServiceRequest = new ServiceRequest();
            $Service->update($request->validate($ServiceRequest->update()));

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật dịch vụ thành công!',
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
                return createError(400, 'ID không được trống');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ');
            }

            $Service = Service::where('_id', $id)->first();

            if (!$Service) {
                return createError(404, 'Không tìm thấy dịch vụ!');
            }

            $Service->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Xóa dịch vụ thành công!',
                'data' => $Service,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
