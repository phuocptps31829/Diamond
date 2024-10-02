<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MedicalPackageRequest extends FormRequest
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
            'specialtyID' => 'required',
            'name' => 'required|string',
            'image' => 'required|string',
            'shortDescription' => 'required|string',
            'details' => 'required|string',
            'service' => 'required',
            'service.*.serviceID' => 'required',
            'service.*.levelName' => 'required|string',
            'service.*.price' => 'required|numeric',
            'service.*.discountPrice' => 'nullable|numeric',
            'service.*.duration' => 'required|numeric',
            'slug' => 'required|string',
        ];
    }
    public function messages()
    {
        return [
            'slug.string' => 'Slug should be a string',
            'slug.required' => 'Slug is required',
            'specialtyID.required' => 'Specialty ID is required',
            'specialtyID.exists' => 'Specialty ID must exist in the Specialty collection',
            'name.required' => 'Name is required',
            'name.string' => 'Name must be a string',
            'image.required' => 'Image is required',
            'image.string' => 'Image must be a string',
            'shortDescription.required' => 'Short description is required',
            'shortDescription.string' => 'Short description must be a string',
            'details.required' => 'Detail is required',
            'details.string' => 'Detail must be a string',
            'service.required' => 'Service are required',
            'service.array' => 'Service must be an array',
            'service.*.serviceID.required' => 'Service ID is required for each service',
            'service.*.serviceID.exists' => 'Each Service ID must exist in the Service collection',
            'service.*.levelName.required' => 'Level name is required for each service',
            'service.*.levelName.string' => 'Level name must be a string',
            'service.*.price.required' => 'Price is required for each service',
            'service.*.price.numeric' => 'Price must be a number',
            'service.*.discountPrice.numeric' => 'Discount price must be a number',
            'service.*.duration.required' => 'duration is required for each service',
            'service.*.duration.numeric' => 'duration must be a number',
        ];
    }
}
