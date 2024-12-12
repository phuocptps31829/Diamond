<?php

namespace App\Http\Requests;

use App\Rules\IsValidMongoId;
use Illuminate\Foundation\Http\FormRequest;
use App\Rules\ValidDoctorID;

class WorkScheduleRequest extends FormRequest
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
            'doctorID' => ['required',new IsValidMongoId('User')],
            'day' => "required|string|regex:/^\d{4}-\d{2}-\d{2}$/",
            'clinicID' =>  ['required',new IsValidMongoId('Clinic')],
            'hour.startTime' => "required|string",
            'hour.endTime' => "required|string",
        ];
    }
    public function update(): array
    {
        return [
            'doctorID' => ['nullable',new IsValidMongoId('User')],
            'day' => "nullable|string|regex:/^\d{4}-\d{2}-\d{2}$/",
            'clinicID' => ['nullable',new IsValidMongoId('Clinic')],
            'hour' => 'nullable|array',
            'hour.startTime' => 'required_with:hour|string',
            'hour.endTime' => 'required_with:hour|string',
        ];
    }
}
