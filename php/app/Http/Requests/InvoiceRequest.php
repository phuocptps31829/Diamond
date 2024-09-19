<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends FormRequest
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
            'prescriptionID' => 'nullable|exists:Prescription,_id',
            'appointmentID' => 'nullable|exists:Appointment,_id',
            'serviceID' => 'nullable|exists:services,_id',
            'price' => 'required|numeric',
        ];
    }
    public function messages()
    {
        return [
            'prescriptionID.exists' => 'Invalid prescription ID.',
            'appointmentID.exists' => 'Invalid Appointment ID.',
            'serviceID.exists' => 'Invalid Service ID.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price should be a number.',
        ];
    }
}
