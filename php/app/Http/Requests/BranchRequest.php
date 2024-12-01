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
    public function update(): array
    {
        return [
            'name' => 'nullable|string',
            'workingTime' => 'nullable|string',
            'imagesURL' => 'nullable|array',
            'address' => 'nullable|string',
            'hotline' => 'nullable|string',
            'coordinates.lng' => 'nullable|numeric',
            'coordinates.lat' => 'nullable|numeric',
        ];
    }
}
