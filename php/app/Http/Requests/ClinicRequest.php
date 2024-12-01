<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
use Illuminate\Foundation\Http\FormRequest;

class ClinicRequest extends FormRequest
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
            'branchID' =>  ['required',new IsValidMongoId('Branch')],
            'specialtyID' =>  ['required',new IsValidMongoId('Specialty')],
            'name' => 'required|string',
        ];
    }
    public function update(): array
    {
        return [
            'branchID' =>  ['nullable',new IsValidMongoId('Branch')],
            'specialtyID' =>  ['nullable',new IsValidMongoId('Specialty')],
            'name' => 'nullable|string',
        ];
    }
}
