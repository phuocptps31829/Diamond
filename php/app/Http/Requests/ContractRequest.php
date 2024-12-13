<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use MongoDB\BSON\ObjectId;

class ContractRequest extends FormRequest
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
     */    public function rules(): array
    {
        $this->doctorID=new ObjectId($this->doctorID);
        return [
            'doctorID' => 'required|string',
            'hospitalID' => 'nullable|string',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'time' => 'required|date',
            "title"=>"required|string",
            "address"=>"required|string",
            "price"=>"required|numeric",
            "isInternal"=>"required|boolean",
            "file"=>"required|file|mimes:jpg,jpeg,png,gif,bmp,tiff|max:2048",
            "startTime"=>"nullable|string",
            "endTime"=>"nullable|string",
            "countDate"=>"required|numeric",
            "timeWork"=>"nullable|integer",
        ];
    }

    public function rules2(): array
    {
        return [
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'time' => 'required|date',
            "title"=>"required|string",
            "address"=>"required|string",
            "price"=>"required|numeric",
            "file"=>"required|file|mimes:jpg,jpeg,png,gif,bmp,tiff|max:2048",
            "agent"=>"required|string",
            "position"=>"required|string",
            "tin"=>"required|string",
            "accountName"=>"required|string",
            "accountNumber"=>"required|string",
            "bankName"=>"required|string",
            "phone"=>"required|string"
        ];
    }
}
