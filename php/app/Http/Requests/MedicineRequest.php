<?php

namespace App\Http\Requests;

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
            'medicineCategoryID' => [
                'required',
                'exists:MedicineCategory,_id',
            ],
            'medicineCode' => 'required|string',
            'name' => 'required|string',
            'ingredients' => 'required|string',
            'unit' => 'required|string',
            'sideEffects' => 'required|string',
            'type' => 'required|string',
            'instruction' => 'required|string',
            'note' => 'required|string',
            'price' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'medicineCategoryID.required' => 'Medicine category ID is required.',
            'medicineCategoryID.exists' => 'The Medicine category ID is invalid',
            'medicineCode.required' => 'Medicine code is required.',
            'medicineCode.string' => 'Medicine code should be a string.',
            'name.required' => 'Name is required.',
            'name.string' => 'Name should be a string.',
            'ingredients.required' => 'Ingredients are required.',
            'ingredients.string' => 'Ingredients should be a string.',
            'unit.required' => 'Unit is required.',
            'unit.string' => 'Unit should be a string.',
            'sideEffects.required' => 'Side effects are required.',
            'sideEffects.string' => 'Side effects should be a string.',
            'type.required' => 'Type is required.',
            'type.string' => 'Type should be a string.',
            'instruction.required' => 'Instruction is required.',
            'instruction.string' => 'Instruction should be a string.',
            'note.required' => 'Note is required.',
            'note.string' => 'Note should be a string.',
            'price.required' => 'Price is required.',
            'price.numeric' => 'Price should be a number.',
        ];
    }
}