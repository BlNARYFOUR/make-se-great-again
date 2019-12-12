<?php

namespace App\Http\Controllers;

use App\Http\Resources\CodeBlockResource;
use App\Models\CodeBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CodeBlockController extends Controller {
    function get() {
        $res = CodeBlock::all();

        return CodeBlockResource::collection( $res );
    }

    function getByGameId( $gameId ) {
        $res = DB::table('code_blocks')
                  ->join('files', 'files.id', '=', 'code_blocks.file_id')
                 ->where('files.game_id', '=', $gameId)
                 ->select('code_blocks.*')
                 ->get();

        return CodeBlockResource::collection($res);
    }
}
