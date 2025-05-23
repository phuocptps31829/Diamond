<?php

namespace App\Http\Controllers;

use App\Models\MedicalPackage;
use Illuminate\Http\Request;
use App\Http\Requests\MedicalPackageRequest;
use MongoDB\BSON\ObjectId;
use function PHPUnit\Framework\isEmpty;

/**
 * @OA\Get(
 *     path="/api/v1/medical-packages",
 *     tags={"Medical package Routes"},
 *     summary="Get all Medical packages",
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
 *     path="/api/v1/medical-packages/{id}",
 *     tags={"Medical package Routes"},
 *     summary="Get one Medical package",
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
 *     path="/api/v1/medical-packages/add",
 *     tags={"Medical package Routes"},
 *     summary="Add a Medical package",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="specialtyID", type="string", example="New MedicalPackage"),
 *             @OA\Property(property="name", type="string", example="name MedicalPackage"),
 *             @OA\Property(property="image", type="string", example="image MedicalPackage"),
 *             @OA\Property(property="shortDescription", type="string", example="shortDescription MedicalPackage"),
 *             @OA\Property(property="details", type="string", example="detail MedicalPackage"),
 *             @OA\Property(property="isHidden", type="boolean", example=false),
 *             @OA\Property(property="services", type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="servicesID", type="array",
 *                         @OA\Items(type="string", example="")
 *                     ),
 *                     @OA\Property(property="levelName", type="string", example="Level"),
 *                     @OA\Property(property="price", type="number", example=100),
 *                     @OA\Property(property="discountPrice", type="number", nullable=true, example=80),
 *                     @OA\Property(property="duration", type="number", nullable=true, example=80),
 *                 )
 *             ),
 *                  @OA\Property(
 *                  property="applicableObject",
 *                  type="object",
 *                  required={"gender", "age", "isFamily"},
 *                  @OA\Property(property="gender", type="string", example="Nam", description="Giới tính áp dụng"),
 *                  @OA\Property(
 *                      property="age",
 *                      type="object",
 *                      required={"min", "max"},
 *                      @OA\Property(property="min", type="integer", example=0, description="Tuổi tối thiểu"),
 *                      @OA\Property(property="max", type="integer", example=100, description="Tuổi tối đa")
 *                  ),
 *                  @OA\Property(property="isFamily", type="boolean", example=true, description="Áp dụng cho gia đình hay không")
 *              )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response"
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/medical-packages/update/{id}",
 *     tags={"Medical package Routes"},
 *     summary="Update Medical package",
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
 *             @OA\Property(property="specialtyID", type="string", example="New MedicalPackage"),
 *             @OA\Property(property="name", type="string", example="name MedicalPackage"),
 *             @OA\Property(property="image", type="string", example="image MedicalPackage"),
 *             @OA\Property(property="shortDescription", type="string", example="shortDescription MedicalPackage"),
 *             @OA\Property(property="details", type="string", example="detail MedicalPackage"),
 *             @OA\Property(property="isHidden", type="boolean", example=false),
 *             @OA\Property(property="services", type="array",
 *                 @OA\Items(
 *                     @OA\Property(property="servicesID", type="array",
 *                         @OA\Items(type="string", example="674a1b67c79d72a91103bad6")
 *                     ),
 *                     @OA\Property(property="levelName", type="string", example="Level"),
 *                     @OA\Property(property="price", type="number", example=100),
 *                     @OA\Property(property="discountPrice", type="number", nullable=true, example=80),
 *                     @OA\Property(property="duration", type="number", nullable=true, example=80),
 *                 )
 *             ),
 *                  @OA\Property(
 *                  property="applicableObject",
 *                  type="object",
 *                  required={"gender", "age", "isFamily"},
 *                  @OA\Property(property="gender", type="string", example="Nam", description="Giới tính áp dụng"),
 *                  @OA\Property(
 *                      property="age",
 *                      type="object",
 *                      required={"min", "max"},
 *                      @OA\Property(property="min", type="integer", example=0, description="Tuổi tối thiểu"),
 *                      @OA\Property(property="max", type="integer", example=100, description="Tuổi tối đa")
 *                  ),
 *                  @OA\Property(property="isFamily", type="boolean", example=true, description="Áp dụng cho gia đình hay không")
 *              )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Successful response",
 *     )
 * )
 * @OA\Delete(
 *     path="/api/v1/medical-packages/delete/{id}",
 *     tags={"Medical package Routes"},
 *     summary="Delete Medical package",
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

class MedicalPackageController extends Controller
{
    public function getAllMedicalPackages(Request $request)
    {
        try {

            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = MedicalPackage::count();

            $MedicineCategories = MedicalPackage::skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();
            $medicineCategoriesArray = $MedicineCategories->toArray();
            return response()->json([
                'page' => $page,
                'message' => 'Medicine categories retrieved successfully.',
                'data' => $medicineCategoriesArray,
                'totalRecords' => $totalRecords
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneMedicalPackage(Request $request)
    {
        try {
            $id = $request->route('id');
            $MedicalPackage = MedicalPackage::where('_id', $id)->first();

            if (!$MedicalPackage) {
                return createError(404, 'Medicine category not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Medicine category retrieved successfully.',
                'data' => $MedicalPackage,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createMedicalPackage(Request $request)
    {
        try {
            $MedicalPackageRequest = new MedicalPackageRequest();

            $checkSlug = checkSlug($request->name, 'MedicalPackage');

            if ($checkSlug) {
                $request->merge(['slug' => $checkSlug]);
            }
            $validatedData=$request->validate($MedicalPackageRequest->rules());

            foreach ($validatedData['services'] as &$service) {
                    $service['_id'] = new ObjectId();
            }

            $MedicalPackage = MedicalPackage::create($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Thêm gói khám thành công!',
                'data' => $MedicalPackage,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    public function updateMedicalPackage(Request $request)
    {
        try {
            $MedicalPackageRequest = new MedicalPackageRequest();
            $id = $request->route('id');
            $checkSlug = checkSlug($request->name, 'MedicalPackage', $id);

            if ($checkSlug) {
                $request->merge(['slug' => $checkSlug]);
            }
            $validatedData=$request->validate($MedicalPackageRequest->update());
           if(isset($validatedData['services'])){
               foreach ($validatedData['services'] as &$service) {
                   $service['_id'] = new ObjectId($service['_id']);
               }
           }

            $MedicalPackage = MedicalPackage::where('_id', $id)->first();

            if (!$MedicalPackage) {
                return createError(404, 'Không tìm thấy gói khám');
            }

            $MedicalPackage->update($validatedData);

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật gói khámt thành công!',
                'data' => $MedicalPackage,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function deleteMedicalPackage($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID không đươc bỏ trống!');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ!');
            }

            $MedicalPackage = MedicalPackage::where('_id', $id)->first();
            if (!$MedicalPackage) {
                return createError(404, 'Không tìm thấy gói khám!');
            }

            $MedicalPackage->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Xóa gói khám thành công!',
                'data' => $MedicalPackage,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
