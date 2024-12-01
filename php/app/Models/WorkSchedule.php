<?php

namespace App\Models;

use App\Events\NotificationsEvent;
use App\Http\Controllers\PatientController;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class WorkSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'doctorID',
        'clinicID',
        'day',
        'hour',
    ];


    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    public function setDoctorIDAttribute($value)
    {
        $this->attributes['doctorID'] = new ObjectId($value);
    }

    public function setClinicIDAttribute($value)
    {
        $this->attributes['clinicID'] = new ObjectId($value);
    }

    public function setHourAttribute($value)
    {
        $this->attributes['hour'] = $value;
    }

    public function getTable()
    {
        return 'WorkSchedule';
    }

    public static function boot()
    {
        parent::boot();
        static::updated(function ($model) {
            $appointment = Appointment::where("WorkScheduleID", new ObjectId($model->_id))->first();
            $ids=[];
            if ($appointment) {
//                  Tạo thông báo lịch làm việc của bác sĩ phụ trách đã bị thay đổi
                $redirect = new \stdClass();
                $redirect->endpoint = 'appointments';
                $redirect->_id = $appointment->id;
                Notification::create([
                    "userID" => $appointment->patientID,
                    "title" => "Chú ý!",
                    'description' => 'Lịch hẹn lúc ' . $appointment->hour['startTime'] . ' đến ' . $appointment->hour['endTime'] . ' ngày ' . Carbon::parse($appointment->day)->format('d-m-Y') . " bác sĩ phụ trách có thay đổi lịch làm việc!",
                    "type" => 0,
                    "isRead" => false,
                    "redirect" => $redirect
                ]);
                $ids[]=$appointment->patientID;

//                Gọi điện thông báo cho bệnh nhân về lịch khám đã có sự thay đổi
                $patient=User::find($appointment->patientID);
                    callNotification($patient->phoneNumber,"
                    Xin chào đây là cuộc gọi đến từ y khoa diamond, xin thông báo lịch hẹn của bạn có thay đổi xin mời vào website hoặc ứng dụng diamond để xem chi tiết.
                    ");
            }
//            Thông báo cho bác sĩ lịch làm việc đã thay dổi
            $beforeModel=$model->getOriginal();
            $redirectDoctor = new \stdClass();
            $redirectDoctor->endpoint = 'work-schedules';
            $redirectDoctor->_id = $model->id;
            Notification::create([
                "userID" => $model->doctorID,
                "title" => "Chú ý!",
                'description' => 'Lịch làm việc lúc '
                    . $beforeModel->hour['startTime'] . ' đến '
                    . $beforeModel->hour['endTime'] . ' ngày '
                    . Carbon::parse($beforeModel->day)->format('d-m-Y')
                    ." đã được thay đổi thành "
                    . $model->hour['startTime'] . ' đến '
                    . $model->hour['endTime'] . ' ngày '
                    . Carbon::parse($model->day)->format('d-m-Y')
                ,
                "type" => 0,
                "isRead" => false,
                "redirect" => $redirectDoctor
            ]);
            $ids[]=$model->doctorID;

            event(new NotificationsEvent($ids));
//            Gửi mail thông báo cho bác sĩ về lịch làm việc đã bị thay đổi
        });

        static::deleting(function ($model) {
            if (Appointment::where("WorkScheduleID", new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có dữ liệu lịch làm việc!');
            }
            sendNotification(
                $model->doctorID,
                "Lưu ý!",
                "Lịch làm việc "
                . $model->hour['startTime'] . ' đến '
                . $model->hour['endTime'] . ' ngày '
                . Carbon::parse($model->day)->format('d-m-Y')
                ." đã bị hủy.",
                  0,
                "work-schedules",
                $model->id,
            );

        });
    }
}
