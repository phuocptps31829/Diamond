<?php

namespace App\Console\Commands;

use App\Mail\SendMail;
use App\Mail\SendMailNewAppointment;
use App\Mail\SendMailRegister;
use App\Models\Appointment;
use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Notification;
use App\Events\NotificationsEvent;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use DateTime;
use DateInterval;

class autoSentMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auto:sentMail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gửi mail';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->sendMail();

    }


    public function sendMail()
    {
        $data = [];
        $data['name'] = 'gameming132';
        $data['fullName'] = '<EMAIL>';
        $data['nameService'] = 'This is a test mail';
        $data['nameDoctor'] = 'Test mail';
        $data['nameBranch'] = 'Test mail';

        $data['time'] = '2020-12-12 12:12:12';
        $data['link'] = '2020-12-12 12:12:12';
        Mail::to('gameming132@gmail.com')->queue(new SendMail($data));
//        Mail::to('gameming132@gmail.com')->queue(new SendMailRegister($data));
//        $data['fullName'] = 'gameming132';
//        $data['nameService'] = 'gameming132';
//        $data['time'] = 'gameming132';
//        $data['address'] = 'gameming132';
//        Mail::to('gameming132@gmail.com')->queue(new SendMailNewAppointment($data));
        \Log::info('send mail');
    }
}
