<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Str;

class MedicalPackage extends Model
{
    use HasFactory;
    protected $fillable = [
        'specialtyID',
        'name',
        'image',
        'shortDescription',
        'details',
        'slug',
        'service',
        'isHidden',
        'isDeleted',
    ];

    protected $casts = [
        'name' => 'string',
        'image' => 'string',
        'shortDescription' => 'string',
        'details' => 'string',
        'services' => 'array',
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
        return 'MedicalPackage';
    }
}
