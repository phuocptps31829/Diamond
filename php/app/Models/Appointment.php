<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
        'isDeleted',
    ];

    protected $casts = [
        'type' => 'string',
        'time' => 'string',
        'status' => 'string',
        'isDeleted' => 'boolean',
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
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Appointment';
    }
}
