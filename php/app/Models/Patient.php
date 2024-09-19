<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Casts\ObjectId;

class Patient extends Model
{
    use HasFactory;
    protected $fillable = [
        'userID',
        'patientCode',
        'occupation',
        'insuranceCode',
        'ethnic',
        'healthInformation',
    ];

    protected $casts = [
        'userID' => 'object_id',
        'patientCode' => 'string',
        'occupation' => 'string',
        'insuranceCode' => 'integer',
        'ethnic' => 'string',
        'healthInformation' => 'array',
    ];
    public function setUserIDAttribute($value)
    {
        $this->attributes['userID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'Patient';
    }
}