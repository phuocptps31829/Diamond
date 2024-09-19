<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class ApplicableObject extends Model
{
    use HasFactory;
    protected $fillable = [
        'medicalPackageID',
        'gender',
        'age',
        'isMarred',
        'isFamily',
        'isDeleted',
    ];

    protected $casts = [
        'gender' => 'string',
        'age' => 'array',
        'isMarred' => 'boolean',
        'isFamily' => 'boolean',
        'isDeleted' => 'boolean',
    ];

    public function setMedicalPackageIDAttribute($value)
    {
        $this->attributes['medicalPackageID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'ApplicableObject';
    }
}