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
        'isDeleted',
    ];

    protected $casts = [
        "isDeleted" => "boolean",
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
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'WorkSchedule';
    }
}
