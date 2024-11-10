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
            'services.*' => 'required|array',
            'services.*.servicesID' => 'required|array',
            'services.*.servicesID.*' => 'required|string',
            'services.*.levelName' => 'required|string',
            'services.*.price' => 'required|numeric',
            'services.*.discountPrice' => 'nullable|numeric',
            'services.*._id'=>"nullable|string",
            'services.*.duration' => 'required|numeric',
            'slug' => 'nullable|string',
            'isHidden' => 'required|boolean',

            'applicableObject.gender' => 'required|string',
            'applicableObject.age.min' => 'required|numeric',
            'applicableObject.age.max' => 'required|numeric',
            'applicableObject.isFamily' => 'required|boolean',

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
            'services.required' => 'Services are required',
            'services.array' => 'Services must be an array',
            'services.*.servicesID.required' => 'Services ID is required for each services',
            'services.*.servicesID.exists' => 'Each Services ID must exist in the Services collection',
            'services.*.levelName.required' => 'Level name is required for each services',
            'services.*.levelName.string' => 'Level name must be a string',
            'services.*.price.required' => 'Price is required for each services',
            'services.*.price.numeric' => 'Price must be a number',
            'services.*.discountPrice.numeric' => 'Discount price must be a number',
            'services.*.duration.required' => 'duration is required for each services',
            'services.*.duration.numeric' => 'duration must be a number',
        ];
    }
}
