<?php

namespace App\Http\Controllers;

use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    function getByGameId($gameId) {
        $res = File::where('game_id', '=', $gameId)->get();
        return FileResource::collection($res);
    }
}
