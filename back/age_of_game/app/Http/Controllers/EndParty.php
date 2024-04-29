<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Demineur;
use App\Models\Party;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class EndParty extends Controller
{
    public function endParty(){
        $validator = Validator::make(request()->all(), [
            'id_party' => ['required'],
            'result' => ['required'],
            'grid_discovered' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $base = 50;
        $party = Party::find(request('id_party'));
        if($party->status != 0){
            return response()->json(['error' => 'party already ended'], 400);
        }
        $party->status = request('result');
        $party->save();
        $demineur = Demineur::find($party->id_game);
        if(request('result')==1){
            switch($demineur->level)
            {
                case 1:
                    $multiplier = 0.2;
                    break;
                case 2:
                    $multiplier = 0.5;
                    break;
                case 3:
                    $multiplier = 1;
                    break;
                case 4:
                    $multiplier = 2;
                    break;
                case 5:
                    $multiplier = 4;
                    break;
            };
        }else{
            $multiplier=0;
        }
        $user = User::find($party->id_user);
        $user->score = $base*$multiplier;
        $user->save();
        return response()->json(['status' => 'ok', 'addedScore' => $base*$multiplier], 200);
    }
}
