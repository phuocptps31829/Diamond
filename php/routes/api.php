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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/add', function () {
    // Dữ liệu mẫu
    $sampleData = [
        'name' => '66e6ab6dfcde63a3ef03aac5',
        'email' => 'john.doe@example.com',
        'password' => 'password123',
    ];

    // Tạo user mới với dữ liệu mẫu
    $user = User::create([
        'name' => $sampleData['name'],
        'email' => $sampleData['email'],
        'password' => $sampleData['password'],
    ]);

    return response()->json(['message' => 'Sample user created successfully', 'user' => $user], 201);
});


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
Route::delete('/v1/doctors/delete/{id}', [DoctorController::class, 'deleteClinic']);