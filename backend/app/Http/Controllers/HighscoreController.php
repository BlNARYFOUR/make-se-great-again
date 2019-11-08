<?php

namespace App\Http\Controllers;

use App\Highscore;
use App\Http\Requests\HighscoreCreateRequest;
use App\Http\Resources\HighscoreResource;
use http\Env\Response;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class HighscoreController extends Controller
{
    public function get()
    {
        $res =  Highscore::orderBy('score', 'DESC')->get();
        return HighscoreResource::collection($res);
    }

    public function post(HighscoreCreateRequest $request) {
        $name = $request->input('name');
        $score = $request->input('score');

        $highscore = new Highscore();

        $highscore->name = $name;
        $highscore->score = $score;

        try {
            $highscore->save();
        } catch (QueryException $exception) {
            return response()->json(['error' => 'Something went wrong. Please try again later.'], 406);
        }

        return \response()->json(['message' => 'New highscore added']);
    }
}
