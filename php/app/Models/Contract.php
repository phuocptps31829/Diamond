<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'doctorID',
        'hospitalID',
        'startDate',
        'endDate',
        'detail',
        'isDeleted',
    ];

    protected $casts = [
        'doctorID' => 'object_id',
        'hospitalID' => 'object_id',
        'startDate' => 'string',
        'endDate' => 'integer',
        'detail' => 'string',
        'isDeleted' => 'boolean',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setDoctorIDAttribute($value)
    {
        $this->attributes['doctorID'] = new ObjectId($value);
    }
    public function setHospitalIDAttribute($value)
    {
        $this->attributes['hospitalID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Contract';
    }
}
