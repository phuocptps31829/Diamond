<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Prescription extends Model
{
    use HasFactory;
    protected $fillable = [
        'resultID',
        'advice',
        'medicines',
        'isDeleted',
    ];

    protected $casts = [
        'advice' => 'string',
        'isDeleted' => 'boolean',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    protected $attributes = [
        'isDeleted' => false,
    ];
    public function setMedicinesAttribute($value)
    {
        $this->attributes['medicines'] = $value;
    }
    public function setResultIDAttribute($value)
    {
        $this->attributes['resultID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'Prescription';
    }
}
