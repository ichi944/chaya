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

    public function updateMyAvator(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();
        $filename = $request->file('image_data')->store($user->id.'/avator');
        $user->avator_img_url = $filename;
        if($user->save()) {
            return response()->json([
                'status' => 'ok',
                '_code' => 0,
                'filename' => $user->avator_img_url,
            ]);
        }
        return response()->json([
            'status' => 'ok',
            '_code' => 1,
        ]);
    }

    public function updateMe(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();
        $user->name = $request->input('name');
        if($user->save()) {
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
