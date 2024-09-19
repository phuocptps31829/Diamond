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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'doctorID' => ['required', 'exists:Doctor,_id'],
            'day' => ['nullable', 'date_format:Y-m-d'],
            'clinicID' => ['required', 'string', 'regex:/^[0-9a-fA-F]{24}$/'],
            'hour.startTime' => ['nullable', 'regex:/^([01]\d|2[0-3]):([0-5]\d)$/'],
            'hour.endTime' => ['nullable', 'regex:/^([01]\d|2[0-3]):([0-5]\d)$/'],
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
