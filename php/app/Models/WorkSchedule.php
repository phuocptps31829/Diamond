<?php

namespace App\Models;

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
        static::deleting(function ($model) {
            if (Appointment::where("WorkScheduleID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có dữ liệu lịch làm việc!');
            }
        });
    }
}
