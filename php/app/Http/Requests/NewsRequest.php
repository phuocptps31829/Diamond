<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
use Illuminate\Foundation\Http\FormRequest;

class NewsRequest extends FormRequest
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
            'specialtyID' => ['required',new IsValidMongoId('Specialty')],
            'title' => 'required|string',
            'image' => 'required|string',
            'slug' => 'required|string',
            'content' => 'required|string',
            'author' => 'required|string',
            'isHidden' => 'required|boolean',
        ];
    }
    public function update(): array
    {
        return [
            'specialtyID' => ['nullable',new IsValidMongoId('Specialty')],
            'title' => 'nullable|string',
            'image' => 'nullable|string',
            'slug' => 'nullable|string',
            'content' => 'nullable|string',
            'author' => 'nullable|string',
            'isHidden' => 'nullable|boolean',
        ];
    }
}
