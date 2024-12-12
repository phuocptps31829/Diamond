<?php

namespace App\Models;

use App\Events\NotificationsEvent;
use App\Mail\SendMailNewAppointment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Mail;
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
        static::updated(function ($model) {
                $redirect = new \stdClass();
                $redirect->endpoint = 'appointments';
                $redirect->_id = $model->id;
                $time=Carbon::parse($model->time);
                Notification::create([
                    "userID" => $model->patientID,
                    "title" => "Chú ý!",
                    'description' => "Lịch hẹn vào {$time->format('H:i')} ngày {$time->format('d-m-Y')} đã có thay đổi!",
                    "type" => 0,
                    "isRead" => false,
                    "redirect" => $redirect
                ]);
                $ids[]=$model->patientID;
                $patient=User::find($model->patientID);
                callNotification($patient->phoneNumber,"
                    Xin chào đây là cuộc gọi đến từ y khoa diamond, xin thông báo lịch hẹn của bạn có thay đổi xin mời vào website hoặc ứng dụng diamond để xem chi tiết.
                    ");
            $ids[]=$model->patientID;
            event(new NotificationsEvent($ids));
        });

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
                    .Carbon::parse($model->time)->format('H:i')
                    . ' ngày ' . Carbon::parse($model->time)->format('d-m-Y')
                    . " đã được tạo thành công!",
                "type" => 0,
                "isRead" => false,
                "redirect" => $redirect
            ]);
            $ids[] = $model->patientID;
            event(new NotificationsEvent($ids));
//            Gửi mail thông báo qua hàng đợi
            $patient=User::find($model->patientID);
            if (isset($patient->email) && $patient->email != "") {
                $data['fullName'] ='';
                if (isset($patient->gender)) {
                    if ($patient->gender === 'Nam') {
                        $data['fullName'] .= ' anh ';
                    } elseif ($patient->gender === 'Nữ') {
                        $data['fullName'] .= ' chị ';
                    }
                }
                if(isset($model->serviceID)){
                    $service=Service::find($model->serviceID);
                    $data['nameService'] = $service->name;
                }else{
                    $medicalPackage=MedicalPackage::find($model->medicalPackageID);
                    $data['nameService'] = $medicalPackage->name;
                }
                $data['fullName'] .= $patient->fullName;
                $data['userName'] = $patient->fullName;
                $data['time'] =  Carbon::parse($model->time)->format('H:i d-m-Y');
                $data['address'] = $patient->address;
                Mail::to($patient->email)->queue(new SendMailNewAppointment($data));
            }
        });

        static::deleting(function ($model) {
            throw new \App\Exceptions\DataExistsException('Không thể xóa!', 400);
        });


    }

}
