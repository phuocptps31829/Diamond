<?php

// namespace App\Console\Commands;

// use Illuminate\Console\Command;
// use DB;

// class CheckMongoConnection extends Command
// {
//     protected $signature = 'mongo:check-connection';
//     protected $description = 'Check MongoDB connection';

//     public function __construct()
//     {
//         parent::__construct();
//     }

//     public function handle()
//     {
//         try {
//             // Thực hiện kết nối tới MongoDB và lấy danh sách collection
//             $databases = DB::connection('mongodb')->getMongoClient()->listDatabases();
//             $this->info('Connected to MongoDB successfully!');
//             $this->info('Available databases:');

//             foreach ($databases as $database) {
//                 $this->info($database->getName());
//             }
//         } catch (\Exception $e) {
//             $this->error('Failed to connect to MongoDB: ' . $e->getMessage());
//         }
//     }
// }