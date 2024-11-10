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
        'imagesURL',
        'address',
        'hotline',
        'coordinates',
        'isDeleted'
    ];

    protected $casts = [
        'name' => 'string',
        'address' => 'string',
        'workingTime' => 'string',
        'hotline' => 'string',
        'isDeleted' => 'boolean',
    ];

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    // Đặt giá trị mặc định
    protected $attributes = [
        'isDeleted' => false,
    ];
    public function setImageURLAttribute($value)
    {
        $this->attributes['imagesURL'] = $value;
    }
    public function setCoordinatesAttribute($value)
    {
        $this->attributes['coordinates'] = $value;
    }
    public function getTable()
    {
        return 'Branch';
    }
}
