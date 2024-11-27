<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Clinic extends Model
{
    use HasFactory;
    protected $fillable = [
        'branchID',
        'specialtyID',
        'name'
    ];

    protected $casts = [
        'name' => 'string'
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setBranchIDAttribute($value)
    {
        $this->attributes['branchID'] = new ObjectId($value);
    }
    public function setSpecialtyIDAttribute($value)
    {
        $this->attributes['specialtyID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'Clinic';
    }

    public function Branch()
    {
        return $this->belongsTo(Branch::class, 'branchID', '_id');
    }
    public function Specialty()
    {
        return $this->belongsTo(Specialty::class, 'specialtyID');
    }
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (WorkSchedule::where("ClinicID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có dữ liệu lịch làm việc!');
            }
        });
    }
}
