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
            'specialtyID' => 'required|exists:Specialty,_id',
            'name' => 'required|string',
            'image' => 'required|string',
            'shortDescription' => 'required|string',
            'detail' => 'required|string',
            'services' => 'required|array',
            'services.*.serviceID' => 'required|array',
            'services.*.serviceID.*' => 'required|exists:Service,_id',
            'services.*.levelName' => 'required|string',
            'services.*.price' => 'required|numeric',
            'services.*.discountPrice' => 'nullable|numeric',
            'services.*.duration' => 'required|numeric',
        ];
    }
    public function messages()
    {
        return [
            'specialtyID.required' => 'Specialty ID is required',
            'specialtyID.exists' => 'Specialty ID must exist in the Specialty collection',
            'name.required' => 'Name is required',
            'name.string' => 'Name must be a string',
            'image.required' => 'Image is required',
            'image.string' => 'Image must be a string',
            'shortDescription.required' => 'Short description is required',
            'shortDescription.string' => 'Short description must be a string',
            'detail.required' => 'Detail is required',
            'detail.string' => 'Detail must be a string',
            'services.required' => 'Services are required',
            'services.array' => 'Services must be an array',
            'services.*.serviceID.required' => 'Service ID is required for each service',
            'services.*.serviceID.exists' => 'Each Service ID must exist in the Service collection',
            'services.*.levelName.required' => 'Level name is required for each service',
            'services.*.levelName.string' => 'Level name must be a string',
            'services.*.price.required' => 'Price is required for each service',
            'services.*.price.numeric' => 'Price must be a number',
            'services.*.discountPrice.numeric' => 'Discount price must be a number',
            'services.*.duration.required' => 'duration is required for each service',
            'services.*.duration.numeric' => 'duration must be a number',
        ];
    }
}