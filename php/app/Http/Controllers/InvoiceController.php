<?php

namespace App\Http\Controllers;


use App\Models\Appointment;
use App\Models\Invoice;
use App\Models\MedicalPackage;
use App\Models\News;
use App\Models\Prescription;
use App\Models\Service;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Http\Requests\InvoiceRequest;
use App\Models\OrderNumber;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;
use MongoDB\BSON\ObjectId;
use Illuminate\Support\Facades\Redis;

class InvoiceController extends Controller
{
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

            Appointment::whereIn('_id', $ids)->where('isDeleted', false)->update(['isDeleted' => true]);
            Invoice::whereIn('appointmentID', $ids)->where('isDeleted', false)->update(['isDeleted' => true]);
            OrderNumber::whereIn('appointmentID', $ids)->where('isDeleted', false)->update(['isDeleted' => true]);
            Prescription::whereIn('appointmentID', $ids)->where('isDeleted', false)->update(['isDeleted' => true]);

            return response()->json([
                'status' => 'success',
                'message' => 'Appointments deleted successfully.'
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

            $appointment = Appointment::where('_id', $id)->where('isDeleted', false)->first();
            if (!$appointment) {
                return createError(404, 'Service not found');
            }
            $invoice = Invoice::where('appointmentID', new ObjectId($id))->where('isDeleted', false)->first();
            if ($invoice) {
                $invoice->isDeleted = true;
                $invoice->save();
            }

            $orderNumber = OrderNumber::where("appointmentID", new ObjectId($id))->where('isDeleted', false)->first();
            if ($orderNumber) {
                $orderNumber->isDeleted = true;
                $orderNumber->save();
            }

            $prescription = Prescription::where('appointmentID', new ObjectId($id))->where('isDeleted', false)->first();
            if ($prescription) {
                $prescription->isDeleted = true;
                $prescription->save();
            }

            $appointment->update(['isDeleted' => true]);

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

            $orderNumber = OrderNumber::where('appointmentID', new ObjectId($id))->where('isDeleted', false)->first();

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
            $appointment = Appointment::where('_id', $id)->where('isDeleted', false)->first();

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
            $appointment = Appointment::where('_id', $id)->where('isDeleted', false)->first();

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

            $newPatient = null;
            $orderNumber = [];
            if (isset($appointmentData['appointmentHelpUser'])) {
                $appointmentHelpUser = $appointmentData['appointmentHelpUser'];
                $newUser = User::where("phoneNumber", $appointmentHelpUser["phoneNumber"])->first();

                if (!$newUser) {
                    $roleID = '66fcca5b682b8e25c2dc43a4';
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
                        "email" => $appointmentHelpUser['email'] ?? '',
                        "gender" => $appointmentHelpUser['gender'],
                        "dateOfBirth" => $appointmentHelpUser['dateOfBirth'],
                        "address" => $appointmentHelpUser['address'],
                        "citizenIdentificationNumber" => $appointmentHelpUser['citizenIdentificationNumber'],
                        "password" => generateRandomString(),
                        "isActivated" => true,
                        "roleID" => env('ROLE_PATIENT'),
                        'otherInfo' => $otherInfo
                    ]);
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
                                'method' => 'COD',
                                'refundCode' => 'cod',
                                'status' => 'PENDING'
                            ],
                            'patientID' => $newPatient['id'],
                            'patientHelpID' => new ObjectId($appointmentData['patientID']),
                        ]);
                    } else {
                        $newAppointment = Appointment::create([
                            'medicalPackageID' => $appointment['medicalPackageID'],
                            'workScheduleID' => $appointment['workScheduleID'],
                            'type' => $appointment['type'],
                            'time' => $appointment['time'],
                            'status' => $appointment['status'],
                            'payment' => [
                                'method' => 'COD',
                                'refundCode' => 'cod',
                                'status' => 'PENDING'
                            ],
                            'patientID' => $newPatient['id'],
                            'patientHelpID' => new ObjectId($appointmentData['patientID']),
                        ]);
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
                                'method' => 'COD',
                                'refundCode' => 'cod',
                                'status' => 'PENDING'
                            ],
                            'patientID' => $appointmentData['patientID'],
                        ]);
                    } else {
                        $newAppointment = Appointment::create([
                            'medicalPackageID' => $appointment['medicalPackageID'],
                            'workScheduleID' => $appointment['workScheduleID'],
                            'type' => $appointment['type'],
                            'time' => $appointment['time'],
                            'status' => $appointment['status'],
                            'payment' => [
                                'method' => 'COD',
                                'refundCode' => 'cod',
                                'status' => 'PENDING'
                            ],
                            'patientID' => $appointmentData['patientID'],
                        ]);
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
                $orderNumber[0] = $newOrderNumber;
            }
            return response()->json(['status' => 'success', 'message' => 'Buy successfully.', "data" => $orderNumber], 200);
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
                    $appointmentData = json_decode($jsonData, true);

                    $newPatient = null;
                    if (isset($appointmentData['appointmentHelpUser'])) {
                        $appointmentHelpUser = $appointmentData['appointmentHelpUser'];
                        $newUser = User::where("phoneNumber", $appointmentHelpUser["phoneNumber"])->first();
                        if (!$newUser) {
                            $roleID = '66fcca5b682b8e25c2dc43a4';
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
                                        'method' => 'VNPAY',
                                        'refundCode' => $signature,
                                        'status' => 'PENDING'
                                    ],
                                    'patientID' => $newPatient['id'],
                                    'patientHelpID' => new objectId($appointmentData['patientID']),
                                ]);
                            } else {

                                $newAppointment = Appointment::create([
                                    'medicalPackageID' => $appointment['medicalPackageID'],
                                    'workScheduleID' => $appointment['workScheduleID'],
                                    'type' => $appointment['type'],
                                    'time' => $appointment['time'],
                                    'status' => $appointment['status'],
                                    'payment' => [
                                        'method' => 'VNPAY',
                                        'refundCode' => $signature,
                                        'status' => 'PENDING'
                                    ],
                                    'patientID' => $newPatient['id'],
                                    'patientHelpID' => new objectId($appointmentData['patientID']),
                                ]);

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
                            if ($appointment['serviceID']) {
                                $newAppointment = Appointment::create([
                                    'serviceID' => $appointment['serviceID'],
                                    'workScheduleID' => $appointment['workScheduleID'],
                                    'type' => $appointment['type'],
                                    'time' => $appointment['time'],
                                    'status' => $appointment['status'],
                                    'payment' => [
                                        'method' => 'VNPAY',
                                        'refundCode' => $signature,
                                        'status' => 'PENDING'
                                    ],
                                    'patientID' => $appointmentData['patientID'],
                                ]);
                            } else {
                                $newAppointment = Appointment::create([
                                    'medicalPackageID' => $appointment['medicalPackageID'],
                                    'workScheduleID' => $appointment['workScheduleID'],
                                    'type' => $appointment['type'],
                                    'time' => $appointment['time'],
                                    'status' => $appointment['status'],
                                    'payment' => [
                                        'method' => 'VNPAY',
                                        'refundCode' => $signature,
                                        'status' => 'PENDING'
                                    ],
                                    'patientID' => $appointmentData['patientID'],
                                ]);
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

                    return response()->json(['status' => 'success', 'message' => 'Thanh toán thành công.'], 200);

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
            $totalPrice = array_reduce($allData['data'], function ($a, $b) {
                return $a + (float)$b['price'];
            }, 0);
            $accessKey = 'F8BBA842ECF85';
            $secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
            // $accessKey = env('MOMO_SECRET_KEY');
            // $secretKey = env('MOMO_SECRET_KEY');
            $orderInfo = 'Thanh toán với MoMo';
            $partnerCode = 'MOMO';
            $redirectUrl = 'http://localhost:5173/payment-success';
            // $ipnUrl = env('MOMO_CALLBACK_URL');
            $ipnUrl = 'https://laravel.diamond.id.vn/api/v1/invoices/payment/momo/callback';
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
            $appointmentData = json_decode($extraData, true);

            $newPatient = null;
            if (isset($appointmentData['appointmentHelpUser'])) {
                $appointmentHelpUser = $appointmentData['appointmentHelpUser'];
                $newUser = User::where("phoneNumber", $appointmentHelpUser["phoneNumber"])->first();
                if (!$newUser) {
                    $roleID = '66fcca5b682b8e25c2dc43a4';
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
                                'method' => 'MOMO',
                                'refundCode' => $signature,
                                'status' => 'PENDING'
                            ],
                            'patientID' => $newPatient['id'],
                            'patientHelpID' => new objectId($appointmentData['patientID']),
                        ]);
                    } else {

                        $newAppointment = Appointment::create([
                            'medicalPackageID' => $appointment['medicalPackageID'],
                            'workScheduleID' => $appointment['workScheduleID'],
                            'type' => $appointment['type'],
                            'time' => $appointment['time'],
                            'status' => $appointment['status'],
                            'payment' => [
                                'method' => 'MOMO',
                                'refundCode' => $signature,
                                'status' => 'PENDING'
                            ],
                            'patientID' => $newPatient['id'],
                            'patientHelpID' => new objectId($appointmentData['patientID']),
                        ]);

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
                    if ($appointment['serviceID']) {
                        $newAppointment = Appointment::create([
                            'serviceID' => $appointment['serviceID'],
                            'workScheduleID' => $appointment['workScheduleID'],
                            'type' => $appointment['type'],
                            'time' => $appointment['time'],
                            'status' => $appointment['status'],
                            'payment' => [
                                'method' => 'MOMO',
                                'refundCode' => $signature,
                                'status' => 'PENDING'
                            ],
                            'patientID' => $appointmentData['patientID'],
                        ]);
                    } else {
                        $newAppointment = Appointment::create([
                            'medicalPackageID' => $appointment['medicalPackageID'],
                            'workScheduleID' => $appointment['workScheduleID'],
                            'type' => $appointment['type'],
                            'time' => $appointment['time'],
                            'status' => $appointment['status'],
                            'payment' => [
                                'method' => 'MOMO',
                                'refundCode' => $signature,
                                'status' => 'PENDING'
                            ],
                            'patientID' => $appointmentData['patientID'],
                        ]);
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

            return response()->json(['status' => 'success', 'message' => 'Buy successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
