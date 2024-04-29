<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
     /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request)
            // ->header('Access-Control-Allow-Origin', '*');
            ->header('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://127.0.0.1:8000");

    }
}
