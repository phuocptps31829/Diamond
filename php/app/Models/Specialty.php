<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;

class Specialty extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'name',
        'isHidden',
        'isDeleted'
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    protected $casts = [
        'image' => 'string',
        'name' => 'string',
        'isHidden'=>"boolean",
        'isDeleted' => 'boolean',
    ];

    protected $attributes = [
        'isDeleted' => false,
        'isHidden'=>false,
    ];

    public function getTable()
    {
        return 'Specialty';
    }
}
