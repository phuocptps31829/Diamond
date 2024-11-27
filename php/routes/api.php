<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\Specialty;
use App\Http\Controllers\SpecialtyController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\MedicineCategoryController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\MedicalPackageController;
use App\Http\Controllers\ApplicableObjectController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\WorkScheduleController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\PusherController;
use App\Http\Controllers\ContractController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/v1/patients/update/avatar/{id}', [PatientController::class, 'updateImage']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['web'])->group(function () {
    Route::get('/v1/auth/google', [AuthController::class, 'loginGoogle']);
    Route::get('/v1/auth/google/callback', [AuthController::class, 'googleCallback']);
    Route::get('/v1/auth/facebook', [AuthController::class, 'loginFacebook']);
    Route::get('/v1/auth/facebook/callback', [AuthController::class, 'facebookCallback']);
});
Route::get('/chat', function () {
    return view('index');
});
Route::post('/v1/auth/login', [AuthController::class, 'login']);
Route::post('/v1/auth/register', [AuthController::class, 'register']);
Route::post('/v1/auth/forgot-password/send-otp/{phone}', [AuthController::class, 'sendOTPForgotPassword']);
Route::post('/v1/auth/forgot-password/check-otp', [AuthController::class, 'checkOTPForgotPassword'])->middleware('VerifyOTP');
Route::put('/v1/auth/forgot-password/reset-password', [AuthController::class, 'forgotPassword'])->middleware('VerifyOTP');

Route::post('/v1/auth/refresh-token', [AuthController::class, 'refreshToken'])->middleware('VerifyRefreshToken');

Route::post('/v1/auth/logout', [AuthController::class, 'logout'])->middleware('VerifyRefreshToken');

//export
Route::get('/v1/invoices/export', [InvoiceController::class, 'exportInvoice']);
Route::get('/v1/contracts/export/{id}', [ContractController::class, 'export']);

Route::post('/v1/pusher/auth', [PusherController::class, 'auth']);

Route::post('/v1/contracts/add/doctor', [ContractController::class, 'create']);
Route::post('/v1/contracts/add/health', [ContractController::class, 'medicalContract']);
//Route::post('/v1/contracts/add', [ContractController::class, 'create']);

// Route::group(['middleware' => 'CheckSecret'], function () {
Route::get('/v1/work-schedules', [WorkScheduleController::class, 'getAllWorkSchedule'])->middleware('checkQueryParams');
Route::get('/v1/work-schedules/{id}', [WorkScheduleController::class, 'getOneWorkSchedule'])->middleware('CheckValidId');
Route::post('/v1/work-schedules/add', [WorkScheduleController::class, 'createWorkSchedule']);
Route::put('/v1/work-schedules/update/{id}', [WorkScheduleController::class, 'updateWorkSchedule'])->middleware('CheckValidId');
Route::delete('/v1/work-schedules/delete/{id}', [WorkScheduleController::class, 'deleteWorkSchedule']);

Route::post('/v1/results/result-prescription/add', [ResultController::class, 'createResultAndPrescription']);

Route::get('/v1/results', [ResultController::class, 'getAllResult'])->middleware('checkQueryParams');
Route::get('/v1/results/{id}', [ResultController::class, 'getOneResult'])->middleware('CheckValidId');
Route::post('/v1/results/add', [ResultController::class, 'createResult']);
Route::put('/v1/results/update/{id}', [ResultController::class, 'updateResult'])->middleware('CheckValidId');
Route::delete('/v1/results/delete/{id}', [ResultController::class, 'deleteResult']);

Route::get('/v1/prescriptions', [PrescriptionController::class, 'getAllPrescription'])->middleware('checkQueryParams');
Route::get('/v1/prescriptions/{id}', [PrescriptionController::class, 'getOnePrescription'])->middleware('CheckValidId');
Route::post('/v1/prescriptions/add', [PrescriptionController::class, 'createPrescription']);
Route::put('/v1/prescriptions/update/{id}', [PrescriptionController::class, 'updatePrescription'])->middleware('CheckValidId');
Route::delete('/v1/prescriptions/delete/{id}', [PrescriptionController::class, 'deletePrescription']);

Route::post('/v1/invoices/delete-in-id', [InvoiceController::class, 'deleteAppointmentInArrayID']);
Route::delete('/v1/invoices/delete/{id}', [InvoiceController::class, 'deleteAppointment']);
Route::patch('/v1/invoices/update-order-number/{id}', [InvoiceController::class, 'updateOrderNumber']);
Route::patch('/v1/invoices/update-status/{id}', [InvoiceController::class, 'updateStatus']);
Route::patch('/v1/invoices/payment/update-status/{id}', [InvoiceController::class, 'updatePaymentStatus']);
Route::put('/v1/invoices/update/appointment-work-/{id}', [InvoiceController::class, 'updateWorkScheduleFromInvoice']);

