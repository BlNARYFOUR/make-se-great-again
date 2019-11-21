<?php

namespace App\Http\Controllers;

use App\Http\Resources\FileResource;
use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    function get() {
        $res = File::all();
        return FileResource::collection($res);
    }
}
