<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResultRequest extends FormRequest
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
            'score' => 'required|numeric',
            'subject' => 'required|string|trim',
            'studentID' => [
                'required'
            ],
        ];
    }
    public function messages()
    {
        return [
            'score.required' => 'Score is required',
            'score.numeric' => 'Score should be a number',
            'subject.required' => 'Subject is required',
            'subject.string' => 'Subject should be a string',
            'studentID.required' => 'Student ID is required',
        ];
    }
}
