<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'isDeleted',
    ];
    protected $attributes = [
        'isDeleted' => false,
    ];
    public function getTable()
    {
        return 'Role';
    }
}
