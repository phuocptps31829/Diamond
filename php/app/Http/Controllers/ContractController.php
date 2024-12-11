<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContractRequest;
use App\Http\Requests\PrescriptionRequest;
use App\Models\Contract;
use App\Models\Doctor;
use App\Models\Prescription;
use App\Models\Specialty;
use App\Models\User;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectId;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\Style\Font;
use PhpOffice\PhpWord\TemplateProcessor;
use Illuminate\Support\Str;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Writer\HTML;
class ContractController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validate = new ContractRequest();
            if (isset($request->isInternal)) {
                $bl = $request->isInternal == "true" ? 1 : 0;
                $request->merge(['isInternal' => $bl]);
            }

            $data = $request->validate($validate->rules());
            $file = $request->file('file');
            $doctor = User::find($data['doctorID']);
            $data['doctorID'] = new ObjectId($data['doctorID']);
            $data['hospitalID'] = new ObjectId($data['hospitalID']);


            if ($data['isInternal']) {
                $templateProcessor = new TemplateProcessor('docx/template/HopDongLaoDong.docx');
            } else {
                $templateProcessor = new TemplateProcessor('docx/template/HopDongLaoDongBSPartTime.docx');
                $templateProcessor->setValue('timeWork', $data['timeWork']);
                $templateProcessor->setValue('countDate', $data['countDate']);
            }

            $info = $doctor->otherInfo;

            $dataDate = generateDate($data['time']);

            $specialty = Specialty::find((string)$info['specialtyID']);
            $templateProcessor->setValue('day', $dataDate['day']);
            $templateProcessor->setValue('date', $dataDate['date']);
            $templateProcessor->setValue('month', $dataDate['month']);
            $templateProcessor->setValue('year', $dataDate['year']);
            $templateProcessor->setValue('number', "HDLD-" . time());
            $templateProcessor->setValue('local-address', $doctor->address);
            $templateProcessor->setValue('address', $data['address']);
            $templateProcessor->setValue('birth', $doctor->dateOfBirth);
            $templateProcessor->setValue('gender', $doctor->gender);
            $templateProcessor->setValue('phone', $doctor->phoneNumber);
            $templateProcessor->setValue('email', $doctor->email);
            $templateProcessor->setValue('local-address', $doctor->dddress);
            $templateProcessor->setValue('cart', $doctor->citizenIdentificationNumber);
            $templateProcessor->setValue('specialty', $specialty->name);
            $templateProcessor->setValue('startDate', date_format(new \DateTime($data['startDate']), 'd-m-Y'));
            $templateProcessor->setValue('endDate', date_format(new \DateTime($data['endDate']), 'd-m-Y'));
            $templateProcessor->setValue('salary', $data['price']);
            $templateProcessor->setValue('name', $doctor->fullName);
            $templateProcessor->setValue('userName', $doctor->fullName);
            $templateProcessor->setValue('practicingCertificate', $doctor->otherInfo['verification']['practicingCertificate']);
            $templateProcessor->setImageValue('file', array(
                'data' => file_get_contents($request->file('file')->getRealPath()),
                'type' => $file->getClientMimeType(),
                'width' => 100,
                'height' => 60,
                'path' => $request->file('file')->getRealPath()
            ));
            $fileName =  Str::slug($doctor->fullName) . "-HDLD-" . time() . '.docx';
            $link='docx/contract/'.$fileName;
            $templateProcessor->saveAs($link);
            $data['file'] = $fileName;
            $contract = Contract::create($data);
            // Trả về file cho người dùng tải về

            return response()->json([
                'status' => 'success',
                'message' => 'Contact created successfully.',
                'data' => $contract,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function medicalContract(Request $request)
    {
        try {
            $validate = new ContractRequest();
            if (isset($request->isInternal)) {
                $bl = $request->isInternal == "true" ? 1 : 0;
                $request->merge(['isInternal' => $bl]);
            }

            $data = $request->validate($validate->rules2());
            $file = $request->file('file');
                $templateProcessor = new TemplateProcessor('docx/template/mau-hop-dong-dich-vu-y-te.docx');


            $dataDate = generateDate($data['time']);

            $templateProcessor->setValue('day', $dataDate['day']);
            $templateProcessor->setValue('date', $dataDate['date']);
            $templateProcessor->setValue('month', $dataDate['month']);
            $templateProcessor->setValue('year', $dataDate['year']);
            $templateProcessor->setValue('number', "HDYT-" . time());
//            $templateProcessor->setValue('local-address', $doctor->address);
            $templateProcessor->setValue('address', $data['address']);
            $templateProcessor->setValue('phone', $data['phone']);
            $templateProcessor->setValue('accountName', $data['accountName']);
            $templateProcessor->setValue('accountNumber', $data['accountNumber']);
            $templateProcessor->setValue('nameBank', $data['bankName']);
            $templateProcessor->setValue('startDate', date_format(new \DateTime($data['startDate']), 'd-m-Y'));
            $templateProcessor->setValue('endDate', date_format(new \DateTime($data['endDate']), 'd-m-Y'));
            $templateProcessor->setValue('salary', $data['price']);
            $templateProcessor->setValue('userName', $data['agent']);
            $templateProcessor->setValue('agent', $data['agent']);
            $templateProcessor->setValue('position', $data['position']);
            $templateProcessor->setValue('TIN', $data['tin']);
            $templateProcessor->setImageValue('file', array(
                'data' => file_get_contents($request->file('file')->getRealPath()),
                'type' => $file->getClientMimeType(),
                'width' => 100,
                'height' => 60,
                'path' => $request->file('file')->getRealPath()
            ));
            $fileName =  "HDYT-" . time() . '.docx';
            $link='docx/contract/'.$fileName;
            $templateProcessor->saveAs($link);
            $data['file'] = $fileName;
            $contract = Contract::create($data);
            // Trả về file cho người dùng tải về

            return response()->json([
                'status' => 'success',
                'message' => 'Contact created successfully.',
                'data' => $contract,
            ], 201);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

    public function export(Request $request)
    {
        try {
            $id = $request->route('id');
            $contact = Contract::where('_id', $id)->first();
            if (!$contact) {
                return createError(404, 'contact not found');
            }
            $filePath = public_path('docx/contract/' . $contact->file);
            return response()->download($filePath);
        } catch (\Exception $e) {
            return handleException($e);
        }
    }

}
