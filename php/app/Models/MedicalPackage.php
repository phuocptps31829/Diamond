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
        'isHidden'
    ];

    protected $casts = [
        'name' => 'string',
        'image' => 'string',
        'shortDescription' => 'string',
        'details' => 'string',
        'isHidden' => 'boolean',
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
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (Appointment::where("medicalPackageID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có lịch hẹn khám!');
            }
        });
    }
}
