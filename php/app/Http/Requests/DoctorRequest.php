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
            'userID' => 'required|exists:User,_id',
            'specialtyID' => 'required|exists:Specialty,_id',
            'title' => 'nullable|string',
            'practicingCertificate' => 'nullable|string',
            'yearsExperience' => 'nullable|numeric',
            'detail' => 'nullable|string',
            'isInternal' => 'nullable|boolean',
        ];
    }
}