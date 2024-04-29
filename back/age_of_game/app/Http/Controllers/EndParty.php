<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EndParty extends Controller
{
    public function endParty(){
        validator(request()->all(), [
            'id_Party' => ['required'],
            'result' => ['required'],
            'grid_discovered' => ['required']
        ])->validate();
        

        return response()->json(['status' => 'ok'], 200);
    }
}
