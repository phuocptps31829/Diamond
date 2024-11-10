<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Str;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'specialtyID',
        'title',
        'image',
        'content',
        'author',
        'viewCount',
        'slug',
        'isHidden',
        'isDeleted',
    ];

    protected $casts = [
        'title' => 'string',
        'image' => 'string',
        'content' => 'string',
        'author' => 'string',
        'viewCount' => 'integer',
        'isHidden' => 'boolean',
        'isDeleted' => 'boolean',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    public function setSpecialtyIDAttribute($value)
    {
        $this->attributes['specialtyID'] = new ObjectId($value);
    }
    protected $attributes = [
        'viewCount' => 0,
        'isDeleted' => false,
    ];
    public static function createSlug($title)
    {
        return Str::slug($title);
    }
    public function getTable()
    {
        return 'News';
    }
}
