<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Mongodb\Laravel\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointmentID',
        'prescriptionID',
        'price',
        'arisePrice',
        'isDeleted',
    ];

    protected $casts = [
        'price' => 'integer',
        'arisePrice' => 'integer',
        'isDeleted' => 'boolean',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    public function setAppointmentIDAttribute($value)
    {
        $this->attributes['appointmentID'] = new ObjectId($value);
    }
    public function setPrescriptionIDAttribute($value)
    {
        $this->attributes['prescriptionID'] = new ObjectId($value);
    }
    protected $attributes = [
        'isDeleted' => false,
    ];

    public function getTable()
    {
        return 'Invoice';
    }

}
