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
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    protected $casts = [
        'userID' => 'object_id',
        'patientCode' => 'string',
        'occupation' => 'string',
        'insuranceCode' => 'integer',
        'ethnic' => 'string'
    ];
    public function setUserIDAttribute($value)
    {
        $this->attributes['userID'] = new ObjectId($value);
    }
    public function setHealthInformationAttribute($value)
    {
        $this->attributes['healthInformation'] = $value;
    }
    public function getTable()
    {
        return 'Patient';
    }
}
