<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'workingTime',
        'name',
        'imageURL',
        'address',
        'hotline',
        'coordinates',
        'isDeleted'
    ];

    protected $casts = [
        'imageURL' => 'array',
        'name' => 'string',
        'address' => 'string',
        'workingTime' => 'string',
        'hotline' => 'string',
        'coordinates' => 'array',
        'isDeleted' => 'boolean',
    ];

    // Đặt giá trị mặc định
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Branch';
    }
}