<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\Hello;

class AppController extends Controller
{
    public function root()
    {
        return view('app.root');
    }

    public function sayHello(Request $request)
    {
        $current_user = \Auth::user();
        event(new Hello($current_user, $request->text));
        return response()->json(['_code' => 0]);
    }
}
