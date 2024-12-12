<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Str;

class OrderNumber extends Model
{
    use HasFactory;
    protected $fillable = [
        'appointmentID',
        'number',
        'priority'
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    protected $casts = [
        'number' => 'integer',
        'priority' => 'integer'
    ];

    public function setAppointmentIDAttribute($value)
    {
        $this->attributes['appointmentID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'OrderNumber';
    }
}
