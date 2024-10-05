<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Casts\ObjectId;

class Result extends Model
{
    use HasFactory;
    protected $fillable = [
        'serviceID',
        'appointmentID',
        'diagnose',
        'images',
        'description',
        'isDeleted',
    ];

    protected $casts = [
        'serviceID' => 'object_id',
        'specialtyID' => 'object_id',
        'name' => 'string',
        'isDeleted' => 'boolean',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setServiceIDAttribute($value)
    {
        $this->attributes['serviceID'] = new ObjectId($value);
    }
    public function setAppointmentIDAttribute($value)
    {
        $this->attributes['appointmentID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Result';
    }
}
