<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Psy\Util\Str;

class CheckSizeImage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-size-image';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
      $this->convertAllImagesToWebP( public_path('images'),public_path('images2'));
    }

    function convertAllImagesToWebP($folderPath, $outputFolder)
    {
        // Mảng lưu tên các ảnh đã bị chuyển đổi thành công
        $logFileNames = [];

        // Lấy danh sách file trong thư mục
        $files = scandir($folderPath);

        // Kiểm tra và xử lý các file ảnh
        foreach ($files as $file) {
            // Loại bỏ thư mục con "." và ".."
            if ($file === '.' || $file === '..') {
                continue;
            }

            $filePath = $folderPath . DIRECTORY_SEPARATOR . $file;

            // Kiểm tra nếu file là ảnh
            if (in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                $originalName = pathinfo($file, PATHINFO_FILENAME); // Lấy tên gốc mà không có phần mở rộng
                $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION)); // Lấy phần mở rộng
                $sizeBefore = filesize($filePath); // Kích thước file ban đầu
                $quality = 85; // Chất lượng ảnh sau khi nén

                // Xác định chất lượng nén dựa trên kích thước ảnh
                if ($sizeBefore > 2 * 1024 * 1024) { // Lớn hơn 2MB
                    $quality = 15;
                } elseif ($sizeBefore > 1 * 1024 * 1024) { // Lớn hơn 1MB
                    $quality = 25;
                }

                // Tạo đường dẫn cho file WebP đầu ra
                $webpFilePath = $outputFolder . DIRECTORY_SEPARATOR ."aaa". '.' .$extension;
                rename($filePath, $webpFilePath);
                // Thực hiện chuyển đổi sang WebP
                $cmd = "cwebp -q {$quality} " . escapeshellarg($webpFilePath) . " -o " . escapeshellarg($webpFilePath);
                exec($cmd, $output, $resultCode);
                rename($webpFilePath, $outputFolder . DIRECTORY_SEPARATOR . mb_convert_encoding($originalName, "UTF-8", "auto") . '.' .$extension);
                // Kiểm tra kết quả và lưu vào log
                if ($resultCode === 0) {
                    $logFileNames[] = $file; // Lưu tên file đã chuyển đổi thành công
                } else {
                    echo "Lỗi khi chuyển đổi: " . $file . "\n";
                }
            }
        }

        // Trả về mảng tên các file đã chuyển đổi thành công
        return $logFileNames;
    }


}
