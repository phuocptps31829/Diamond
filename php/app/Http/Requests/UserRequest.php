<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        $userId = $this->route('user') ?? 'null';
        return [
            'fullName' => 'required|string',
            'phoneNumber' => [
                'required',
                'string',
                Rule::unique('users', 'phoneNumber')->ignore($userId), // Bỏ qua user hiện tại
            ],
            'email' => [
                'nullable',
                'email',
                Rule::unique('users', 'email')->ignore($userId), // Bỏ qua user hiện tại
            ],
            'dateOfBirth' => 'nullable|date_format:Y-m-d',
            'address' => ['nullable', 'array', 'min:1'],
            'address.province' => 'required_with:address|string',
            'address.district' => 'required_with:address|string',
            'address.ward' => 'required_with:address|string',
            'address.street' => 'required_with:address|string',
            'gender' => 'nullable|string',
            'password' => 'required|string|min:6',
            'avatar' => 'nullable|string',
            'isActivated' => 'required|boolean',
            'citizenIdentificationNumber' => 'nullable|numeric',
        ];
    }
    public function messages()
    {
        return [
            'fullName.required' => 'Full name is required',
            'fullName.string' => 'Full name should be a string',
            'phoneNumber.string' => 'Phone number should be a string',
            'email.string' => 'Email should be a string',
            'email.email' => 'Email should be a valid email address',
            'dateOfBirth.date_format' => 'Invalid date of birth format, should be YYYY-MM-DD',
            'address.array' => 'Address should be an object',
            'address.province.required_with' => 'Province is required if address is provided',
            'address.district.required_with' => 'District is required if address is provided',
            'address.ward.required_with' => 'Ward is required if address is provided',
            'address.street.required_with' => 'Street is required if address is provided',
            'password.required' => 'Password is required',
            'password.min' => 'Password should be at least 6 characters long',
            'avatar.string' => 'Avatar should be a string',
            'citizenIdentificationNumber.numeric' => 'Citizen identification number should be a number',
        ];
    }
}