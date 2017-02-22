<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
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
        $this->middleware('guest', ['except' => 'logout']);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        Log::Info('authenticate start');
        Log::Info($credentials['email']);
        try {
            if(! $token = JWTAuth::attempt($credentials)) {
                Log::Info('invalid token1');
                return response()->json(['error' => 'invalid_credentials']);
            }
        } catch (JWTException $e) {
            Log::Info('invalid token 2');
            return response()->json(['error' => 'could_not_create_token']);
        }
        Log::Info('all ok');
        Log::Info($token);

        return response()->json(compact('token'));
    }

    public function hello(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json(compact('user'));
    }
}
