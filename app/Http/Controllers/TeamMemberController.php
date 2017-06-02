<?php

namespace App\Http\Controllers;

use App\User;

class TeamMemberController extends Controller
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     * @internal param $request
     */
    public function index()
    {
        $members = $this->user->all();
        return response()->json($members);
    }

    /**
     * Display a listing of the resource.
     * @param $team_member_id
     * @return \Illuminate\Http\Response
     * @internal param $request
     */
    public function verify($team_member_id)
    {
        $member = $this->user->find($team_member_id);
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
     * @param $team_member_id
     * @return \Illuminate\Http\Response
     * @internal param $request
     */
    public function lock($team_member_id)
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
     * @param $team_member_id
     * @return \Illuminate\Http\Response
     * @internal param $request
     */
    public function unlock($team_member_id)
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
