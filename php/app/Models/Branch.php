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
        'name' => 'string',
        'address' => 'string',
        'workingTime' => 'string',
        'hotline' => 'string',
        'isDeleted' => 'boolean',
    ];

    // Đặt giá trị mặc định
    protected $attributes = [
        'isDeleted' => false,
    ];
    public function setImageURLAttribute($value)
    {
        $this->attributes['imageURL'] = $value;
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
