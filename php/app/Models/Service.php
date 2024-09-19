<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'specialtyID',
        'name',
        'price',
        'shortDescription',
        'image',
        'detail',
        'discountPrice',
        'duration',
        'isHidden',
        'isDeleted',
    ];

    protected $casts = [
        'name' => 'string',
        'price' => 'string',
        'shortDescription' => 'integer',
        'image' => 'string',
        'detail' => 'string',
        'discountPrice' => 'string',
        'duration' => 'string',
        'isHidden' => 'boolean',
        'isDeleted' => 'boolean',
    ];

    public function setSpecialtyIDAttribute($value)
    {
        $this->attributes['specialtyID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isDeleted' => false,
    ];
    public function getTable()
    {
        return 'Service';
    }
}