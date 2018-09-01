<?php

namespace App\Http\Controllers;

use Log;
use File;
use Response;

class ImageController extends Controller
{
    public function privateImage($user_id, $filename)
    {
        Log::Info($filename);

        $path = storage_path('app/'.$user_id.'/avatar/'.$filename);
        Log::Info('path is: ');
        Log::Info($path);
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
