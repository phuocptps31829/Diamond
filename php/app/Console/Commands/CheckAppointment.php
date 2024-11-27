<?php

namespace App\Console\Commands;

use App\Models\Appointment;
use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Notification;
use App\Events\NotificationsEvent;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Redis;
use DateTime;
use DateInterval;

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
    protected $description = 'Kiểm tra dữ liệu trong reidis';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
 for ($i = 0; $i < 4; $i++) {
        $this->checkAppointment();
        sleep(15);
    }
    }


    public function checkAppointment()
    {
        $appointmentsJson = Redis::get('upcomingAppointments');
        $ids=[];
        event(new NotificationsEvent([2342424]));
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
              }
            }
            Redis::set('upcomingAppointments', json_encode($appointments));
            event(new NotificationsEvent($ids));
        }
    }
}
