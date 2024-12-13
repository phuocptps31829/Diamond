<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Hospital extends Model
{
    use HasFactory;
    protected $fillable = [
        'image',
        'name',
        'address',
        'hotline',
    ];

    protected $casts = [
        'image' => 'string',
        'name' => 'string',
        'address' => 'string',
        'hotline' => 'string',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    // Đặt giá trị mặc định

    public function getTable()
    {
        return 'Hospital';
    }
    public static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            if (Contract::where("hospitalID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có dữ liệu hợp đồng!');
            }
        });
    }
}
