<?php

namespace App\Http\Controllers;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login()
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required'],
            'password' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $user = User::where('name', request('name'))->first();
        if ($user && Hash::check(request('password'), $user->password)) {
            $token = $user->createToken(time())->plainTextToken;

            return response()->json(['status' => 'success', 'token' => $token, 'name' => $user->name, 'score' => $user->score], 200);
        }
        return response()->json(['error' => false], 401);
    }
    public function register()
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required'],
            'password' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $uniqueNameCheck = User::where('name', request('name'))->exists();
        if(!$uniqueNameCheck){
            $user = new User;
            $user->name = request('name');
            $user->password = Hash::make(request('password'));
            $user->score = 0;
            $user->save();
            return response()->json(['status' => 'success'], 200);
        }else{
            return response()->json(['status'=> 'failed', 'message' => 'username already use'], 401);
        }
       
    }
    
}
