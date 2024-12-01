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

class CheckAppointment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:appointment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Chạy 1h một lần: Kiểm tra dữ liệu trong reidis gửi thông báo về lịch hẹn sắp tới';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->checkAppointment();
    }


    public function checkAppointment()
    {
        $appointmentsJson = Redis::get('upcomingAppointments');
        $ids=[];
\Log::info($appointmentsJson) ;
        if ($appointmentsJson) {
            $appointments = json_decode($appointmentsJson, true);
            foreach ($appointments as $index => $appointment) {
                $currentTime = Carbon::now();
                $inputTime = Carbon::parse($appointment['time']);
                $difference = $currentTime->diffInHours($inputTime, false);
                if ($difference<24) {
                    $redirect= new \stdClass();
                    $redirect->endpoint='appointments';
                    $redirect->_id=$appointment['id'];
                    // Tạo thông báo cho lịch hẹn của bệnh nhân
                    $notification = Notification::create([
                        "userID" => $appointment['patientID'],
                        "title" => "Lịch hẹn!",
                        'description'=>'Bạn có một lịch hẹn vào ' . $inputTime->format('H:i'). ' ngày '.$inputTime->format('d-m-Y'),
                        "type" => 0,
                        "isRead" => false,
                        "redirect" => $redirect
                    ]);
                    $ids[]= $appointment['patientID'];
//                    unset($appointments[$index]);
                    $user=User::find($appointment['patientID']);
                    if(isset($appointment['serviceID'])){
                        $serviceName= Service::find($appointment['serviceID'])->name;
                    }else{
                        $serviceName=MedicalPackage::where('services._id',new  ObjectId($appointment['medicalPackageID']))->first()->name;
                    }

                    $workSchedule=WorkSchedule::find($appointment['workScheduleID']);
                    $nameDoctor=User::find($workSchedule->doctorID)->fullName;
                    $clinic=Clinic::find($workSchedule->clinicID);
                    $branch=Branch::find($clinic->branchID);
//                  Gửi mail nhắc nhở lịch khám
                  if(isset($user->email)){
                     $user->gender=="Nam"? $gender="anh":$gender="chị";
                      $parts = explode(' ', trim($user->fullName));
                      $userName=end($parts);
                      $data = [];
                      $data['name'] = $gender.' '.$userName;
                      $data['fullName'] = $user->fullName;
                      $data['nameService'] = $serviceName;
                      $data['nameDoctor'] = $nameDoctor;
                      $data['nameBranch'] = $branch->name;
                      $data['link'] = '/profile/appointments/detail/'.$appointment['id'];
                      $data['time'] =$inputTime->format('H:i'). ' ngày '.$inputTime->format('d-m-Y');
                      Mail::to($user->email)->send(new SendMail($data));
                  }
              }
            }
            Redis::set('upcomingAppointments', json_encode($appointments));
            event(new NotificationsEvent($ids));
        }
    }
}
