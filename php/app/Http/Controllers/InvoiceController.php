<?php

namespace App\Http\Controllers;


use App\Models\Appointment;
use App\Models\Invoice;
use App\Models\MedicalPackage;
use App\Models\Medicine;
use App\Models\News;
use App\Models\Prescription;
use App\Models\Result;
use App\Models\Service;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Http\Requests\InvoiceRequest;
use App\Models\OrderNumber;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Facades\Redis;
use PhpOffice\PhpWord\TemplateProcessor;
use Illuminate\Support\Str;
use PhpOffice\PhpWord\SimpleType\CellAlignment;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\PhpWord;
use Mpdf\Mpdf;

/**
 * @OA\Post(
 *     path="/api/v1/work-schedules/add",
 *     tags={"Work Schedules"},
 *     summary="Thêm lịch làm việc mới",
 *     description="API này dùng để thêm lịch làm việc mới.",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="doctorID", type="string", example="66fd6dce2efb40d76dda5058"),
 *             @OA\Property(property="day", type="string", format="date", example="2024-12-04"),
 *             @OA\Property(property="clinicID", type="string", example="671d94f9563a4d298e693faa"),
 *             @OA\Property(
 *                 property="hour",
 *                 type="object",
 *                 @OA\Property(property="startTime", type="string", example="07:00"),
 *                 @OA\Property(property="endTime", type="string", example="09:00")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Thêm thành công"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Lỗi xảy ra"
 *     )
 * )
 * @OA\Put(
 *     path="/api/v1/work-schedules/update/{scheduleID}",
 *     tags={"Work Schedules"},
 *     summary="Cập nhật lịch làm việc",
 *     description="Cập nhật thông tin lịch làm việc của bác sĩ trong phòng khám.",
 *     @OA\Parameter(
 *         name="scheduleID",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="string"),
 *         description="ID của lịch làm việc cần cập nhật"
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="doctorID", type="string", example="66fd6dce2efb40d76dda5058"),
 *             @OA\Property(property="day", type="string", format="date", example="2024-12-03"),
 *             @OA\Property(property="clinicID", type="string", example="671d94f9563a4d298e693faa"),
 *             @OA\Property(
 *                 property="hour",
 *                 type="object",
 *                 @OA\Property(property="startTime", type="string", example="07:00"),
 *                 @OA\Property(property="endTime", type="string", example="09:00")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Lịch làm việc đã được cập nhật thành công",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Work schedule updated successfully")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Dữ liệu không hợp lệ"
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Không tìm thấy lịch làm việc"
 *     )
 * )
 */