Route::post('/v1/invoices/payment/vnpay', [InvoiceController::class, 'vnpayPayment']);
Route::get('/v1/invoices/payment/vnpay/vnpay_return', [InvoiceController::class, 'vnpayPaymentCallback']);
Route::post('/v1/invoices/payment/momo/callback', [InvoiceController::class, 'momoPaymentCallback']);
Route::post('/v1/invoices/payment/momo', [InvoiceController::class, 'momoPayment']);
Route::post('/v1/invoices/payment/cod', [InvoiceController::class, 'codPayment']);
Route::put('/v1/auth/change-password', [AuthController::class, 'resetPassword'])->middleware('CheckToken');


Route::post('/v1/images/upload', [ImageController::class, 'uploadImage']);
Route::post('/v1/images/upload-images', [ImageController::class, 'uploadImages']);

Route::post('/v1/patients/add', [PatientController::class, 'createPatient'])->middleware('VerifyOTP');
Route::post('/v1/patients/admin-add', [PatientController::class, 'createPatientFromAdmin']);
Route::put('/v1/patients/update/{id}', [PatientController::class, 'updatePatient'])->middleware('CheckValidId');
Route::put('/v1/patients/update/avatar/{id}', [PatientController::class, 'updateImage'])->middleware('CheckValidId');

Route::delete('/v1/patients/delete/{id}', [PatientController::class, 'deletePatient']);

Route::post('/v1/staffs/add', [StaffController::class, 'createStaffFromAdmin']);
//Route::post('/v1/staffs/admin-add', [StaffController::class, 'createStaffFromAdmin']);
Route::put('/v1/staffs/update/{id}', [StaffController::class, 'updateStaff'])->middleware('CheckValidId');
Route::delete('/v1/staffs/delete/{id}', [StaffController::class, 'deleteStaff']);

Route::get('/v1/roles', [RoleController::class, 'getAllRoles'])->middleware('checkQueryParams');
Route::get('/v1/roles/{id}', [RoleController::class, 'getOneRole'])->middleware('CheckValidId');
Route::post('/v1/roles/add', [RoleController::class, 'createRole']);
Route::put('/v1/roles/update/{id}', [RoleController::class, 'updateRole'])->middleware('CheckValidId');
Route::delete('/v1/roles/delete/{id}', [RoleController::class, 'deleteRole']);

Route::get('/v1/specialties', [SpecialtyController::class, 'getAllSpecialties'])->middleware('checkQueryParams');
Route::get('/v1/specialties/{id}', [SpecialtyController::class, 'getOneSpecialty'])->middleware('CheckValidId');
Route::post('/v1/specialties/add', [SpecialtyController::class, 'createSpecialty']);
Route::put('/v1/specialties/update/{id}', [SpecialtyController::class, 'updateSpecialty'])->middleware('CheckValidId');
Route::delete('/v1/specialties/delete/{id}', [SpecialtyController::class, 'deleteSpecialty']);

Route::get('/v1/hospitals', [HospitalController::class, 'getAllHospitals'])->middleware('checkQueryParams');
Route::get('/v1/hospitals/{id}', [HospitalController::class, 'getOneHospital'])->middleware('CheckValidId');
Route::post('/v1/hospitals/add', [HospitalController::class, 'createHospital']);
Route::put('/v1/hospitals/update/{id}', [HospitalController::class, 'updateHospital'])->middleware('CheckValidId');
Route::delete('/v1/hospitals/delete/{id}', [HospitalController::class, 'deleteHospital']);

Route::get('/v1/news', [NewsController::class, 'getAllNews'])->middleware('checkQueryParams');
Route::get('/v1/news/{id}', [NewsController::class, 'getOneNews'])->middleware('CheckValidId');
Route::post('/v1/news/add', [NewsController::class, 'createNews']);
Route::put('/v1/news/update/{id}', [NewsController::class, 'updateNews'])->middleware('CheckValidId');
Route::delete('/v1/news/delete/{id}', [NewsController::class, 'deleteNews']);
Route::patch('/v1/news/plus-view-count/{id}', [NewsController::class, 'viewCount'])->middleware('CheckValidId');

