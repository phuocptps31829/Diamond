<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
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
            "roleID"=> ['required',new IsValidMongoId('Role')],
            'phoneNumber' => [
                'required',
                'regex:/^[0-9]{10,11}$/',
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
            'otherInfo.relatedPatientsID' => 'nullable|array|',
            'otherInfo.relatedPatientsID.*' => ['required_with:otherInfo.relatedPatientsID',new IsValidMongoId('User')],
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
            'fullName' => 'nullable|string',
            "roleID"=> ['nullable',new IsValidMongoId('Role')],
            'phoneNumber' => [
                'nullable',
                'regex:/^[0-9]{10,11}$/',
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
            'otherInfo.relatedPatientsID' => 'nullable|array|',
            'otherInfo.relatedPatientsID.*' => ['required_with:otherInfo.relatedPatientsID',new IsValidMongoId('User')],
            'otherInfo.healthInformation' => 'nullable|array',
            'otherInfo.healthInformation.*.type' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.data' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.unit' => 'required_with:healthInformation|string',
            'otherInfo.healthInformation.*.date' => 'required_with:healthInformation|date_format:Y-m-d',
        ];
    }
}
