<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;

class MedicineCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'isDeleted'
    ];

    protected $casts = [
        'name' => 'string',
        'isDeleted' => 'boolean',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    // Đặt giá trị mặc định
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'MedicineCategory';
    }
}
