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
        'isDeleted',
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
        'isDeleted' => 'boolean',
    ];
    public function setMedicineCategoryIDAttribute($value)
    {
        $this->attributes['medicineCategoryID'] = new ObjectId($value);
    }

    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Medicine';
    }
}