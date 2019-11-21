<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameResource;
use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function get() {

    }

    public function getByName($name) {
        $res = Game::where('name', '=', $name)->first();
        return new GameResource($res);
    }
}
