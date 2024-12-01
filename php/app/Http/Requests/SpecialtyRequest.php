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
            'image' => 'required|string',
            'name' => 'required|string',
            "isHidden" => "nullable|boolean",
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
