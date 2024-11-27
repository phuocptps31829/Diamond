<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Medicine extends Model
{
    use HasFactory;
    protected $fillable = [
        'medicineCategoryID',
        'medicineCode',
        'name',
        'ingredients',
        'unit',
        'sideEffects',
        'type',
        'instruction',
        'note',
        'price',
    ];

    protected $casts = [
        'medicineCode' => 'string',
        'name' => 'string',
        'ingredients' => 'string',
        'unit' => 'string',
        'sideEffects' => 'string',
        'type' => 'string',
        'instruction' => 'string',
        'note' => 'string',
        'price' => 'string',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setMedicineCategoryIDAttribute($value)
    {
        $this->attributes['medicineCategoryID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'Medicine';
    }
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (Prescription::where("medicines.medicineID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có đơn thuốc!');
            }
        });
    }
}
