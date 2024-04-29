<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Demineur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LaunchParty extends Controller
{
    public function launchParty(){
        $validator = Validator::make(request()->all(), [
            'level' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $user = Auth::user();
        $level = request('level');
        switch ($level) {
            case 1:
                $taille = 6;
                $bombes = 6;
                break;
            case 2:
                $taille = 8;
                $bombes = 12;
                break;
            case 3:
                $taille = 10;
                $bombes = 20;
                break;
            case 4:
                $taille = 12;
                $bombes = 30;
                break;
            case 5:
                $taille = 14;
                $bombes = 40;
                break;
            default:
                $taille = 6;
                $bombes = 6;
        }
        $table = array_fill(0, $taille, array_fill(0, $taille, 0));
        $bombesPlacees = 0;
        while ($bombesPlacees < $bombes) {
            $x = rand(0, $taille - 1);
            $y = rand(0, $taille - 1);
            if ($table[$x][$y] !== -1) {
                $table[$x][$y] = -1;
                $bombesPlacees++;
            }
        }
        for ($i = 0; $i < $taille; $i++) {
            for ($j = 0; $j < $taille; $j++) {
                if ($table[$i][$j] === -1) {
                    for ($di = -1; $di <= 1; $di++) {
                        for ($dj = -1; $dj <= 1; $dj++) {
                            $ni = $i + $di;
                            $nj = $j + $dj;
                            if ($ni >= 0 && $ni < $taille && $nj >= 0 && $nj < $taille && $table[$ni][$nj] !== -1) {
                                $table[$ni][$nj]++;
                            }
                        }
                    }
                }
            }
        }
        $csvTable = '';
        foreach ($table as $ligne) {
            $csvTable .= implode(',', $ligne) . PHP_EOL;
        }
        $demineur = new Demineur;
        $demineur->level = $level;
        $demineur->table = $csvTable;
        $demineur->save();
        return response()->json(['table' => $csvTable], 200);
    }
}
