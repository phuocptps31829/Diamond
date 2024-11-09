<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientRequest extends FormRequest
{
    /**
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
            'fullName' => 'required|string',
            "roleID"=>"nullable|string",
            'phoneNumber' => [
                'required',
                'regex:/^[0-9]{10}$/',
            ],
            'email' => [
                'nullable',
                'email',
            ],
            'dateOfBirth' => 'nullable|date_format:Y-m-d',
            'address' => 'nullable|string',
            'gender' => 'nullable|string',
            'password' => 'required|string',
            'avatar' => 'nullable|string',
            'isActivated' => 'required|boolean',
            'citizenIdentificationNumber' => 'nullable|numeric',

            'otherInfo.occupation' => 'nullable|string',
            'otherInfo.patientCode' => 'nullable|string',
            'otherInfo.insuranceCode' => 'nullable|string',
            'otherInfo.ethnic' => 'nullable|string',
            'otherInfo.relatedPatientsID' => 'nullable|array',
            'otherInfo.healthInformation' => 'nullable|array',
            'otherInfo.healthInformation.*.type' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.data' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.unit' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.date' => 'required_with:healthInformation|date_format:Y-m-d',
        ];
    }
    public function update(): array
    {
        return [
            'fullName' => 'required|string',
            "roleID"=>"nullable|string",
            'phoneNumber' => [
                'required',
                'regex:/^[0-9]{10}$/',
            ],
            'email' => [
                'nullable',
                'email',
            ],
            'dateOfBirth' => 'nullable|date_format:Y-m-d',
            'address' => 'nullable|string',
            'gender' => 'nullable|string',
            'password' => 'nullable|string',
            'avatar' => 'nullable|string',
            'isActivated' => 'required|boolean',
            'citizenIdentificationNumber' => 'nullable|numeric',
            'otherInfo.patientCode' => 'nullable|string',

            'otherInfo.occupation' => 'nullable|string',
            'otherInfo.insuranceCode' => 'nullable|string',
            'otherInfo.ethnic' => 'nullable|string',
            'otherInfo.relatedPatientsID' => 'nullable|array',
            'otherInfo.healthInformation' => 'nullable|array',
            'otherInfo.healthInformation.*.type' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.data' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.unit' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.date' => 'required_with:healthInformation|date_format:Y-m-d',
        ];
    }
    public function messages()
    {
        return [
            'otherInfo.patientCode.required' => 'Patient code is required',
            'otherInfo.patientCode.string' => 'Patient code should be a string',
            'otherInfo.occupation.string' => 'Occupation should be a string',
            'otherInfo.insuranceCode.string' => 'Insurance code should be a string',
            'otherInfo.ethic.string' => 'Ethic should be a string',
            'otherInfo.healthInformation.array' => 'Health information should be an array',
            'otherInfo.healthInformation.*.type.required_with' => 'Type is required when health information is present',
            'otherInfo.healthInformation.*.data.required_with' => 'Data is required when health information is present',
            'otherInfo.healthInformation.*.unit.required_with' => 'Unit is required when health information is present',
            'otherInfo.healthInformation.*.date.required_with' => 'Date is required when health information is present',
            'otherInfo.healthInformation.*.date.date_format' => 'Date format should be YYYY-MM-DD',
        ];
    }
}
