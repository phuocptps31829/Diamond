<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\BSON\ObjectId;
use Mongodb\Laravel\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'workingTime',
        'name',
        'imagesURL',
        'address',
        'hotline',
        'coordinates'
    ];

    protected $casts = [
        'name' => 'string',
        'address' => 'string',
        'workingTime' => 'string',
        'hotline' => 'string'
    ];

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    public function setImageURLAttribute($value)
    {
        $this->attributes['imagesURL'] = $value;
    }

    public function setCoordinatesAttribute($value)
    {
        $this->attributes['coordinates'] = $value;
    }
    public function getTable()
    {
        return 'Branch';
    }

    public function Clinics()
    {
        return $this->hasMany(Clinic::class, 'branchID', '_id');
    }
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (Clinic::where("branchID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có dữ liệu phòng khám!', 400);
            }
        });
    }

}
