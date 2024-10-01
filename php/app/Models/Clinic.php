<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Clinic extends Model
{
    use HasFactory;
    protected $fillable = [
        'branchID',
        'specialtyID',
        'name',
        'isDeleted',
    ];

    protected $casts = [
        'name' => 'string',
        'isDeleted' => 'boolean',
    ];

    public function setBranchIDAttribute($value)
    {
        $this->attributes['branchID'] = new ObjectId($value);
    }
    public function setSpecialtyIDAttribute($value)
    {
        $this->attributes['specialtyID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Clinic';
    }
}