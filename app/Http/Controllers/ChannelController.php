<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel;

class ChannelController extends Controller
{
    private $channel;

    public function __construct(Channel $channel)
    {
        $this->channel = $channel;
    }


    public function index()
    {
        $channels = $this->channel->all();
        return response()->json($channels);
    }
}
