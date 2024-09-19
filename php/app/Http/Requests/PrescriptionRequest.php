<?php

namespace App\Http\Requests;

namespace App\Models\Medicine;

use Illuminate\Foundation\Http\FormRequest;

class PrescriptionRequest extends FormRequest
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
            'advice' => 'required|string',
            'medicines.*.medicinID' => 'required',
            'medicines.*.quantity' => 'required|integer|min:1',
            'dosage' => 'required|string',
        ];
    }
    public function messages()
    {
        return [
            'advice.required' => 'Advice is required',
            'advice.string' => 'Advice should be a string',
            'medicines.*.medicineID.required' => 'Medicine ID is required',
            'medicines.*.quantity.required' => 'Quantity is required',
            'medicines.*.quantity.integer' => 'Quantity must be an integer',
            'medicines.*.quantity.min' => 'Quantity must be at least 1',

            'dosage.required' => 'Dosage is required',
            'dosage.string' => 'Dosage should be a string',
        ];
    }
}
