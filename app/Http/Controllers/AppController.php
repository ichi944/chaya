<?php

namespace App\Http\Controllers;

class AppController extends Controller
{
    public function root()
    {
        return view('app.root');
    }
}
