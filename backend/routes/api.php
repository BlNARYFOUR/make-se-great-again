<?php

use App\Http\Controllers\CodeBlockController;
use App\Http\Controllers\CodeFillController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\FileController;
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
Route::get('/games/{name}', [GameController::class, 'getByName'])->name('games.getbyname');

Route::get('/connections', [ConnectionController::class, 'get'])->name('connections.get');
Route::post('/connections/{id}/update', [ConnectionController::class, 'update'])->name('connections.update');

Route::get('/codeBlocks', [CodeBlockController::class, 'get'])->name('codeblocks.get');
Route::get('/codeBlocks/{gameId}', [CodeBlockController::class, 'getByGameId'])->name('codeblocks.getbygameid');


Route::get('/codeFills', [CodeFillController::class, 'get'])->name('codefill.get');
Route::get('/codeFills/{gameId}', [CodeFillController::class, 'getByGameId'])->name('codefill.getbygameid');

Route::get('/files/{gameId}', [FileController::class, 'getByGameId'])->name('file.getbygameid');
