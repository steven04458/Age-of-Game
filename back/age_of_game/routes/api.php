<?php
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\controllers\leaderboardController;

Route::post('/login',[UserController::class, 'login']);

Route::get('/leaderboard', [LeaderboardController::class, 'getLeaderboard'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});