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
    public function verify(Request $request, $team_member_id)
    {
        $member = User::find($team_member_id);
        if(!$member->is_verified_with_email) {
            return response()->json(['status' => 'ok', '_code' =>1]);
        }
        $member->is_verified_by_admin = true;
        if($member->save()) {
            return response()->json(['status' => 'ok', '_code' => 0]);
        }
        return response()->json(['status' => 'ok', '_code' =>1]);
    }

    /**
     * Display a listing of the resource.
     * @param  $request
     * @return \Illuminate\Http\Response
     */
    public function lock(Request $request, $team_member_id)
    {
        $member = User::find($team_member_id);
        if(!($member->is_verified_with_email && $member->is_verified_by_admin)) {
            return response()->json(['status' => 'ok', '_code' =>1]);
        }
        $member->is_locked = true;
        if($member->save()) {
            return response()->json(['status' => 'ok', '_code' => 0]);
        }
        return response()->json(['status' => 'ok', '_code' =>1]);
    }

    /**
     * Display a listing of the resource.
     * @param  $request
     * @return \Illuminate\Http\Response
     */
    public function unlock(Request $request, $team_member_id)
    {
        $member = User::find($team_member_id);
        if(!($member->is_verified_with_email && $member->is_verified_by_admin)) {
            return response()->json(['status' => 'ok', '_code' =>1]);
        }
        $member->is_locked = false;
        if($member->save()) {
            return response()->json(['status' => 'ok', '_code' => 0]);
        }
        return response()->json(['status' => 'ok', '_code' =>1]);
    }
}
