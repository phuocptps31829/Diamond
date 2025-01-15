<?php

namespace App\Console\Commands;

use App\Mail\SendMail;
use App\Models\Appointment;
use App\Models\Branch;
use App\Models\Clinic;
use App\Models\MedicalPackage;
use App\Models\Service;
use App\Models\User;
use App\Models\WorkSchedule;
use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Notification;
use App\Events\NotificationsEvent;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use DateTime;
use DateInterval;
use MongoDB\BSON\ObjectId;

class CheckWorkSchedule extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:workSchedule';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Chạy lúc 5h chiều hằng ngày: Kiểm tra dữ liệu lịch làm việc bác sĩ';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->checkWorkSchedule();
    }


    public function checkWorkSchedule()
    {
        $tomorrow = Carbon::tomorrow()->toDateString();
        $workSchedules=WorkSchedule::where("day",$tomorrow)->get();
        $ids=[];

      if($workSchedules->count()>0){
          foreach ($workSchedules as $workSchedule){
              $redirect= new \stdClass();
              $redirect->endpoint='work-schedules';
              $redirect->_id=$workSchedule['id'];
//              Tạo thông báo về lịch làm việc ngày mai
              $notification = Notification::create([
                  "userID" => $workSchedule['doctorID'],
                  "title" => "Lịch làm việc!",
                  'description'=>'Bạn có một lịch làm việc vào ' . $workSchedule->hour['startTime'].' đến '. $workSchedule->hour['endTime'].  ' ngày '.Carbon::parse($workSchedule->day)->format('d-m-Y'),
                  "type" => 0,
                  "isRead" => false,
                  "redirect" => $redirect
              ]);
              $ids[]=$workSchedule['doctorID'];
              echo $notification;
          }
          event(new NotificationsEvent($ids));
      }

    }
}
