<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'phoneNumber' => 'nullable|string',
            'email' => 'nullable|string|email',
            'dateOfBirth' => 'nullable|date_format:Y-m-d',
            'address' => 'nullable|array',
            'address.province' => 'nullable|string',
            'address.district' => 'nullable|string',
            'address.ward' => 'nullable|string',
            'address.street' => 'nullable|string',
            'gender' => 'required|string',
            'password' => 'required|string',
            'avatar' => 'required|string',
            'citizenIdentificationNumber' => 'required|numeric',
            'isActivated' => 'required|boolean',
            'specialtyID' => 'nullable|exists:Specialty,_id',
            'title' => 'required|string',
            'practicingCertificate' => 'required|string',
            'yearsExperience' => 'required|numeric',
            'detail' => 'required|string',
            'isInternal' => 'required|boolean',
        ];
    }
}
