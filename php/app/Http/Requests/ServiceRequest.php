<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'specialtyID' => 'required|exists:Specialty,_id',
            'name' => 'required|string',
            'slug' => 'required|string',
            'image' => 'required|string',
            'price' => 'required|numeric',
            'shortDescription' => 'required|string',
            'detail' => 'required|string',
            'discountPrice' => 'nullable|numeric',
            'duration' => 'required|numeric',
            'isHidden' => 'required|boolean',
        ];
    }
    public function messages()
    {
        return [
            'specialtyID.required' => 'Specialty ID is required',
            'specialtyID.exists' => 'The Specialty ID is invalid.',
            'name.required' => 'Name is required',
            'slug.string' => 'Slug should be a string',
            'slug.required' => 'Slug is required',
            'name.string' => 'Name should be a string',
            'image.required' => 'Image is required',
            'image.string' => 'Image should be a string',
            'price.required' => 'Price is required',
            'price.numeric' => 'Price should be a number',
            'shortDescription.required' => 'Short description is required',
            'shortDescription.string' => 'Short description should be a string',
            'detail.required' => 'Details are required',
            'detail.string' => 'Details should be a string',
            'discountPrice.numeric' => 'Discount Price should be a number',
            'isHidden.required' => 'isHidden is required',
            'isHidden.boolean' => 'isHidden should be a boolean',
            'duration.required' => 'duration is required',
            'duration.numeric' => 'duration should be a number',
        ];
    }
}
