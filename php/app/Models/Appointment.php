<?php

namespace App\Models;

use App\Events\NotificationsEvent;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Redis;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Appointment extends Model
{
    use HasFactory;
    protected $fillable = [
        'patientID',
        'serviceID',
        'medicalPackageID',
        'workScheduleID',
        'patientHelpID',
        'type',
        'time',
        'status',
        'payment',
    ];

    protected $casts = [
        'type' => 'string',
        'time' => 'string',
        'status' => 'string',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setPatientIDAttribute($value)
    {
        $this->attributes['patientID'] = new ObjectId($value);
    }
    public function setServiceIDAttribute($value)
    {
        $this->attributes['serviceID'] = new ObjectId($value);
    }
    public function setMedicalPackageIDAttribute($value)
    {
        $this->attributes['medicalPackageID'] = new ObjectId($value);
    }
    public function setWorkScheduleIDAttribute($value)
    {
        $this->attributes['workScheduleID'] = new ObjectId($value);
    }
    public function setAppointmentHelpIDAttribute($value)
    {
        $this->attributes['patientHelpID'] = new ObjectId($value);
    }
    public function setPaymentAttribute($value)
    {
        $this->attributes['payment'] = $value;
    }

    public function getTable()
    {
        return 'Appointment';
    }
    public function Specialty()
    {
        $this->belongsTo(Specialty::class, 'specialtyID', '_id');
    }

    protected static function booted()
    {
        static::created(function ($model) {
            $existingAppointments = Redis::get('upcomingAppointments');
            $appointments = $existingAppointments ? json_decode($existingAppointments, true) : [];
            $appointments[] = $model;
            Redis::set('upcomingAppointments', json_encode($appointments));

//          Tạo thông báo lịch làm việc của bác sĩ phụ trách đã bị thay đổi
            $redirect = new \stdClass();
            $redirect->endpoint = 'appointments';
            $redirect->_id = $model->id;
            Notification::create([
                "userID" => $model->patientID,
                "title" => "Lịch hẹn!",
                'description' => 'Lịch hẹn  '
                    . $model->hour['startTime']
                    . ' đến ' . $model->hour['endTime']
                    . ' ngày ' . Carbon::parse($model->day)->format('d-m-Y')
                    . " đã được tạo thành công!",
                "type" => 0,
                "isRead" => false,
                "redirect" => $redirect
            ]);
            $ids[] = $model->patientID;
            event(new NotificationsEvent($ids));
        });

        static::deleting(function ($model) {
            throw new \App\Exceptions\DataExistsException('Không thể xóa!', 400);
        });


    }

}
