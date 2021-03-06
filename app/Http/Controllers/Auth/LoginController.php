<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/app/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // do nothing
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        Log::Info('authenticate start');
        Log::Info($credentials['email']);
        try {
            if(! $token = auth()->attempt([
                    'email' => $credentials['email'],
                    'password' => $credentials['password'],
                    'is_verified_with_email' => true,
                    'is_verified_by_admin' => true,
                    'is_locked' => false,
                ])) {
                Log::Info('invalid token1');
                return response()->json([
                    '_code' => 1,
                    'error' => 'invalid_credentials',
                ]);
            }
        } catch (JWTException $e) {
            Log::Info('invalid token 2');
            return response()->json([
                '_code' => 1,
                'error' => 'could_not_create_token',
            ]);
        }
        Log::Info('all ok');
        Log::Info($token);

        return response()->json([
            '_code' => 0,
            'token' => $token,
        ]);
    }

    public function signout() {
        return response()->json([
            '_code' => 0,
            'status' => 'ok',
        ]);
    }

    public function hello(Request $request) {
        try {
            if (! $user = auth()->user()) {
                return response()->json(['user_not_found'], 401);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        // TODO: return token valid or not insted of the user.
        return response()->json(['status' => true]);
    }
}
