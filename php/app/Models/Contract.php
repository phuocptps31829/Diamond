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
        'time',
        "address",
        "title",
        "file",
        "price",
        "agent",
        "position",
        "tin",
        "name",
        "accountNumber",
        "bankName",
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

    public function getTable()
    {
        return 'Contract';
    }
}
