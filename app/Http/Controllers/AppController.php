<?php

namespace App\Http\Controllers;

use App\Events\Hello;

class AppController extends Controller
{
    public function root()
    {
        return view('app.root');
    }

    public function sayHello()
    {
        event(new Hello());
        return response()->json(['_code' => 0]);
    }
}
