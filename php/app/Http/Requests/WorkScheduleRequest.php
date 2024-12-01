<?php

namespace App\Http\Requests;

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
            'doctorID' => "required|string",
            'day' => "required|string",
            'clinicID' => "required|string",
            'hour.startTime' => "required|string",
            'hour.endTime' => "required|string",
        ];
    }
    public function update(): array
    {
        return [
            'doctorID' => "nullable|string",
            'day' => "nullable|string",
            'clinicID' => "nullable|string",
            'hour' => "nullable",
            'hour.startTime' => "required_with:hour|string",
            'hour.endTime' => "nullable|string",
        ];
    }
    public function messages()
    {
        return [
            'doctorID.required' => 'Doctor ID is required',
            'doctorID.exists' => 'Doctor ID must exist in the doctor table',
            'day.date_format' => 'Invalid day time format',
            'clinicID.required' => 'Clinic ID is required',
            'clinicID.regex' => 'Invalid clinic ID',
            'hour.startTime.regex' => 'Invalid time format. The correct format is HH:mm.',
            'hour.endTime.regex' => 'Invalid time format. The correct format is HH:mm.',
        ];
    }
}
