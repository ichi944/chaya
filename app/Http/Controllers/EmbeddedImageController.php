<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use File;
use App\Constants\ResponseCode;

class EmbeddedImageController extends Controller
{
    public function store(Request $request)
    {

        $channel_id = $request->channel_id;
        // url for storing phisicaly
        $path = $request->file('image')->store('embedded_images/'.$channel_id.'/');

        // url for frontend(api)
        $embedded_image_base_url = '/resources/images';
        $url = $embedded_image_base_url.'/'.$channel_id.'/'.basename($path);

        return response()->json([
            '_code' => ResponseCode::SUCCESS,
            'url' => $url,
        ]);
    }

    public function image($channel_id, $filename)
    {
        $path = storage_path('app/embedded_images/'.$channel_id.'/'.$filename);
        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = response($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }
}
