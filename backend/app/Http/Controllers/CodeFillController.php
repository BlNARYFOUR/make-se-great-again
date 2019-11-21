<?php

namespace App\Http\Controllers;

use App\Http\Resources\CodeFillResource;
use App\Models\CodeFill;
use Illuminate\Http\Request;

class CodeFillController extends Controller
{
    function get() {
        $res = CodeFill::all();
        return CodeFillResource::collection($res);
    }
}
