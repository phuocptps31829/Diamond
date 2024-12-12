<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
use Illuminate\Foundation\Http\FormRequest;

class PrescriptionRequest extends FormRequest
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
            'resultID' => ['required',new IsValidMongoId('Result')],
            'appointmentID' => ['required',new IsValidMongoId('Appointment')],
            "advice" => 'required|string',
            'medicines' => 'nullable|array',
            'medicines.*.medicineID' => ['required_without:medicineID',new IsValidMongoId('Medicine')],
            'medicines.*.quantity' => 'required_without:medicineID|integer|min:1',
            'medicines.*.dosage' => 'required_without:medicineID|string',
            "price" => "required|integer|min:0"
        ];
    }

    public function update(): array
    {
        return [
            'resultID' => ['nullable',new IsValidMongoId('Result')],
            'invoiceID' =>  ['nullable',new IsValidMongoId('Invoice')],
            "advice" => 'nullable|string',
            'medicines' => 'nullable|array',
            'medicines.*.medicineID' =>  ['required_without:medicineID',new IsValidMongoId('Medicine')],
            'medicines.*.quantity' => 'required_without:medicineID|integer|min:1',
            'medicines.*.dosage' => 'required_without:medicineID|string',
            "price" => "nullable|integer|min:0"
        ];
    }
}
