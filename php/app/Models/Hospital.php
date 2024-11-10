<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Hospital extends Model
{
    use HasFactory;
    protected $fillable = [
        'image',
        'name',
        'address',
        'hotline',
        'isDeleted'
    ];

    protected $casts = [
        'image' => 'string',
        'name' => 'string',
        'address' => 'string',
        'hotline' => 'string',
        'isDeleted' => 'boolean',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    // Đặt giá trị mặc định
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Hospital';
    }
}
