<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EndParty extends Controller
{
    public function endParty(){
        $validator = Validator::make(request()->all(), [
            'id_Party' => ['required'],
            'result' => ['required'],
            'grid_discovered' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        return response()->json(['status' => 'ok'], 200);
    }
}
