<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\UserVerificationToken;
use App\Services\TokenGeneraterService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Log;


class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ]);
    }

    /**
     * Handle a registration request for the application.
     *
     * @author ichi <ichi944g@gmail.com>
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        $user = $this->create($request->all());
        event(new Registered($user));
        if($user) {
            return response()->json([
                'status' => 'ok',
                '_code' => 0
            ]);
        }
        return response()->json([
            'status' => 'ok',
            '_code' => 1,
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    /**
     * Handle a user verification request.
     *
     * @author ichi <ichi944g@gmail.com>
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function verification(Request $request, $token)
    {
        Log::Info('in verification url, token is: '.$token);
        $existed = UserVerificationToken::where('token', '=', $token)->first();
        if ($existed) {
            $user = $existed->user()->first();
            $user->is_verified = true;
            $user->save();

            $tokenRow = $user->userVerificationToken()->first();
            $tokenRow->delete();

            return response()->json([
                'status' => 'ok',
                '_code' => 0,
            ]);
        }
        return response()->json([
            'status' => 'ok',
            '_code' => 1,
        ]);
    }

}
