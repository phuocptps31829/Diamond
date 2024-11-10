<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Str;

class RevokedToken extends Model
{
    use HasFactory;
    protected $fillable = [
        'token',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function getTable()
    {
        return 'RevokedToken';
    }
}
