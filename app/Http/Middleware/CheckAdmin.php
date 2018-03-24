<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

class CheckAdmin
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
        try {
            $user = auth()->userOrFail();

            if (!$user->is_admin) {
                return response()->json(['_code' => 1, 'message' => 'this action is not permitted']);
            }
            return $next($request);

        } catch (UserNotDefinedException $e) {
            return response()->json(['status' => 'ng', 'message' => 'user not defined']);
        }
    }
}
