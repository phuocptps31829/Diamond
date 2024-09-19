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
    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'name.string' => 'Name should be a string',
            'image.required' => 'Image is required',
            'image.string' => 'Image should be a string',
            'address.required' => 'Address is required',
            'address.string' => 'Address should be a string',
            'hotline.required' => 'Hotline is required',
            'hotline.string' => 'Hotline should be a string',
        ];
    }
}