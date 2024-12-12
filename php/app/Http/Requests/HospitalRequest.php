<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HospitalRequest extends FormRequest
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
            'name' => 'required|string',
            'image' => 'required|string',
            'address' => 'required|string',
            'hotline' => 'required|string',
        ];
    }
    public function update(): array
    {
        return [
            'name' => 'nullable|string',
            'image' => 'nullable|string',
            'address' => 'nullable|string',
            'hotline' => 'nullable|string',
        ];
    }
}
