<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckQueryParams
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $page = $request->query('page', 1);
        $limit = $request->query('limit', 10);
        $sort = $request->query('sort', null);

        $page = is_array($page) ? (int)$page[0] : (int)$page;
        $limit = is_array($limit) ? (int)$limit[0] : (int)$limit;

        if ($page <= 0) {
            $page = 1;
        }

        if ($limit <= 0) {
            $limit = 10;
        }

        $limitDocuments = $limit;
        $skip = ($page - 1) * $limitDocuments;

        $sortOptions = [];
        if ($sort) {
            $sort = is_array($sort) ? $sort[0] : $sort;
            if (strpos($sort, '-') === 0) {
                $sortOptions[substr($sort, 1)] = 'desc';
            } else {
                $sortOptions[$sort] = 'asc';
            }
        } else {
            $sortOptions = ['_id' => 'desc'];
        }

        $request->merge([
            'limitDocuments' => $limitDocuments,
            'page' => $page,
            'skip' => $skip,
            'sortOptions' => $sortOptions,
        ]);

        return $next($request);
    }
}
