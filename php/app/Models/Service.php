<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'specialtyID',
        'name',
        'price',
        'shortDescription',
        'image',
        'details',
        'discountPrice',
        'duration',
        'slug',
        'orderCount',
        'applicableObject',
        'isHidden',
        'isDeleted',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    protected $casts = [
        'name' => 'string',
        'price' => 'string',
        'shortDescription' => 'string',
        'image' => 'string',
        'details' => 'string',
        'orderCount' => 'integer',
        'discountPrice' => 'string',
        'duration' => 'string',
        'isHidden' => 'boolean',
        'isDeleted' => 'boolean',
    ];
    public static function createSlug($name)
    {
        return Str::slug($name);
    }
    public function setSpecialtyIDAttribute($value)
    {
        $this->attributes['specialtyID'] = new ObjectId($value);
    }

    protected $attributes = [
        'isDeleted' => false,
        'orderCount' => 0,
    ];

    public function getTable()
    {
        return 'Service';
    }
}
