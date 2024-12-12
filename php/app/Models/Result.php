<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Result extends Model
{
    use HasFactory;
    protected $fillable = [
        'serviceID',
        'appointmentID',
        'diagnose',
        'images',
        'description'
    ];

    protected $casts = [
        'name' => 'string'
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setServiceIDAttribute($value)
    {
        $this->attributes['serviceID'] = new ObjectId($value);
    }
    public function setAppointmentIDAttribute($value)
    {
        $this->attributes['appointmentID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'Result';
    }


    // Quan hệ với Prescription (nếu có Prescription)
    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'resultID');
    }

    // Quan hệ với Service (nếu có kết quả cho dịch vụ)
    public function service()
    {
        return $this->belongsTo(Service::class, 'serviceID');
    }
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (Prescription::where("resultID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có đơn thuốc!');
            }
        });
    }
}
