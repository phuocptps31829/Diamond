<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    public function getTable()
    {
        return 'User';
    }

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
        'isActive',
        'isDeleted',
    ];

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
        'address' => 'array',
        'gender' => 'string',
        'avatar' => 'string',
        'citizenIdentificationNumber' => 'string',
        'isActive' => 'boolean',
        'isDeleted' => 'boolean',
    ];
}
