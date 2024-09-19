<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContractRequest extends FormRequest
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
            'doctorID' => ['required', 'exists:Doctor,_id'],
            'hospitalID' => 'nullable|exists:HospitalID,_id',
            'startDate' => 'required|date_format:Y-m-d',
            'endDate' => 'required|date_format:Y-m-d',
            'detail' => 'required|string',
        ];
    }
    public function messages()
    {
        return [
            'doctorID.required' => 'Doctor ID is required',
            'doctorID.exists' => 'Doctor ID must exist in the doctor table',
            'hospitalID.required' => 'Hospital ID is required',
            'hospitalID.exists' => 'Hospital ID must exist in the hospital table',
            'startDate.required' => 'Start date is required',
            'startDate.date_format' => 'Start date should be a date type',
            'endDate.required' => 'End date is required',
            'endDate.date_format' => 'End date should be a date type',
            'detail.required' => 'Detail is required',
            'detail.string' => 'Detail should be a string',
        ];
    }
}
