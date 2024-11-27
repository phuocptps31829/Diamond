<?php

namespace App\Console\Commands;

use App\Models\Appointment;
use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Notification;
use App\Events\NotificationsEvent;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Redis;

class CheckDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Kiểm tra dữ liệu trong database';

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
        $appointments = Appointment::where('time', '<', Carbon::now()->toDateTimeString())
            ->where('status', "CONFIRMED")
            ->get();
        $ids = [];
        foreach ($appointments as $appointment) {
//             Tạo thôn báo cho người bị hủy lịch khám
            $notification = Notification::create([
                "userID" => $appointment->patientID,
                "title" => "Lịch khám của bạn đã bị hủy",
                "type" => "important",
                "isRead" => false,
                "link" => env("CLIENT_HOST") . '/profile/appointments/detail/' . $appointment->id,
                "time" => $appointment->time,
            ]);
            $appointment->status = 'CANCELLED';
//            $appointment->save();
//         Tạo thông báo cho người bác sĩ
            $ids[]= $notification->id;
        }
        event(new NotificationsEvent($ids));
    }
}