class InvoiceController extends Controller
{
    public function updateWorkScheduleFromInvoice(Request $request)
    {
        try {
            $id = $request->id;
            $invoice = Appointment::find($id);
            $request->validate([
                'workScheduleID' => 'required|string',
            ]);
            if (!$invoice) {
                return createError(404, 'Appointment not found');
            }
            $invoice->workScheduleID = $request->workScheduleID;
            $invoice->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật lịch khám thành công!',
                'data' => $invoice,
            ]);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function exportInvoice(Request $request)
    {
        $id = $request->id;
        $invoice = Invoice::find($id);
        if (!$invoice) {
            return createError(400, 'Không tìm thấy hóa đơn!');
        }
        $invoice->createdAt =Carbon::parse($invoice->createdAt)->format('H:i d-m-Y');
        $invoice->textPrice= convertNumberToTextPrice($invoice->price) ;
        $appointment = Appointment::where('id',new ObjectId( $invoice->appointmentID))->first();
        $patient =User::find($appointment->patientID);
        $items=[];
        $name=null;
        if(isset($invoice->prescriptionID)){
            $prescription = Prescription::with(['result', 'result.service'])->find($invoice->prescriptionID);
            $name = "Đơn thuốc: " . $prescription->result->service->name;
            foreach ($prescription->medicines as $medicine) {
                $nameUnit=Medicine::find($medicine['medicineID']);
                $medicine['unit']=$nameUnit->unit;
                $medicine['name']=$nameUnit->name;
                $medicine['price']=$invoice->price;
                $items[]=$medicine;
            }
        }else{
            if(isset($appointment->serviceID)){
                $service=Service::find($appointment->serviceID);
                $appointment->name=$service->name;
                $appointment->quantity=1;
                $appointment->price=$invoice->price;
                $items[]=$appointment;
            }else{
                $medicalPackage=MedicalPackage::find($appointment->medicalPackageID);
                $appointment->name=$medicalPackage->name;
                $appointment->quantity=1;
                $appointment->price=$invoice->price;
                $items[]=$appointment;
            }
        }

//        return view('pdf.invoice', compact('invoice', 'appointment', 'patient'))->render();
        // Render view thành HTML
        $pdf = \PDF::loadView('pdf.invoice', compact('invoice','appointment','patient','items','name'));
        // Trả về file PDF
//        return $pdf->download('hoa_don'.$invoice->invoiceCode.'.pdf');
        return $pdf->stream('hoa_don'.$invoice->invoiceCode.'.pdf')
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition','inline; filename="hoa_don' . $invoice->invoiceCode . '.pdf"');

//        $templateProcessor = new TemplateProcessor(public_path('docx/template/invoice2.docx'));
//        $phpWord = new PhpWord();
//        $section = $phpWord->addSection();
//
//        // Định nghĩa style cho bảng
//        $tableStyle = [
//            'borderSize' => 5, // Độ dày đường viền
//            'borderColor' => '#C0C0C0', // Màu đường viền
//            'cellMargin' => 100, // Căn lề bên trong ô
//        ];
//        $phpWord->addTableStyle('CustomTableStyle', $tableStyle);
//
//        // Thêm bảng với style đã định nghĩa
//        $table = $section->addTable('CustomTableStyle');
//
//        // Định nghĩa style cho ô
//        $cellStyle = [
//            'valign' => 'center',
//            'borderLeftSize' => 5,
//            'borderRightSize' => 5,
//            'borderTopSize' => 5,
//            'borderBottomSize' => 5,
//            'borderColor' => '#808080',
//        ];
//
//        // Định nghĩa font chữ
//        $fontHeaderStyle = [
//            'bold' => true,
//            'size' => 12,
//            'name' => 'Arial',
//            'color' => 'FFFFFF', // Màu chữ trắng
//        ];
//        $fontPrice = [
//            'bold' => true,
//            'size' => 11,
//            'name' => 'Arial',
//            'color' => '#333333',
//        ];
//        $fontContentStyle = [
//            'bold' => false,
//            'size' => 11,
//            'name' => 'Arial',
//        ];
//
//        // Thêm hàng đầu tiên (hàng tiêu đề)
//        $table->addRow(null, ['tblHeader' => true]); // Làm hàng tiêu đề
//        $table->addCell(1000, array_merge($cellStyle, ['bgColor' => '#0099FF']))->addText('TT', $fontHeaderStyle);
//        $table->addCell(6000, array_merge($cellStyle, ['bgColor' => '#0099FF']))->addText('TÊN DỊCH VỤ', $fontHeaderStyle);
//        $table->addCell(3000, array_merge($cellStyle, ['bgColor' => '#0099FF']))->addText('THÀNH TIỀN', $fontHeaderStyle);
//
//        // Thêm dữ liệu bảng
//        $index = 1;
//        $totalAmount = $invoice->price;
//
//        // Xử lý tên dịch vụ
//        if ($invoice->prescriptionID) {
//
//            $prescription = Prescription::with(['result', 'result.service'])->find($invoice->prescriptionID);
//            $name = "Đơn thuốc: " . $prescription->result->service->name;
//            $table->addRow();
//            $table->addCell(1000, $cellStyle)->addText($index++, $fontContentStyle);
//            $table->addCell(8000, $cellStyle)->addText($name, $fontContentStyle);
//            $table->addCell(3000, $cellStyle)->addText(number_format($invoice->price) . ' VND', $fontContentStyle);
//        } else {
//            $appointment = Appointment::find($invoice->appointmentID);
//
//            if ($appointment->serviceID) {
//                $service = Service::find($appointment->serviceID);
//                $table->addRow();
//                $table->addCell(1000, $cellStyle)->addText($index++, $fontContentStyle);
//                $table->addCell(8000, $cellStyle)->addText($service->name, $fontContentStyle);
//                $table->addCell(3000, $cellStyle)->addText(number_format($invoice->price) . ' VND', $fontContentStyle);
//            } else {
//
//                $medicalPackage = MedicalPackage::where('services._id', new ObjectId($appointment->medicalPackageID))->first();
//                $serviceOther = null;
//                foreach ($medicalPackage->services as $service) {
//                    $serviceID = (object)$service;
//                    if ((string)($serviceID->id) == $appointment->medicalPackageID) {
//                        $serviceOther = $service;
//                        break;
//                    }
//                }
//                if ($serviceOther) {
//                    $serviceOther = (object)$serviceOther;
//
//                    foreach ($serviceOther->servicesID as $id) {
//                        $serviceOfMedical = Service::find($id);
//                        $table->addRow();
//                        $table->addCell(1000, $cellStyle)->addText($index++, $fontContentStyle);
//                        $table->addCell(8000, $cellStyle)->addText($serviceOfMedical->name, $fontContentStyle);
//                        $table->addCell(3000, $cellStyle)->addText(number_format($serviceOfMedical->price) . ' VND', $fontContentStyle);
//                    }
//                }
//            }
//        }
//
//        // Thêm hàng tổng cộng
//        $table->addRow();
//        $table->addCell(1000, array_merge($cellStyle, ['bgColor' => '#FFFFFF']))->addText('');
//        $table->addCell(8000, array_merge($cellStyle, ['bgColor' => '#FFFFFF']))->addText('TỔNG CỘNG', $fontPrice);
//        $table->addCell(3000, array_merge($cellStyle, ['bgColor' => '#FFFFFF']))->addText(number_format($totalAmount) . ' VND', $fontPrice);
//
//        // Gắn bảng vào template
//        $templateProcessor->setComplexBlock('services_table', $table);
//        $dataDate = [
//            'date' => date('d'),
//            'year' => date('Y'),
//            'month' => date('m'),
//        ];
//        $appointment = Appointment::find($invoice->appointmentID);
//        $patient = User::find($appointment->patientID);
//
//        $templateProcessor->setValue('phone', $patient->phoneNumber);
//        $templateProcessor->setValue('name', $patient->fullName);
//        $templateProcessor->setValue('address', $patient->address);
//        $templateProcessor->setValue('payment', $appointment->payment['method']);
//        $templateProcessor->setValue('textPrice', "VND");
//        $templateProcessor->setValue('invoiceCode', $invoice->invoiceCode);
//        $templateProcessor->setValue('price', convertNumberToTextPrice($totalAmount) . " VND");
//        $templateProcessor->setValue('date', $dataDate['date']);
//        $templateProcessor->setValue('year', $dataDate['year']);
//        $templateProcessor->setValue('month', $dataDate['month']);
//
//        $fileName = "HD-" . time() . '.docx';
//        $link = 'docx/cache/' . $fileName;
//        $templateProcessor->saveAs($link);
//        // Đọc file .docx
//        return response()->download($link)->deleteFileAfterSend(true);
    }

