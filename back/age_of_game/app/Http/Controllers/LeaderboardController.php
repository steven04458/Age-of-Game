<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class LeaderboardController
{
    public function getLeaderboard(){
        $leaderBoard = User::orderBy('score', 'desc')->take(10)->select('name', 'score')->get();
        return response()->json([$leaderBoard], 200);
    }
}
