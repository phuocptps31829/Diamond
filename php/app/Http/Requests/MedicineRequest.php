<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
use Illuminate\Foundation\Http\FormRequest;

class MedicineRequest extends FormRequest
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
            'medicineCategoryID' =>  ['required',new IsValidMongoId('MedicineCategory')],
            'medicineCode' => 'required|string',
            'name' => 'required|string',
            'ingredients' => 'required|string',
            'unit' => 'required|string',
            'sideEffects' => 'required|string',
            'type' => 'required|string',
            'instruction' => 'required|string',
            'note' => 'required|string',
            'price' => 'required|numeric|min:0',
        ];
    }
    public function update(): array
    {
        return [
            'medicineCategoryID' =>  ['nullable',new IsValidMongoId('MedicineCategory')],
            'medicineCode' => 'nullable|string',
            'name' => 'nullable|string',
            'ingredients' => 'nullable|string',
            'unit' => 'nullable|string',
            'sideEffects' => 'nullable|string',
            'type' => 'nullable|string',
            'instruction' => 'nullable|string',
            'note' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
        ];
    }
}
