<?php
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\controllers\leaderboardController;
use App\Http\controllers\LaunchParty;
use App\Http\controllers\EndParty;

Route::post('/register', [UserController::class, 'register']);

Route::post('/login',[UserController::class, 'login']);

Route::post('/end_party', [EndParty::class, 'endParty'])->middleware('auth:sanctum');

Route::get('/launch', [LaunchParty::class, 'launchParty'])->middleware('auth:sanctum');

Route::get('/leaderboard', [LeaderboardController::class, 'getLeaderboard'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['cors'])->group(function () {
    Route::post('/hogehoge', 'Controller@hogehoge');
});