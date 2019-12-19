<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConnectionResource;
use App\Models\Connection;
use App\Models\Deploy;
use Illuminate\Database\QueryException;
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

        $deploy = new Deploy();
        $deploy->connection_id = $connectionId;
        $deploy->json_data = $data;

        try {
            $deploy->save();
        } catch (QueryException $e) {
            return response()->json(['message' => 'Could not deploy.'], 400);
        }

        $data = json_decode($data);

        return response()->json(['message' => 'Connection update succesfully!', 'send' => $data]);
    }
}
