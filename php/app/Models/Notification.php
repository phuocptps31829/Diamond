<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'userID',
        'title',
        'description',
        'type',
        'redirect',
        'isRead'
    ];

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setUserIDAttribute($value)
    {
        $this->attributes['userID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isRead' => false,
    ];
    protected static function booted()
    {
        static::created(function ($notification) {
            // Thực hiện gọi API thông báo
        });
    }

    public function getTable()
    {
        return 'Notification';
    }
}