    public function deleteAppointmentInArrayID(Request $request)
    {
        try {
            $ids = $request->input('ids');

            if (empty($ids) || !is_array($ids)) {
                return createError(400, 'IDs are required and must be an array');
            }

            foreach ($ids as $id) {
                if (!isValidMongoId($id)) {
                    return createError(400, 'Invalid mongo ID: ' . $id);
                }
            }

            Appointment::whereIn('_id', $ids)->delete();
            Invoice::whereIn('appointmentID', $ids)->delete();
            OrderNumber::whereIn('appointmentID', $ids)->delete();
            Prescription::whereIn('appointmentID', $ids)->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Appointments deleted successfully.'
            ], 200);

        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function cancelAppointment($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $appointment = Appointment::where('_id', $id)->first();
            if (!$appointment) {
                return createError(404, 'Service not found');
            }

            $appointment->update(['status' => 'CANCELLED']);
            return response()->json([
                'status' => 'success',
                'message' => 'Đã hủy lịch hẹn thành công',
                'data' => $appointment,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }


    public function deleteAppointment($id)
    {
        try {
            if (!$id) {
                return createError(400, 'ID is required');
            }

            if (!isValidMongoId($id)) {
                return createError(400, 'Invalid mongo ID');
            }

            $appointment = Appointment::where('_id', $id)->first();
            if (!$appointment) {
                return createError(404, 'Service not found');
            }
            $invoice = Invoice::where('appointmentID', new ObjectId($id))->first();
            if ($invoice) {
                $invoice->delete();
            }

            $orderNumber = OrderNumber::where("appointmentID", new ObjectId($id))->first();
            if ($orderNumber) {
                $orderNumber->delete();
            }

            $prescription = Prescription::where('appointmentID', new ObjectId($id))->first();
            if ($prescription) {
                $prescription->delete();
            }

            $appointment->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Appointment deleted successfully.',
                'data' => $appointment,
            ], 200);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    function updateOrderNumber(Request $request)
    {
        try {
            $id = $request->route('id');

            $priority = $request->validate([
                "priority" => "required|integer"
            ]);

            $orderNumber = OrderNumber::where('appointmentID', new ObjectId($id))->first();

            if (!$orderNumber) {
                return createError(404, 'Appointment not found');
            }

            $orderNumber->priority = $priority['priority'];
            $orderNumber->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Order number update priority successfully.',
                'data' => $orderNumber,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    function updatePaymentStatus(Request $request)
    {
        try {
            $id = $request->route('id');
            $status = $request->validate([
                "status" => "required|string"
            ]);
            $appointment = Appointment::where('_id', $id)->first();

            if (!$appointment) {
                return createError(404, 'Appointment not found');
            }
            $payment = $appointment->payment;
            $payment['status'] = $status['status'];
            $appointment->payment = $payment;
            $appointment->save();
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment update payment status successfully.',
                'data' => $appointment,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    function updateStatus(Request $request)
    {
        try {
            $id = $request->route('id');

            $status = $request->validate([
                "status" => "required|string"
            ]);
            $appointment = Appointment::where('_id', $id)->first();

            if (!$appointment) {
                return createError(404, 'Appointment not found');
            }
            $appointment->update([
                "status" => $status['status']
            ]);
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment update status successfully.',
                'data' => $appointment,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    function codPayment(Request $request)
    {
        try {

            $InvoiceRequest = new InvoiceRequest();
            $request->validate($InvoiceRequest->rules());
            $appointmentData = $request->all();

            $totalPrice =$this->totalPrice($appointmentData);

            $appointmentData['price'] = $totalPrice;
            $appointmentData=json_encode($appointmentData);

            $dataAppointment =  $this->saveAppointment($appointmentData,"","EXAMINED","COD");
            $link='';
            if($dataAppointment){
                foreach ($dataAppointment['appointmentID'] as $id) {
                    if($link==''){
                        $link.='?id[]='.strval($id);
                    }else{
                        $link.='&id[]='.strval($id);
                    }
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Appointment update payment status successfully.',
                'data' => [
                    'url'=> env('LINK_SUCCESS').$link
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    function zaloPayment(Request $request)
    {
        try {
            $InvoiceRequest = new InvoiceRequest();
            $request->validate($InvoiceRequest->rules());
            $allData = $request->all();
            $totalPrice = $this->totalPrice($allData);
            $config = [
                "app_id" => env('ZALO_PAY_APP_ID'),
                "key1" => env('ZALO_PAY_KEY_1'),
                "endpoint" => env('ZALO_PAY_ENTPOINT')
            ];

            $embeddata = [
                'redirecturl' => env('ZALO_PAY_CALLBACK_URL')
            ]; // Merchant's data
            $urlCallback = [
                'redirecturl' => env('ZALO_PAY_REDIRECT_URL')
            ];
            $items = '[]'; // Merchant's data
            $transID = rand(0, 1000000); //Random trans id
            Redis::set(date("ymd") . "_" . $transID, json_encode($allData));
            \Log::info("transID: " . json_encode($allData));
            $order = [
                "app_id" => $config["app_id"],
                "app_time" => round(microtime(true) * 1000), // miliseconds
                "app_trans_id" => date("ymd") . "_" . $transID, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
                "app_user" => "diamond",
                "item" => $items,
                "embed_data" => json_encode($embeddata, JSON_UNESCAPED_SLASHES),
                "amount" => $totalPrice,
                "description" => "Thanh toán dịch vụ Diamond",
                "bank_code" => "zalopayapp",
                "callback_url" => 'https://laravel.diamond.id.vn/api/v1/invoices/payment/zalo/callback'
            ];

            $data = $order["app_id"] . "|" . $order["app_trans_id"] . "|" . $order["app_user"] . "|" . $order["amount"]
                . "|" . $order["app_time"] . "|" . $order["embed_data"] . "|" . $order["item"];
            $order["mac"] = hash_hmac("sha256", $data, $config["key1"]);

            $context = stream_context_create([
                "http" => [
                    "header" => "Content-type: application/x-www-form-urlencoded\r\n",
                    "method" => "POST",
                    "content" => http_build_query($order)
                ]
            ]);

            $resp = file_get_contents($config["endpoint"], false, $context);
            $result = json_decode($resp, true);
            return response()->json([
                'message' => "Create payment url successfully.",
                'data' => [
                    "payUrl" => $result['order_url']
                ]
            ], 200);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }

    function zaloPaymentCallback(Request $request)
    {
        try {
            $key2 = env('ZALO_PAY_KEY_2');
            $data = $request->all();
            $checksumData = $data["appid"] . "|" . $data["apptransid"] . "|" . $data["pmcid"] . "|" . $data["bankcode"] . "|" . $data["amount"] . "|" . $data["discountamount"] . "|" . $data["status"];
            $mac = hash_hmac("sha256", $checksumData, $key2);

            // kiểm tra callback hợp lệ (đến từ ZaloPay server)
            if (strcmp($mac, $data["checksum"]) != 0) {
                // callback không hợp lệ
                return response()->json(['error' => 'Thanh toán thất bại.'], 400);
            } else {
                // thanh toán thành công
                $order_token = $request->checksum;
                $app_trans_id = $request->apptransid;
                $jsonData = Redis::get($app_trans_id);
                if ($jsonData) {
                    $signature = $order_token;
                    $dataAppointment=$this->saveAppointment($jsonData,$signature,"PAID","ZALOPAY");
                    Redis::del($app_trans_id);
                    $link='';
                        if($dataAppointment){
                            foreach ($dataAppointment['appointmentID'] as $id) {
                                if($link==''){
                                    $link.='?id[]='.strval($id);
                                }else{
                                    $link.='&id[]='.strval($id);
                                }
                            }
                        }
                    return redirect(env('LINK_SUCCESS').$link);
                } else {
                    return response()->json(['error' => 'Lỗi không tìm thấy dịch vụ. '], 404);
                }

            }
            return redirect(env('ZALO_PAY_REDIRECT_URL'));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    function vnpayPayment(Request $request)
    {
        try {
            $InvoiceRequest = new InvoiceRequest();
            $request->validate($InvoiceRequest->rules());
            $allData = $request->all();
            $totalPrice = array_reduce($allData['data'], function ($a, $b) {
                return $a + (float)$b['price'];
            }, 0);

            error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
            date_default_timezone_set('Asia/Ho_Chi_Minh');
            $vnp_TxnRef = rand(1, 10000);
            Redis::set($vnp_TxnRef, json_encode($allData));
            $vnp_Amount = $totalPrice;
            $vnp_Locale = "vn";
//            $vnp_BankCode = $_POST['bankCode'];
            $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
            $vnp_HashSecret = env("VNPAY_HASH_SECRET");
            $vnp_Url = env("VNPAY_CREATE_URL");
            $inputData = array(
                "vnp_Version" => "2.1.0",
                "vnp_TmnCode" => env('VNPAY_TMNCODE'),
                "vnp_Amount" => $vnp_Amount * 100,
                "vnp_Command" => "pay",
                "vnp_CreateDate" => date('YmdHis'),
                "vnp_CurrCode" => "VND",
                "vnp_IpAddr" => $vnp_IpAddr,
                "vnp_Locale" => $vnp_Locale,
                "vnp_OrderInfo" => "Than toán dịch vụ:" . $vnp_TxnRef,
                "vnp_OrderType" => "billpayment",
                "vnp_ReturnUrl" => env("VNPAY_RETURN_URL"),
                "vnp_TxnRef" => $vnp_TxnRef,
//                "vnp_ExpireDate" => $expire
            );

            if (isset($vnp_BankCode) && $vnp_BankCode != "") {
                $inputData['vnp_BankCode'] = $vnp_BankCode;
            }

            ksort($inputData);
            $query = "";
            $i = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }

            $vnp_Url = $vnp_Url . "?" . $query;
            if (isset($vnp_HashSecret)) {
                $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);//
                $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
            }

            return response()->json([
                'message' => "Create payment url successfully.",
                'data' => [
                    "payUrl" => $vnp_Url
                ]
            ], 200);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }

    function vnpayPaymentCallback(Request $request)
    {
        try {
            if (isset($request->vnp_ResponseCode) && $request->vnp_ResponseCode == '00') {
                // Trả về 00 là thanh toán thành công
                $vnp_Amount = $request->query('vnp_Amount');
                $vnp_BankCode = $request->query('vnp_BankCode');
                $vnp_BankTranNo = $request->query('vnp_BankTranNo');
                $vnp_CardType = $request->query('vnp_CardType');
                $vnp_OrderInfo = $request->query('vnp_OrderInfo');
                $vnp_PayDate = $request->query('vnp_PayDate');
                $vnp_ResponseCode = $request->query('vnp_ResponseCode');
                $vnp_TmnCode = $request->query('vnp_TmnCode');
                $vnp_TransactionNo = $request->query('vnp_TransactionNo');
                $vnp_TransactionStatus = $request->query('vnp_TransactionStatus');
                $vnp_TxnRef = $request->query('vnp_TxnRef');
                $vnp_SecureHash = $request->query('vnp_SecureHash');

                $jsonData = Redis::get($vnp_TxnRef);
                if ($jsonData) {
                    $signature = $vnp_BankTranNo;
                    $dataAppointment=$this->saveAppointment($jsonData,$signature,"PAID","VNPAY");
                    Redis::del($vnp_TxnRef);
                    $link='';
                    if($dataAppointment){
                        foreach ($dataAppointment['appointmentID'] as $id) {
                            if($link==''){
                                $link.='?id[]='.strval($id);
                            }else{
                                $link.='&id[]='.strval($id);
                            }
                        }
                    }
                    return redirect('LINK_SUCCESS'.$link);

                } else {
                    return response()->json(['error' => 'Lỗi không tìm thấy dịch vụ. '], 404);
                }
            } else {
                return response()->json(['error' => 'Thanh toán thất bại.'], 400);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    function momoPayment(Request $request)
    {
        try {
            $InvoiceRequest = new InvoiceRequest();
            $request->validate($InvoiceRequest->rules());
            $allData = $request->all();
//            $totalPrice = array_reduce($allData['data'], function ($a, $b) {
//                return $a + (float)$b['price'];
//            }, 0);
            $totalPrice =$this->totalPrice($allData);
            $accessKey = 'F8BBA842ECF85';
            $secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
            // $accessKey = env('MOMO_SECRET_KEY');
            // $secretKey = env('MOMO_SECRET_KEY');
            $orderInfo = 'Thanh toán với MoMo';
            $partnerCode = 'MOMO';
            $redirectUrl =env('MOMO_REDIRECT_URL');
            // $ipnUrl = env('MOMO_CALLBACK_URL');
            $ipnUrl =env('MOMO_CALLBACK_URL');
            $requestType = "captureWallet";
            $amount = $totalPrice;
            $orderId = time() . "";
            $requestId = $orderId;
            $extraData = json_encode($request->all());
            $orderGroupId = '';
            $autoCapture = true;
            $lang = 'vi';

            $rawSignature =
                "accessKey=" . $accessKey .
                "&amount=" . $amount .
                "&extraData=" . $extraData .
                "&ipnUrl=" . $ipnUrl .
                "&orderId=" . $orderId .
                "&orderInfo=" . $orderInfo .
                "&partnerCode=" . $partnerCode .
                "&redirectUrl=" . $redirectUrl .
                "&requestId=" . $requestId .
                "&requestType=" . $requestType;
            $signature = hash_hmac('sha256', $rawSignature, $secretKey);
            $requestData = json_encode([
                "partnerCode" => $partnerCode,
                "partnerName" => "Test",
                "storeId" => "MomoTestStore",
                "requestId" => $requestId,
                "amount" => $amount,
                "orderId" => $orderId,
                "orderInfo" => $orderInfo,
                "redirectUrl" => $redirectUrl,
                "ipnUrl" => $ipnUrl,
                "lang" => $lang,
                "requestType" => $requestType,
                "autoCapture" => $autoCapture,
                "extraData" => $extraData,
                "orderGroupId" => $orderGroupId,
                "signature" => $signature
            ]);
            $data = execPostRequest('https://test-payment.momo.vn/v2/gateway/api/create', $requestData);

            return response()->json([
                'message' => $data['message'],
                'data' => [
                    "payUrl" => $data['payUrl']
                ]
            ], 200);
        } catch (\Exception $e) {

            return handleException($e);
        }
    }
    function momoPaymentCallbackRedirect(Request $request)
    {
        try {

            $resultCode = $request->resultCode;
            // return $resultCode;
            if ($resultCode !== 0) {
                return response()->json(['error' => 'Paid fail.'], 400);
            }

            $amount = $request->input('amount');
            $signature = $request->input('signature');
            $extraData = $request->input('extraData');

            $appointmentData = $extraData;

//            $appointmentData = json_decode($extraData, true);

            $newPatient = null;
            $dataAppointment = $this->saveAppointment($appointmentData,$signature,"PAID","MOMO");
            $link='';
            if($dataAppointment){
                foreach ($dataAppointment['appointmentID'] as $id) {
                    if($link==''){
                        $link.='?id[]='. strval($id);
                    }else{
                        $link.='&id[]='. strval($id);
                    }
                }
            }
            return redirect(env('LINK_SUCCESS').$link);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    function momoPaymentCallback(Request $request)
    {
        try {
            // body {
            //     partnerCode: 'MOMO',
            //     orderId: 'MOMO1724745040901',
            //     requestId: 'MOMO1724745040901',
            //     amount: 50000,
            //     orderInfo: 'Thanh toán với MoMo',
            //     orderType: 'momo_wallet',
            //     transId: 4108080069,
            //     resultCode: 0,
            //     message: 'Thành công.',
            //     payType: 'qr',
            //     responseTime: 1724745109119,
            //     extraData: '',
            //     signature: '6495683ceb2e8d611aea72f79361e23cf0938f66f6d955e997d381ad33b5789f'
            //   }

            // {
            // "patientID": "66afa9556d138253c13a840b",
            // "workScheduleID": "66cf53bd99d5cbb097472d70",
            // "medicalPackageID": "669f725b253dce8de433cd3c",
            // "type": "Khám lần 1",
            // "time": "2024-07-23T09:05:31.473+00:00",
            // "status": "Chờ xác nhận",
            // "price": 433344,
            // "appointmentHelpUser": {
            //     "fullName": "help",
            //     "phoneNumber": "string",
            //     "email": "string",
            //     "gender": "string",
            //     "dateOfBirth": "2024-08-04T16:16:21.586Z",
            //     "address": {
            //       "province": "string",
            //       "district": "string",
            //       "ward": "string",
            //       "street": "string"
            //     },
            //     "citizenIdentificationNumber": 0,
            //     "occupation": "string",
            //     "ethnic": "string",
            //     "password": "string"
            // }
            //   }
            $resultCode = $request->resultCode;
            // return $resultCode;
            if ($resultCode !== 0) {
                return response()->json(['error' => 'Paid fail.'], 400);
            }

            $amount = $request->input('amount');
            $signature = $request->input('signature');
            $extraData = $request->input('extraData');

            $appointmentData = $extraData;

//            $appointmentData = json_decode($extraData, true);

            $newPatient = null;
            $dataAppointment = $this->saveAppointment($appointmentData,$signature,"PAID","MOMO");
            $link='';
            if($dataAppointment){
                foreach ($dataAppointment['appointmentID'] as $id) {
                    if($link==''){
                        $link.='?id[]='. strval($id);
                    }else{
                        $link.='&id[]='. strval($id);
                    }
                }
            }
            return redirect(env('LINK_SUCCESS').$link);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    function saveAppointment($dataAppointment,$signature,$status,$payment)
    {
        $appointmentData = json_decode($dataAppointment, true);

        $newPatient = null;
        $appointmentID=[];
        $createNewPatient=false;
        if (isset($appointmentData['appointmentHelpUser'])) {
            $appointmentHelpUser = $appointmentData['appointmentHelpUser'];
            $newUser = User::where("phoneNumber", $appointmentHelpUser["phoneNumber"])->first();
            if (!$newUser) {
                $roleID = env('ROLE_PATIENT');
                $endUser = User::where('roleID', new ObjectId($roleID))->whereNotNull('otherInfo.patientCode')->latest("id")->first();

                $codePatient = "";
                if ($endUser && isset($endUser->otherInfo['patientCode'])) {
                    $codePatient = "BN" . ((int)substr($endUser->otherInfo['patientCode'], 2) + 1);
                } else {
                    $codePatient = "BN1";
                }
                $otherInfo = [
                    'occupation' => $appointmentHelpUser['occupation'] ?? '',
                    'ethnic' => $appointmentHelpUser['ethnic'] ?? '',
                    'patientCode' => $codePatient,
                    'insuranceCode' => $appointmentHelpUser['insuranceCode'] ?? '',
                ];
                $newPatient = User::create([
                    "fullName" => $appointmentHelpUser['fullName'],
                    "phoneNumber" => $appointmentHelpUser['phoneNumber'],
                    "email" => $appointmentHelpUser['email'],
                    "gender" => $appointmentHelpUser['gender'],
                    "dateOfBirth" => $appointmentHelpUser['dateOfBirth'],
                    "address" => $appointmentHelpUser['address'],
                    "citizenIdentificationNumber" => $appointmentHelpUser['citizenIdentificationNumber'],
                    "otherInfo" => $otherInfo,
                    "password" => generateRandomString(),
                    "isActivated" => true,
                    "roleID" => env('ROLE_PATIENT')
                ]);
                $createNewPatient = true;
            } else {
                $newPatient = $newUser;
            }
        }

        foreach ($appointmentData['data'] as $appointment) {
            $newAppointment = null;
            if ($newPatient) {
                if (isset($appointment['serviceID'])) {
                    $newAppointment = Appointment::create([
                        'serviceID' => $appointment['serviceID'],
                        'workScheduleID' => $appointment['workScheduleID'],
                        'type' => $appointment['type'],
                        'time' => $appointment['time'],
                        'status' => $appointment['status'],
                        'payment' => [
                            'method' => $payment,
                            'refundCode' => $signature,
                            'status' => $status
                        ],
                        'patientID' => $newPatient['id'],
                        'patientHelpID' => new objectId($appointmentData['patientID']),
                    ]);
                    $appointmentID[]=strval($newAppointment->id);
                } else {
                    $newAppointment = Appointment::create([
                        'medicalPackageID' => $appointment['medicalPackageID'],
                        'workScheduleID' => $appointment['workScheduleID'],
                        'type' => $appointment['type'],
                        'time' => $appointment['time'],
                        'status' => $appointment['status'],
                        'payment' => [
                            'method' => $payment,
                            'refundCode' => $signature,
                            'status' => $status
                        ],
                        'patientID' => $newPatient['id'],
                        'patientHelpID' => new objectId($appointmentData['patientID']),
                    ]);
                    $appointmentID[]=strval($newAppointment->id);

                }

                $patientUpdate = User::where('id', $appointmentData['patientID'])->first();

                if ($patientUpdate) {
                    $otherInfo = $patientUpdate->otherInfo ?: [];

                    if (!isset($otherInfo['relatedPatientsID'])) {
                        $otherInfo['relatedPatientsID'] = [];
                    }
                    $newPatientId = new ObjectId($newPatient->id);
                    $exists = false;

                    foreach ($otherInfo['relatedPatientsID'] as $existingId) {
                        if ((string)$existingId === (string)$newPatientId) {
                            $exists = true;
                            break;
                        }
                    }
                    if (!$exists) {
                        $otherInfo['relatedPatientsID'][] = $newPatientId;
                        $patientUpdate->otherInfo = $otherInfo;
                        $patientUpdate->save();
                    }
                }
            } else {
                if (isset($appointment['serviceID'])) {
                    $newAppointment = Appointment::create([
                        'serviceID' => $appointment['serviceID'],
                        'workScheduleID' => $appointment['workScheduleID'],
                        'type' => $appointment['type'],
                        'time' => $appointment['time'],
                        'status' => $appointment['status'],
                        'payment' => [
                            'method' => $payment,
                            'refundCode' => $signature,
                            'status' => $status
                        ],
                        'patientID' => $appointmentData['patientID'],
                    ]);
                    $appointmentID[]=strval($newAppointment->id);

                } else {
                    $newAppointment = Appointment::create([
                        'medicalPackageID' => $appointment['medicalPackageID'],
                        'workScheduleID' => $appointment['workScheduleID'],
                        'type' => $appointment['type'],
                        'time' => $appointment['time'],
                        'status' => $appointment['status'],
                        'payment' => [
                            'method' => $payment,
                            'refundCode' => $signature,
                            'status' => $status
                        ],
                        'patientID' => $appointmentData['patientID'],
                    ]);
                    $appointmentID[]=strval($newAppointment->id);

                }

            }
            if (isset($appointment['serviceID'])) {
                $service = Service::where('id', $appointment['serviceID'])->first();
                $service->orderCount++;
                $service->save();
            } else {
                $medicalPackage = MedicalPackage::where('services._id', new ObjectId($appointment['medicalPackageID']))->first();
                $medicalPackage->orderCount++;
                $medicalPackage->save();
            }
            // Tìm các cuộc hẹn trong ngày
            // "time": "2024-07-23T09:05:31.473+00:00"
            $date = $newAppointment->time;
            $startOfDay = Carbon::parse($date)->startOfDay();
            $endOfDay = Carbon::parse($date)->endOfDay();

            $appointmentIDsInDay = Appointment::where('time', '>=', $startOfDay->toISOString())
                ->where('time', '<=', $endOfDay->toISOString())
                ->pluck('id');

            $listID = [];
            foreach ($appointmentIDsInDay as $appointment1) {
                array_push($listID, new ObjectId($appointment1));
            }

            $lastOrderNumberInDay = OrderNumber::whereIn('appointmentID', $listID)
                ->orderBy('number', 'desc')
                ->first();

            $newOrderNumber = OrderNumber::create([
                'appointmentID' => $newAppointment->id,
                'number' => $lastOrderNumberInDay ? $lastOrderNumberInDay->number + 1 : 1,
                'priority' => 0
            ]);

            $newInvoice = Invoice::create([
                'appointmentID' => $newAppointment->id,
                'price' => (int)$appointment['price'],
            ]);
        }
        return [
            "appointmentID" => $appointmentID,
            "newPatient" => $createNewPatient?$newPatient:null,
        ];
    }
    function totalPrice($appointment)
    {
        $totalPrice = 0;
       if(isset($appointment['data']) && is_array($appointment['data'])) {
           foreach ($appointment['data'] as $index => $item) {

               if(isset($item['serviceID'])) {
                   $servicePrice=Service::find($item['serviceID'],['discountPrice']);
                   if($servicePrice) {
                       $totalPrice += $servicePrice->discountPrice;
                   }
               }else{
                   $medicalPackage = MedicalPackage::where('services._id', new ObjectId($item['medicalPackageID']))->first();
                   if($medicalPackage) {
                      foreach ($medicalPackage->services as $service) {
                          if(strval($service['id'])==$appointment['data'][$index]['medicalPackageID']) {
                              $totalPrice += $service['discountPrice'];
                              break;
                          }
                      }
                   }
               }
            }
       }
       return $totalPrice;
    }
}
