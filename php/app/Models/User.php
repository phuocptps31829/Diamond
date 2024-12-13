<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Mail\SendMailRegister;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Mail;
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
        'isActivated'
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
    public static function boot()
    {
        parent::boot();
        static::created(function ($model) {
            sendNotification(
                $model->doctorID,
                "Xin chào!",
                "Chào mừng bạn đến với hệ thống y khoa DIAMOND",
                0,
                ""
            );
//            Gửi mail
            $data = [];
              if (isset($model->email) && $model->email != "") {
                  $data['fullName'] ='';
                  if (isset($model->gender)) {
                      if ($model->gender === 'Nam') {
                          $data['fullName'] .= ' anh ';
                      } elseif ($model->gender === 'Nữ') {
                          $data['fullName'] .= ' chị ';
                      }
                  }
                  $data['fullName'] .= $model->fullName;
             Mail::to($model->email)->queue(new SendMailRegister($data));
             }
        });

        static::deleting(function ($model) {
            if (WorkSchedule::where("doctorID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có lịch làm việc!');
            }
            if (Appointment::where("patientID",new ObjectId($model->_id))->orWhere( "patientHelpID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có lịch hẹn!');
            }
            if (Contract::where("doctorID",new ObjectId($model->_id))->exists()) {
                throw new \App\Exceptions\DataExistsException('Không thể xóa đã có hợp đồng!');
            }
        });
    }
}
