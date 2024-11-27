<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;

class Specialty extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'name',
        'isHidden'
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    protected $casts = [
        'image' => 'string',
        'name' => 'string',
        'isHidden'=>"boolean"
    ];

    protected $attributes = [
        'isHidden'=>false,
    ];

    public function getTable()
    {
        return 'Specialty';
    }
    public function News()
    {
        return $this->hasMany(News::class,"specialtyID");
    }
    public function Clinics()
    {
        return $this->hasMany(Clinic::class, "specialtyID");
    }
    public function Services()
    {
        return $this->hasMany(Service::class, "specialtyID");
    }
    public function MedicalPackages(){
        return $this->hasMany(MedicalPackage::class, "specialtyID");
    }
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (News::where("specialtyID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có tin tức!');
            }
            if (Clinic::where("specialtyID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có phòng khám!');
            }
            if (MedicalPackage::where("medicalPackageID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có gói khám!');
            }
            if (Service::where("serviceID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có dịch vụ!');
            }
        });
    }
}
