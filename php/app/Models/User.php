<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use MongoDB\BSON\ObjectId;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fullName',
        'phoneNumber',
        'email',
        'password',
        'dateOfBirth',
        'address',
        'gender',
        'avatar',
        'citizenIdentificationNumber',
        'roleID',
        'otherInfo',
        'isActivated',
        'isDeleted',
    ];
    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $attributes = [
        'isDeleted' => false,
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'fullName' => 'string',
        'phoneNumber' => 'string',
        'email' => 'string',
        'password' => 'string',
        'dateOfBirth' => 'string',
        'gender' => 'string',
        'avatar' => 'string',
        'citizenIdentificationNumber' => 'string',
        'isDeleted' => 'boolean',
    ];
    public function setRoleIDAttribute($value)
    {
        $this->attributes['roleID'] = new ObjectId($value);
    }
    public function setAddressAttribute($value)
    {
        $this->attributes['address'] = $value;
    }
    public function setIsActivatedAttribute($value)
    {
        $this->attributes['isActivated'] = $value;
    }
    public function setOtherInfoAttribute($value)
    {
        $this->attributes['otherInfo'] = $value;
    }
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
    public function getTable()
    {
        return 'User';
    }
}
