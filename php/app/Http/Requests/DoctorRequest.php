<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DoctorRequest extends FormRequest
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
            "roleID" =>  ['nullable',new IsValidMongoId('Role')],
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
            'password' => 'required|string|min:6',
            'avatar' => 'nullable|string',
            'isActivated' => 'required|boolean',
            'citizenIdentificationNumber' => 'nullable|numeric',
            'otherInfo.specialtyID' =>  ['required',new IsValidMongoId('Specialty')],
            'otherInfo.branchID' =>  ['required',new IsValidMongoId('Branch')],
            'otherInfo.title' => 'nullable|string',
            'otherInfo.yearsExperience' => 'nullable|string',
            'otherInfo.detail' => 'nullable|string',
            'otherInfo.isInternal' => 'nullable|boolean',
            'otherInfo.verification.practicingCertificate' => 'required|string',
            'otherInfo.verification.images' => 'required|array',
        ];
    }
    public function update(): array
    {
        return [
            'fullName' => 'nullable|string',
            "roleID" => ['nullable',new IsValidMongoId('Role')],
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
            'password' => 'nullable|string|min:6',
            'avatar' => 'nullable|string',
            'isActivated' => 'nullable|boolean',
            'citizenIdentificationNumber' => 'nullable|numeric',
            'otherInfo.specialtyID' => ['nullable',new IsValidMongoId('Specialty')],
            'otherInfo.branchID' => ['nullable',new IsValidMongoId('Branch')],
            'otherInfo.title' => 'nullable|string',
            'otherInfo.yearsExperience' => 'nullable|string',
            'otherInfo.detail' => 'nullable|string',
            'otherInfo.isInternal' => 'nullable|boolean',
            'otherInfo.verification.practicingCertificate' => 'nullable|string',
            'otherInfo.verification.images' => 'nullable|array',
        ];
    }

}
