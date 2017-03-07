<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function profile(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json(compact('user'));
    }
}
