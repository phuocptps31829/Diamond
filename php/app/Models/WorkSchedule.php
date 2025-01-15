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

        static::updating(function ($model) {
            if (Appointment::where("WorkScheduleID", new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể cập nhật đã có lịch khám!');
            }
        });

        static::updated(function ($model) {
            $appointment = Appointment::where("WorkScheduleID", new ObjectId($model->_id))->first();
            $ids=[];
//            Thông báo cho bác sĩ lịch làm việc đã thay dổi
            $beforeModel=$model->getOriginal();
            $redirectDoctor = new \stdClass();
            $redirectDoctor->endpoint = 'work-schedules';
            $redirectDoctor->_id = $model->id;
            Notification::create([
                "userID" => $model->doctorID,
                "title" => "Chú ý!",
                'description' => 'Lịch làm việc lúc '
                    . $beforeModel['hour']['startTime'] . ' đến '
                    . $beforeModel['hour']['endTime'] . ' ngày '
                    . Carbon::parse($beforeModel['day'])->format('d-m-Y')
                    ." đã được thay đổi thành "
                    . $model['hour']['startTime'] . ' đến '
                    . $model['hour']['endTime'] . ' ngày '
                    . Carbon::parse($model['day'])->format('d-m-Y')
                ,
                "type" => 0,
                "isRead" => false,
                "redirect" => $redirectDoctor
            ]);
            $ids[]=$model->doctorID;

            event(new NotificationsEvent($ids));
        });

        static::created(function ($model) {
            sendNotification(
                $model->doctorID,
                "Lưu ý!",
                "Bạn có lịch làm việc vào lúc "
                . $model->hour['startTime'] . ' đến '
                . $model->hour['endTime'] . ' ngày '
                . Carbon::parse($model->day)->format('d-m-Y'),
                0,
                "work-schedules",
                $model->id,
            );
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
