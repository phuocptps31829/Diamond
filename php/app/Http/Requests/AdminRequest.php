<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminRequest extends FormRequest
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
            'level' => ['required', 'in:ADMIN,DOCTOR'],
        ];
    }
    public function messages()
    {

        return [
            'level.required' => 'Level is required',
            'level.in' => 'Level should be either ADMIN or DOCTOR',
        ];
    }
}
