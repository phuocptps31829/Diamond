<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
{
    /**
     *
     * 
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'patientID' =>  ['required',new IsValidMongoId('User')],
            'data' => 'required|array',
            'data.*.medicalPackageID' =>  ['nullable','string'],
            'data.*.serviceID' =>['nullable',new IsValidMongoId('Service')],
            'data.*.workScheduleID' => 'nullable|string',
            'data.*.type' => 'required|string',
            'data.*.time' => 'required|date',
            'data.*.status' => 'required|string',
            'data.*.price' => 'required|numeric|min:0',
            'appointmentHelpUser' => 'nullable|array',
            'appointmentHelpUser.fullName' => 'required_with:appointmentHelpUser|string|max:255',
            'appointmentHelpUser.phoneNumber' => 'required_with:appointmentHelpUser|string|max:12',
            'appointmentHelpUser.email' => 'nullable|email',
            'appointmentHelpUser.gender' => 'required_with:appointmentHelpUser|string|in:Nam,Nữ,0',
            'appointmentHelpUser.dateOfBirth' => 'required_with:appointmentHelpUser|date',
            'appointmentHelpUser.address' => 'required_with:appointmentHelpUser|string|max:255',
            'appointmentHelpUser.citizenIdentificationNumber' => 'required_with|string',
            'appointmentHelpUser.occupation' => 'nullable|string|max:255',
            'appointmentHelpUser.ethnic' => 'nullable|string|max:255',
            'appointmentHelpUser.password' => 'nullable|string|min:6',
        ];
    }


}
