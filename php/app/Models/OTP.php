<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Str;

class OTP extends Model
{
    use HasFactory;
    protected $fillable = [
        'otp',
        'phoneNumber',
        'isDeleted',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function isExpired()
    {
        $time = 60; // 60 giây
        $currentTime = now()->timestamp;
        return ($currentTime - $this->time->timestamp) > $time;
    }
    protected $attributes = [
        'isDeleted' => false,
    ];
    public function getTable()
    {
        return 'OTP';
    }
}
