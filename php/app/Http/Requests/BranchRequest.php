<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BranchRequest extends FormRequest
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
            'name' => 'required|string',
            'workingTime' => 'required|string',
            'imagesURL' => 'nullable|array',
            'address' => 'required|string',
            'hotline' => 'required|string',
            'coordinates.lng' => 'required|numeric',
            'coordinates.lat' => 'required|numeric',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'name.string' => 'Name should be a string',
            'workingTime.required' => 'Working time is required',
            'workingTime.string' => 'Working time should be a string',
            'imagesURL.array' => 'ImagesURL should be an array',
            'address.required' => 'Address is required',
            'address.string' => 'Address should be a string',
            'hotline.required' => 'Hotline is required',
            'hotline.string' => 'Hotline should be a string',
            'coordinates.lng.required' => 'Lng is required',
            'coordinates.lng.numeric' => 'Lng should be a number',
            'coordinates.lat.required' => 'Lat is required',
            'coordinates.lat.numeric' => 'Lat should be a number',
        ];
    }
}
