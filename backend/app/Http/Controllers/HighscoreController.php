<?php

namespace App\Http\Controllers;

use App\Highscore;
use App\Http\Resources\HighscoreResource;
use Illuminate\Http\Request;

class HighscoreController extends Controller
{
    public function get()
    {
        $res =  Highscore::orderBy('score', 'DESC')->get();
        return HighscoreResource::collection($res);
    }
}
