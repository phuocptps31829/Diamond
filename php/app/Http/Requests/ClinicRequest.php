<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClinicRequest extends FormRequest
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
            'branchID' => 'required|exists:Branch,_id',
            'specialtyID' => 'required|exists:Specialty,_id',
            'name' => 'required|string',
        ];
    }
    public function messages()
    {
        return [
            'branchID.required' => 'Branch ID is required',
            'branchID.exists' => 'Branch ID does not exist',
            'specialtyID.required' => 'Specialty ID is required',
            'specialtyID.exists' => 'Specialty ID does not exist',
            'name.required' => 'Name is required',
            'name.string' => 'Name should be a string',
        ];
    }
}