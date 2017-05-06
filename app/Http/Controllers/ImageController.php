<?php

namespace App\Http\Controllers;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use File;
use Response;

class ImageController extends Controller
{
    public function privateImage(Request $request, $filename) {
        Log::Info($filename);
        $user = JWTAuth::parseToken()->authenticate();

        $path = storage_path('app/'.$user->id.'/avator/'.$filename);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }
}
