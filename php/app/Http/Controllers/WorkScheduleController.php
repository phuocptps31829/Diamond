<?php

namespace App\Http\Controllers;
use App\Models\WorkSchedule;
use App\Http\Requests\WorkScheduleRequest;
use Illuminate\Http\Request;

class WorkScheduleController extends Controller
{
    public function getAllWorkSchedule(Request $request)
    {
        try {
            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = WorkSchedule::where('isDeleted', false)->count();

            $workSchedule = WorkSchedule::where('isDeleted', false)
                ->skip($skip)
                ->take($limit)
                ->orderBy(key($sortOptions), current($sortOptions))
                ->get();

            return response()->json([
                'page' => $page,
                'message' => 'WorkSchedule retrieved successfully.',
                'data' => $workSchedule,
                'totalRecords' => $totalRecords,
            ], 200);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }

    public function getOneWorkSchedule(Request $request)
    {
        try {
            $id = $request->route('id');
            $workSchedule = WorkSchedule::where('_id', $id)->where('isDeleted', false)->first();

            if (!$workSchedule) {
                return createError(404, 'WorkSchedule not found');
            }

            return response()->json([
                'status' => 'success',
                'message' => 'WorkSchedule retrieved successfully.',
                'data' => $workSchedule,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }

    public function createWorkSchedule(Request $request)
    {
        try {
            $workScheduleRequest = new workScheduleRequest();
            $workSchedule = WorkSchedule::create($request->validate($workScheduleRequest->rules()));
            return response()->json([
                'status' => 'success',
                'message' => 'WorkSchedule created successfully.',
                'data' => $workSchedule,
            ], 201);
        } catch (\Exception $e) {

               return handleException($e);
        }
    }
    public function updateWorkSchedule(Request $request)
    {
        try {
            $id = $request->route('id');

            $workSchedule = WorkSchedule::where('_id', $id)->where('isDeleted', false)->first();

            if (!$workSchedule) {
                return createError(404, 'WorkSchedule not found');
            }

            $workScheduleRequest = new WorkScheduleRequest();

            $workSchedule->update($request->validate($workScheduleRequest->update()));

            return response()->json([
                'status' => 'success',
                'message' => 'News update successfully.',
                'data' => $workSchedule,
            ], 201);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
    public function deleteWorkSchedule($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $workSchedule = WorkSchedule::where('_id', $id)->where('isDeleted', false)->first();
            if (!$workSchedule) {
                return createError(404, 'WorkSchedule not found');
            }

            $workSchedule->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'WorkSchedule deleted successfully.',
                'data' => $workSchedule,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
