<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\BSON\ObjectId;
use Mongodb\Laravel\Eloquent\Model;

class MedicineCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    protected $casts = [
        'name' => 'string',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function getTable()
    {
        return 'MedicineCategory';
    }
    public function MedicineCategory()
    {
        return $this->hasMany(MedicineCategory::class, 'medicineCategoryID', '_id');
    }
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (Medicine::where("medicineCategoryID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có thuốc!');
            }
        });
    }
}
