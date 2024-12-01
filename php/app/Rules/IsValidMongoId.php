<?php


namespace App\Rules;
use MongoDB\BSON\ObjectId;
use Illuminate\Contracts\Validation\Rule;

class IsValidMongoId implements Rule
{
    protected $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function passes($attribute, $value)
    {
        // Kiểm tra nếu giá trị là ObjectId hợp lệ
        if (!preg_match('/^[a-f\d]{24}$/i', $value)) {
            return false;
        }

        $objectId = new ObjectId($value);

        // Kiểm tra sự tồn tại trong collection MongoDB
            $modelClass = "App\\Models\\" . $this->model;
            return   $modelClass::where('_id', $objectId)
            ->exists();
    }

    public function message()
    {
        return ':attribute Không hợp lệ!';
    }
}
