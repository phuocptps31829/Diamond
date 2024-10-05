<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Str;

class Role extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'isDeleted',
    ];
    protected $attributes = [
        'isDeleted' => false,
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function getTable()
    {
        return 'Role';
    }
}
