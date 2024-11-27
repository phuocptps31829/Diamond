<?php

namespace App\Exceptions;
use Exception;
class DataExistsException extends Exception
{
    protected $message;
    protected $code;
    public function __construct($message = 'Error', $code = 400)
    {
        parent::__construct($message, $code);
    }
}
