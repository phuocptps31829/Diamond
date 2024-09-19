<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplicableObjectRequest extends FormRequest
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
            'medicalPackageID' => 'required|exists:MedicalPackage,_id',
            'gender' => 'required|string',
            'age.min' => 'required|numeric',
            'age.max' => 'required|numeric',
            'isMarried' => 'required|boolean',
            'isFamily' => 'required|boolean',
        ];
    }
    public function messages()
    {
        return [
            'medicalPackageID.required' => 'Medical package ID is required',
            'MedicalPackage.exists' => 'The Medical package ID is invalid.',
            'gender.required' => 'Gender is required',
            'gender.string' => 'Gender should be a string',
            'age.min.required' => 'Min age is required',
            'age.min.numeric' => 'Min age should be a number',
            'age.max.required' => 'Max age is required',
            'age.max.numeric' => 'Max age should be a number',
            'isMarried.required' => 'Marital status is required',
            'isMarried.boolean' => 'Marital status should be a boolean',
            'isFamily.required' => 'Family status is required',
            'isFamily.boolean' => 'Family status should be a boolean',
        ];
    }
}