<?php

namespace App\Http\Controllers;
use App\Models\WorkSchedule;
use App\Http\Requests\WorkScheduleRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectId;

class WorkScheduleController extends Controller
{
    public function getAllWorkSchedule(Request $request)
    {
        try {
            $page = $request->get('page');
            $limit = $request->get('limitDocuments');
            $skip = $request->get('skip');
            $sortOptions = $request->get('sortOptions');

            $totalRecords = WorkSchedule::count();

            $workSchedule = WorkSchedule::
                skip($skip)
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
            $workSchedule = WorkSchedule::where('_id', $id)->first();

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
            $dataSchedule = $request->validate($workScheduleRequest->rules());
           $checkDay=WorkSchedule::where('day',$dataSchedule['day'])->where('doctorID',new ObjectId($dataSchedule['doctorID']))->first();
           if($checkDay){
               return createError(400,"Bác sĩ đã có lịch làm việc vào ngày ".Carbon::parse($dataSchedule['day'])->format('d/m/Y'));
           }
            $workSchedule = WorkSchedule::create($dataSchedule);
            return response()->json([
                'status' => 'success',
                'message' => 'Thêm lịch làm việc thành công!',
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
            $workScheduleRequest = new WorkScheduleRequest();
            $workSchedule = WorkSchedule::where('_id', $id)->first();

            if (!$workSchedule) {
                return createError(404, 'Không tìm thấy lịch làm việc!');
            }
            $dataSchedule = $request->validate($workScheduleRequest->update());
//            $checkDay=WorkSchedule::where('day',$dataSchedule['day'])->where('doctorID',new ObjectId($dataSchedule['doctorID']))->first();
            if($dataSchedule['day']==$workSchedule->day){
                $dataUpdate=$request->validate($workScheduleRequest->update());
                $workSchedule->update($dataUpdate);
            }else{
                \Log::info($dataSchedule['day']."  fdfd  ".$workSchedule->day);
                $checkWorkScheduleDoctor=WorkSchedule::where('doctorID',new ObjectId($dataSchedule['doctorID']))->where('day',$dataSchedule['day'])->first();
                if($checkWorkScheduleDoctor){
                    return createError(400,"Đã có lịch làm việc vào ngày ".Carbon::parse($dataSchedule['day'])->format('d/m/Y'));
                }
                $workSchedule->update($request->validate($workScheduleRequest->update()));
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật lịch làm việc thành công!',
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
                return createError(400, 'ID Không được trống!');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'ID không hợp lệ!');
            }

            $workSchedule = WorkSchedule::where('_id', $id)->first();
            if (!$workSchedule) {
                return createError(404, 'Không tìm thấy lịch làm việc!');
            }
            $workSchedule->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Xóa lịch làm việc thành công!',
                'data' => $workSchedule,
            ], 200);
        } catch (\Exception $e) {
               return handleException($e);
        }
    }
}
