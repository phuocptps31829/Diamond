<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\IsValidMongoId;

class ServiceRequest extends FormRequest
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
            'specialtyID' => ['required',  new IsValidMongoId('Specialty') ],
            'name' => 'required|string',
            'slug' => 'required|string',
            'image' => 'required|string',
            'price' => 'required|numeric|min:0',
            'shortDescription' => 'required|string',
            'details' => 'required|string',
            'discountPrice' => 'nullable|numeric|min:0',
            'duration' => 'required|numeric',
            'isHidden' => 'required|boolean',
            'applicableObject.gender' => 'required|string|in:Nam,Nữ,0',
            'applicableObject.age.min' => 'required|numeric|min:0|max:200',
            'applicableObject.age.max' => 'required|numeric|min:0|max:200',
            'applicableObject.isFamily' => 'required|boolean',
        ];
    }
    public function update(): array
    {
        return [
            'specialtyID' => ['nullable',  new IsValidMongoId('Specialty') ],
            'name' => 'nullable|string',
            'slug' => 'nullable|string',
            'image' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'shortDescription' => 'nullable|string',
            'details' => 'nullable|string',
            'discountPrice' => 'nullable|numeric|min:0',
            'duration' => 'nullable|numeric',
            'isHidden' => 'nullable|boolean',
            'applicableObject.gender' => 'nullable|string|in:Nam,Nữ,0',
            'applicableObject.age.min' => 'nullable|numeric|min:0|max:200',
            'applicableObject.age.max' => 'nullable|numeric|min:0|max:200',
            'applicableObject.isFamily' => 'nullable|boolean',
        ];
    }
}
