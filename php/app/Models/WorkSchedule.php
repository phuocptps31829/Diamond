<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Casts\ObjectId;

class WorkSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'doctorID',
        'clinicID',
        'hour',
        'isDeleted',
    ];

    protected $casts = [
        'doctorID' => 'object_id',
        'clinic' => 'string',
        'hour' => 'array',
    ];
    public function setDoctorIDAttribute($value)
    {
        $this->attributes['doctorID'] = new ObjectId($value);
    }

    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'WorkSchedule';
    }
}