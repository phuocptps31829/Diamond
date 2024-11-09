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
        'services',
        'applicableObject',
        'orderCount',
        'isHidden',
        'isDeleted',
    ];

    protected $casts = [
        'name' => 'string',
        'image' => 'string',
        'shortDescription' => 'string',
        'details' => 'string',
        'isHidden' => 'boolean',
        'isDeleted' => 'boolean',
        'orderCount' => 'integer'
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

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
    public function setServicesAttribute($value)
    {
        $services = [];

        foreach ($value as $service) {
            if (isset($service['servicesID'])) {
                foreach ($service['servicesID'] as &$id) {
                    $id = new ObjectId($id);
                }
            }
            $services[] = $service;
        }

        $this->attributes['services'] = $services;
    }
    public function getTable()
    {
        return 'MedicalPackage';
    }
}
