<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'userID',
        'title',
        'type',
        'time',
        'link',
        'isRead',
        'isDeleted',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setUserIDAttribute($value)
    {
        $this->attributes['userID'] = new ObjectId($value);
    }

    protected $attributes = [
        'isDeleted' => false,
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
