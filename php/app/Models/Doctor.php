<?php

namespace App\Models;

use MongoDB\BSON\ObjectId;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;


class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'userID',
        'specialtyID',
        'title',
        'practicingCertificate',
        'yearsExperience',
        'detail',
        'isInternal',
        'isActivated'
    ];

    protected $casts = [
        'title' => 'string',
        'practicingCertificate' => 'string',
        'yearsExperience' => 'integer',
        'detail' => 'string',
        'isInternal' => 'boolean',
        'isActivated' => 'boolean',
    ];

    public function setUserIDAttribute($value)
    {
        $this->attributes['userID'] = new ObjectId($value);
    }
    public function setSpecialtyIDAttribute($value)
    {
        $this->attributes['specialtyID'] = new ObjectId($value);
    }

    public function getTable()
    {
        return 'Doctor';
    }
}
