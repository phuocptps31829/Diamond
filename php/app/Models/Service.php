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
        'orderCount' => 0,
    ];

    public function getTable()
    {
        return 'Service';
    }  // Quan hệ với Prescription (nếu có Prescription)
    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'resultID');
    }

    // Quan hệ với Service (nếu có kết quả cho dịch vụ)
    public function specialty()
    {
        return $this->belongsTo(Specialty::class, 'serviceID');
    }
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (Appointment::where("serviceID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có lịch hẹn khám!');
            }
        });
    }

}
