<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Validator;

class UserController extends Controller
{
    public function profile()
    {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json(compact('user'));
    }

    public function updateMyAvatar(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();
        $filename = $request->file('image_data')->store('users/'.$user->id.'/avatar');
        $user->avatar_img_url = $filename;
        if($user->save()) {
            return response()->json([
                'status' => 'ok',
                '_code' => 0,
                'filename' => $user->avatar_img_url,
            ]);
        }
        return response()->json([
            'status' => 'ok',
            '_code' => 1,
        ]);
    }

    public function updateMe(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:32'
            ]);
        $user->name = $request->input('name');
        if ($validator->fails()) {
            return response()->json([
                'status' => 'ok',
                '_code' => 1,
            ]);
        }
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

    public function updateMyPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:8|max:32'
            ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'ok',
                '_code' => 1,
            ]);
        }

        $user = JWTAuth::parseToken()->authenticate();
        $user->password = bcrypt($request->input('password'));

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
