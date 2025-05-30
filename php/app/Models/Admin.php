<?php

namespace App\Models;

use MongoDB\BSON\ObjectId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'userID',
        'level',
    ];

    protected $casts = [
        'level' => 'string',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setUserIDAttribute($value)
    {
        $this->attributes['userID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'Admin';
    }
}
