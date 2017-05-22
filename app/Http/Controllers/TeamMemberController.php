<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class TeamMemberController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    /**
     * Display a listing of the resource.
     * @param  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $members = $this->user->all();
        return response()->json($members);
    }
}
