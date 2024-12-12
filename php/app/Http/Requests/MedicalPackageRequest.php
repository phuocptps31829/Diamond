<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
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
            'specialtyID' =>  ['required',new IsValidMongoId('Specialty')],
            'name' => 'required|string',
            'image' => 'required|string',
            'shortDescription' => 'required|string',
            'details' => 'required|string',
            'services.*' => 'required|array',
            'services.*.servicesID' => 'required|array',
            'services.*.servicesID.*' => ['required',new IsValidMongoId('Service')],
            'services.*.levelName' => 'required|string',
            'services.*.price' => 'required|numeric|min:0',
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
    public function update(): array
    {
        return [
            'specialtyID' =>  ['nullable',new IsValidMongoId('Specialty')],
            'name' => 'nullable|string',
            'image' => 'nullable|string',
            'shortDescription' => 'nullable|string',
            'details' => 'nullable|string',
            'services.*' => 'nullable|array',
            'services.*.servicesID' => 'nullable|array',
            'services.*.servicesID.*' => ['nullable',new IsValidMongoId('Service')],
            'services.*.levelName' => 'nullable|string',
            'services.*.price' => 'nullable|nullable|min:0',
            'services.*.discountPrice' => 'nullable|numeric',
            'services.*._id'=>"nullable|string",
            'services.*.duration' => 'nullable|numeric',
            'slug' => 'nullable|string',
            'isHidden' => 'nullable|boolean',

            'applicableObject.gender' => 'nullable|string',
            'applicableObject.age.min' => 'nullable|numeric',
            'applicableObject.age.max' => 'nullable|numeric',
            'applicableObject.isFamily' => 'nullable|boolean',
        ];
    }

}
