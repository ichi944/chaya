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

    public function updateMe(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();
        $user->name = $request->input('name');
        $filename = $request->file('image_data')->store($user->id.'/avator');
        if($user->save()) {
            return response()->json([
                'status' => 'ok',
                '_code' => 0,
                'filename' => $filename,
            ]);
        }
        return response()->json([
            'status' => 'ok',
            '_code' => 1,
        ]);
    }
}
