<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResultRequest extends FormRequest
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
            'diagnose' => 'required|string',
            'images' => 'nullable|array',
            'description'=>'nullable|string',
            'appointmentID'=>'required|string',
            'serviceID'=>'required|string',
        ];
    }
    public function createResultAndPrescription(): array
    {
        return [
            'payload' => 'required|array',
            'payload.*.result' => 'required|array',
            'payload.*.result.appointmentID' => 'required|string',
            'payload.*.result.serviceID' => 'required|string',
            'payload.*.result.diagnose' => 'required|string',
            'payload.*.result.images' => 'nullable|array',
            'payload.*.result.images.*' => 'nullable|string',
            'payload.*.result.description' => 'nullable|string',

            'payload.*.prescription' => 'nullable|array',
            'payload.*.prescription.advice' => 'required_with:payload.*.prescription|string',
            'payload.*.prescription.price' => 'required_with:payload.*.prescription|integer',
            'payload.*.prescription.medicines' => 'nullable|array',
            'payload.*.prescription.medicines.*.medicineID' => 'required_with:payload.*.prescription.medicines|string',
            'payload.*.prescription.medicines.*.quantity' => 'required_with:payload.*.prescription.medicines|integer',
            'payload.*.prescription.medicines.*.dosage' => 'required_with:payload.*.prescription.medicines|string',
        ];
    }
    public function update(): array
    {
        return [
            'diagnose' => 'nullable|string',
            'images' => 'nullable|array',
            'description'=>'nullable|string',
            'appointmentID'=>'nullable|string',
            'serviceID'=>'nullable|string',
        ];
    }
    public function messages()
    {
        return [
            'score.required' => 'Score is required',
            'score.numeric' => 'Score should be a number',
            'subject.required' => 'Subject is required',
            'subject.string' => 'Subject should be a string',
            'studentID.required' => 'Student ID is required',
        ];
    }
}
