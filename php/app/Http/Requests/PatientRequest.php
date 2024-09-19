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
            'patientCode' => 'required|string',
            'occupation' => 'nullable|string',
            'insuranceCode' => 'nullable|string',
            'ethic' => 'nullable|string',
            'healthInformation' => 'nullable|array',
            'healthInformation.*.type' => 'required_with:healthInformation|string',
            'healthInformation.*.data' => 'required_with:healthInformation|string',
            'healthInformation.*.unit' => 'required_with:healthInformation|string',
            'healthInformation.*.date' => 'required_with:healthInformation|date_format:Y-m-d',
        ];
    }
    public function messages()
    {
        return [
            'patientCode.required' => 'Patient code is required',
            'patientCode.string' => 'Patient code should be a string',
            'occupation.string' => 'Occupation should be a string',
            'insuranceCode.string' => 'Insurance code should be a string',
            'ethic.string' => 'Ethic should be a string',
            'healthInformation.array' => 'Health information should be an array',
            'healthInformation.*.type.required_with' => 'Type is required when health information is present',
            'healthInformation.*.data.required_with' => 'Data is required when health information is present',
            'healthInformation.*.unit.required_with' => 'Unit is required when health information is present',
            'healthInformation.*.date.required_with' => 'Date is required when health information is present',
            'healthInformation.*.date.date_format' => 'Date format should be YYYY-MM-DD',
        ];
    }
}
