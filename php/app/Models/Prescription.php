<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Prescription extends Model
{
    use HasFactory;
    protected $fillable = [
        'resultID',
        'advice',
        'medicines'
    ];

    protected $casts = [
        'advice' => 'string',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setMedicinesAttribute($value)
    {
        $this->attributes['medicines'] = $value;
    }
    public function setResultIDAttribute($value)
    {
        $this->attributes['resultID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'Prescription';
    }

    public function result()
    {
        return $this->belongsTo(Result::class, 'resultID');
    }

    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (Invoice::where("prescriptionID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có hóa đơn!');
            }else{
                throw new \App\Exceptions\DataExistsException('Không thể xóa!');
            }
        });
    }


}
