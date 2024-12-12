<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    public function prepareForValidation()
    {
        foreach ($this->all() as $key => $value) {
            if (preg_match('/ID$/', $key) && preg_match('/^[a-f\d]{24}$/i', $value)) {
                $this->merge([
                    $key => new ObjectId($value)
                ]);
            } elseif (preg_match('/ID$/', $key) && !preg_match('/^[a-f\d]{24}$/i', $value)) {
                throw ValidationException::withMessages([
                    $key => ['ID không hợp lệ.']
                ]);
            }
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fullName' => 'required|string',
            'roleID' => 'required|string',
            'phoneNumber' => [
                'required',
                'regex:/^[0-9]{10}$/',
            ],
            'email' => [
                'nullable',
                'email',
            ],
            'dateOfBirth' => 'nullable|date_format:Y-m-d',
            'address' => 'nullable|string',
            'gender' => 'nullable|string',
            'password' => 'required|string|min:6',
            'avatar' => 'nullable|string',
            'isActivated' => 'required|boolean',
            'citizenIdentificationNumber' => 'nullable|numeric',
        ];
    }
    public function update(): array
    {
        return [
            'fullName' => 'nullable|string',
            'roleID' => 'nullable|string',
            'phoneNumber' => [
                'nullable',
                'regex:/^[0-9]{10}$/',
            ],
            'email' => [
                'nullable',
                'email',
            ],
            'dateOfBirth' => 'nullable|date_format:Y-m-d',
            'address' => 'nullable|string',
            'gender' => 'nullable|string',
            'password' => 'nullable|string|min:6',
            'avatar' => 'nullable|string',
            'isActivated' => 'nullable|boolean',
            'citizenIdentificationNumber' => 'nullable|numeric',
        ];
    }
}
