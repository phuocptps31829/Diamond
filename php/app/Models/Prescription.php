<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Casts\ObjectId;

class Prescription extends Model
{
    use HasFactory;
    protected $fillable = [
        'advice',
        'medicines',
        'isDeleted',
    ];

    protected $casts = [
        'advice' => 'string',
        'medicines' => 'array',
        'isDeleted' => 'boolean',
    ];

    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Prescription';
    }
}