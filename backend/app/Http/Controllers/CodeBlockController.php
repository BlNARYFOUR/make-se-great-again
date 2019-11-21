<?php

namespace App\Http\Controllers;

use App\Http\Resources\CodeBlockResource;
use App\Models\CodeBlock;
use Illuminate\Http\Request;

class CodeBlockController extends Controller
{
    function get() {
        $res = CodeBlock::all();
        return CodeBlockResource::collection($res);
    }
}
