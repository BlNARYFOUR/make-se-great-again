<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConnectionResource;
use App\Models\Connection;
use App\SocketModels\Env;
use Illuminate\Http\Request;

class ConnectionController extends Controller
{
    public function get()
    {
        $res = Connection::all();
        return ConnectionResource::collection($res);
    }
}
