<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'patientID' =>  ['required',new IsValidMongoId('Patient')],
            'data.*.workScheduleID' =>  ['required',new IsValidMongoId('WorkSchedule')],
            'data.*.serviceID' =>  ['nullable',new IsValidMongoId('Service')],
            'data.*.medicalPackageID' =>  ['nullable',new IsValidMongoId('MedicalPackage')],
            'data.*.patientHelpID' =>  ['nullable',new IsValidMongoId('User')],

            'data.*.type' => 'required|string',
            'data.*.time' => 'required|date_format:Y-m-d\TH:i:s',
            'data.*.price' => 'required|numeric',
            'data.*.status' => 'required|string|in:Đã xác nhận,Đã hủy,Chờ xác nhận,Đã khám',
        ];
    }
}
