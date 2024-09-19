<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'patientID',
        'appointmentID',
        'prescriptionID',
        'price',
        'arisePrice',
        'isDeleted',
    ];

    protected $casts = [
        'patientID' => 'object_id',
        'appointmentID' => 'object_id',
        'prescriptionID' => 'object_id',
        'price' => 'integer',
        'arisePrice' => 'integer',
        'isDeleted' => 'boolean',
    ];
    public function setPatientIDAttribute($value)
    {
        $this->attributes['patientID'] = new ObjectId($value);
    }
    public function setAppointmentIDAttribute($value)
    {
        $this->attributes['appointmentID'] = new ObjectId($value);
    }
    public function setPrescriptionIDAttribute($value)
    {
        $this->attributes['prescriptionID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Invoice';
    }
}