Route::get('/v1/branches', [BranchController::class, 'getAllBranches'])->middleware('checkQueryParams');
Route::get('/v1/branches/{id}', [BranchController::class, 'getOneBranch'])->middleware('CheckValidId');
Route::post('/v1/branches/add', [BranchController::class, 'createBranch']);
Route::put('/v1/branches/update/{id}', [BranchController::class, 'updateBranch'])->middleware('CheckValidId');
Route::delete('/v1/branches/delete/{id}', [BranchController::class, 'deleteBranch']);

Route::get('/v1/medicine-categories', [MedicineCategoryController::class, 'getAllMedicineCategories'])->middleware('checkQueryParams');
Route::get('/v1/medicine-categories/{id}', [MedicineCategoryController::class, 'getOneMedicineCategory'])->middleware('CheckValidId');
Route::post('/v1/medicine-categories/add', [MedicineCategoryController::class, 'createMedicineCategory']);
Route::put('/v1/medicine-categories/update/{id}', [MedicineCategoryController::class, 'updateMedicineCategory'])->middleware('CheckValidId');
Route::delete('/v1/medicine-categories/delete/{id}', [MedicineCategoryController::class, 'deleteMedicineCategory']);

Route::get('/v1/medicines', [MedicineController::class, 'getAllMedicines'])->middleware('checkQueryParams');
Route::get('/v1/medicines/{id}', [MedicineController::class, 'getOneMedicine'])->middleware('CheckValidId');
Route::post('/v1/medicines/add', [MedicineController::class, 'createMedicine']);
Route::put('/v1/medicines/update/{id}', [MedicineController::class, 'updateMedicine'])->middleware('CheckValidId');
Route::delete('/v1/medicines/delete/{id}', [MedicineController::class, 'deleteMedicine']);

Route::get('/v1/services', [ServiceController::class, 'getAllServices'])->middleware('checkQueryParams');
Route::get('/v1/services/{id}', [ServiceController::class, 'getOneService'])->middleware('CheckValidId');
Route::post('/v1/services/add', [ServiceController::class, 'createService']);
Route::put('/v1/services/update/{id}', [ServiceController::class, 'updateService'])->middleware('CheckValidId');
Route::delete('/v1/services/delete/{id}', [ServiceController::class, 'deleteService']);

Route::get('/v1/medical-packages', [MedicalPackageController::class, 'getAllMedicalPackages'])->middleware('checkQueryParams');
Route::get('/v1/medical-packages/{id}', [MedicalPackageController::class, 'getOneMedicalPackage'])->middleware('CheckValidId');
Route::post('/v1/medical-packages/add', [MedicalPackageController::class, 'createMedicalPackage']);
Route::put('/v1/medical-packages/update/{id}', [MedicalPackageController::class, 'updateMedicalPackage'])->middleware('CheckValidId');
Route::delete('/v1/medical-packages/delete/{id}', [MedicalPackageController::class, 'deleteMedicalPackage']);

Route::get('/v1/applicable-objects', [ApplicableObjectController::class, 'getAllApplicableObjects'])->middleware('checkQueryParams');
Route::get('/v1/applicable-objects/{id}', [ApplicableObjectController::class, 'getOneApplicableObject'])->middleware('CheckValidId');
Route::post('/v1/applicable-objects/add', [ApplicableObjectController::class, 'createApplicableObject']);
Route::put('/v1/applicable-objects/update/{id}', [ApplicableObjectController::class, 'updateApplicableObject'])->middleware('CheckValidId');
Route::delete('/v1/applicable-objects/delete/{id}', [ApplicableObjectController::class, 'deleteApplicableObject']);

Route::get('/v1/clinics', [ClinicController::class, 'getAllClinics'])->middleware('checkQueryParams');
Route::get('/v1/clinics/{id}', [ClinicController::class, 'getOneClinic'])->middleware('CheckValidId');
Route::post('/v1/clinics/add', [ClinicController::class, 'createClinic']);
Route::put('/v1/clinics/update/{id}', [ClinicController::class, 'updateClinic'])->middleware('CheckValidId');
Route::delete('/v1/clinics/delete/{id}', [ClinicController::class, 'deleteClinic']);

Route::get('/v1/doctors', [DoctorController::class, 'getAllDoctors'])->middleware('checkQueryParams');
Route::get('/v1/doctors/{id}', [DoctorController::class, 'getOneDoctor'])->middleware('CheckValidId');
Route::post('/v1/doctors/add', [DoctorController::class, 'createDoctor']);
Route::put('/v1/doctors/update/{id}', [DoctorController::class, 'updateDoctor'])->middleware('CheckValidId');
Route::delete('/v1/doctors/delete/{id}', [DoctorController::class, 'deleteDoctor']);
// });
