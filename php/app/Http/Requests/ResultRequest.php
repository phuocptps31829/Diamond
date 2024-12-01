<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
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
    public function prepareForValidation()
    {
        foreach ($this->all() as $key => $value) {
            if (preg_match('/ID$/', $key) && preg_match('/^[a-f\d]{24}$/i', $value)) {
                $this->merge([
                    $key => new ObjectId($value)
                ]);
            } elseif (preg_match('/ID$/', $key) && !preg_match('/^[a-f\d]{24}$/i', $value)) {
                throw ValidationException::withMessages([
                    $key => ['ID không hợp lệ.']
                ]);
            }
        }
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
            'appointmentID'=>['required',new IsValidMongoId('Appointment')],
            'serviceID'=>['required',new IsValidMongoId('Service')],
        ];
    }
    public function createResultAndPrescription(): array
    {
        return [
            'payload' => 'required|array',
            'payload.*.result' => 'required|array',
            'payload.*.result.appointmentID' => ['required',new IsValidMongoId('Appointment')],
            'payload.*.result.serviceID' => ['required',new IsValidMongoId('Service')],
            'payload.*.result.diagnose' => 'required|string',
            'payload.*.result.images' => 'nullable|array',
            'payload.*.result.images.*' => 'nullable|string',
            'payload.*.result.description' => 'nullable|string',

            'payload.*.prescription' => 'nullable|array',
            'payload.*.prescription.advice' => 'required_with:payload.*.prescription|string',
            'payload.*.prescription.price' => 'required_with:payload.*.prescription|integer|min:0',
            'payload.*.prescription.medicines' => 'nullable|array',
            'payload.*.prescription.medicines.*.medicineID' => ['required_with:payload.*.prescription.medicines',new IsValidMongoId('Medicine')],
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
            'appointmentID'=>['nullable',new IsValidMongoId('Appointment')],
            'serviceID'=>['nullable',new IsValidMongoId('Service')],
        ];
    }
}
