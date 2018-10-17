<?php

namespace App\Http\Controllers;

use Log;
use File;
use Response;

class ImageController extends Controller
{
    public function privateImage($user_id, $filename)
    {
        $path = storage_path('app/users/'.$user_id.'/avatar/'.$filename);
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
