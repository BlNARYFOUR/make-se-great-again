<?php

use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\HighscoreController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/highscores', [HighscoreController::class, 'get'])->name('highscores.get');
Route::post('/highscores', [HighscoreController::class, 'post'])->name('highscores.post');

Route::get('/games', [GameController::class, 'get'])->name('games.get');

Route::get('/connections', [ConnectionController::class, 'get'])->name('connections.get');