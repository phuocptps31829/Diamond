<?php

use Illuminate\Support\Facades\DB;

if (!function_exists('searchInTable')) {
    function searchInTable($table, $keyword)
    {
        $columns = DB::getSchemaBuilder()->getColumnListing($table);
        $query = DB::table($table);
        foreach ($columns as $column) {
            $query->orWhere($column, 'LIKE', '%' . $keyword . '%');
        }
        return $query->get();
    };
    function isValidMongoId($id)
    {
        return preg_match('/^[0-9a-fA-F]{24}$/', $id);
    }
    function createError($code, $message)
    {
        return response()->json([
            'status' => 'fail',
            'message' => $message,
            'data' => null,
        ], $code);
    }
}