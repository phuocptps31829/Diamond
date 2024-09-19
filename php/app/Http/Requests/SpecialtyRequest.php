<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SpecialtyRequest extends FormRequest
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
            'image' => 'required',
            'description' => 'required',
            'name' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'image.required' => 'Image is required',
            'image.string' => 'Image should be a string',
            'description.required' => 'Description is required',
            'description.string' => 'Description should be a string',
            'name.required' => 'Name is required',
            'name.string' => 'Name should be a string'
        ];
    }
}