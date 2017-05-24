<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Log;

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

    /**
     * Display a listing of the resource.
     * @param  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $team_member_id)
    {
        $updates = $request->only('is_verified_by_admin');
        $member = User::find($team_member_id);

        $member->is_verified_by_admin = $updates['is_verified_by_admin'];
        if($member->save()) {
            return response()->json(['status' => 'ok', '_code' => 0]);
        }
        return response()->json(['status' => 'ok', '_code' =>1]);
    }
}
