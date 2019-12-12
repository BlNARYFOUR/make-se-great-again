<?php

namespace App\Http\Controllers;

use App\Http\Resources\CodeFillResource;
use App\Models\CodeFill;
use Illuminate\Support\Facades\DB;

class CodeFillController extends Controller
{
    function get() {
        $res = CodeFill::all();
        return CodeFillResource::collection($res);
    }

    function getByGameId($gameId) {
        $res = DB::table('code_fills')
            ->join('code_blocks', 'code_fills.code_block_id' , '=', 'code_blocks.id')
            ->join('files', 'files.id', '=', 'code_blocks.file_id')
            ->where('files.game_id', '=', $gameId)
            ->select('code_fills.*')
            ->get();

        return CodeFillResource::collection($res);
    }
}
