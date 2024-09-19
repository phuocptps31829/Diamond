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
        'medicinePackageID',
        'WorkScheduleID',
        'appointmentHelpID',
        'type',
        'time',
        'status',
        'payment',
        'isDeleted',
    ];

    protected $casts = [
        'patientID' => 'object_id',
        'serviceID' => 'object_id',
        'medicinePackageID' => 'string',
        'WorkScheduleID' => 'string',
        'appointmentHelpID' => 'string',
        'type' => 'string',
        'time' => 'string',
        'status' => 'string',
        'payment' => 'array',
        'isDeleted' => 'boolean',
    ];
    public function setPatientIDAttribute($value)
    {
        $this->attributes['patientID'] = new ObjectId($value);
    }
    public function setServiceIDAttribute($value)
    {
        $this->attributes['serviceID'] = new ObjectId($value);
    }
    public function setMedicinePackageIDAttribute($value)
    {
        $this->attributes['medicinePackageID'] = new ObjectId($value);
    }
    public function setWorkScheduleIDAttribute($value)
    {
        $this->attributes['WorkScheduleID'] = new ObjectId($value);
    }
    public function setAppointmentHelpIDAttribute($value)
    {
        $this->attributes['appointmentHelpID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Clinic';
    }
}