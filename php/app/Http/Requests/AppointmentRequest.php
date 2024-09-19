<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
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
            'patientID' => [
                'required',

            ],
            'data.*.workScheduleID' => [
                'required',

            ],
            'data.*.serviceID' => [
                'required',

            ],
            'data.*.medicalPackageID' => [
                'nullable',

            ],
            'data.*.patientHelpID' => [
                'nullable',
            ],
            'data.*.type' => 'required|string',
            'data.*.time' => 'required|date_format:Y-m-d\TH:i:s',
            'data.*.price' => 'required|numeric',
            'data.*.status' => 'required|string|in:Đã xác nhận,Đã hủy,Chờ xác nhận,Đã khám',
        ];
    }
    public function messages()
    {
        return [
            'patientID.required' => 'Patient ID is required.',
            'data.*.workScheduleID.required' => 'Work Schedule ID is required.',
            'data.*.serviceID.required' => 'Service ID is required.',
            'data.*.medicalPackageID.exists' => 'Invalid Medical Package ID.',
            'data.*.patientHelpID.exists' => 'Invalid Patient Help ID.',
            'data.*.type.required' => 'Appointment type is required.',
            'data.*.type.string' => 'Appointment type should be a string.',
            'data.*.time.required' => 'Appointment time is required.',
            'data.*.time.date_format' => 'Invalid appointment time format.',
            'data.*.price.required' => 'Price is required.',
            'data.*.price.numeric' => 'Price should be a number.',
            'data.*.status.required' => 'Status is required.',
            'data.*.status.string' => 'Status should be a string.',
            'data.*.status.in' => 'Status is not valid.',
        ];
    }
}
