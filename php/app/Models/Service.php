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
        'isHidden',
        'isDeleted',
    ];

    protected $casts = [
        'name' => 'string',
        'price' => 'string',
        'shortDescription' => 'integer',
        'image' => 'string',
        'details' => 'string',
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
    ];
    public function getTable()
    {
        return 'Service';
    }
}
