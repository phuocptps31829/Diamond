<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsRequest extends FormRequest
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
            'specialtyID' => 'required|exists:Specialty,_id',
            'title' => 'required|string',
            'image' => 'required|string',
            'slug' => 'required|string',
            'content' => 'required|string',
            'author' => 'required|string',
            'isHidden' => 'required|boolean',
        ];
    }
    public function messages()
    {
        return [
            'specialtyID.exists' => 'The Specialty ID is invalid.',
            'title.required' => 'Title is required',
            'title.string' => 'Title should be a string',
            'image.required' => 'Image is required',
            'image.string' => 'Image should be a string',
            'content.required' => 'Content is required',
            'content.string' => 'Content should be a string',
            'author.required' => 'Author is required',
            'author.string' => 'Author should be a string',
            'isHidden.required' => 'isHidden is required',
            'isHidden.boolean' => 'isHidden should be a boolean'
        ];
    }
}
