<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConnectionResource;
use App\Models\Connection;
use Illuminate\Http\Request;

class ConnectionController extends Controller
{
    public function get()
    {
        $res = Connection::all();
        return ConnectionResource::collection($res);
    }

    public function update(Request $request, $connectionId) {
        $data = $request->getContent();
        $data = json_decode($data);

        return \response()->json(['message' => 'Connection update succesfully!']);
    }
}
