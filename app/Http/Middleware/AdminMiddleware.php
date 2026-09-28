<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | ONLY rashmita@gmail.com IS ADMIN
        |--------------------------------------------------------------------------
        */

        if (
            ! $user ||
            $user->role !== 'admin' ||
            $user->email !== 'rashmita@gmail.com'
        ) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}