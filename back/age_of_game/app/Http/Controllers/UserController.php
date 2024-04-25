<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login()
    {
        validator(request()->all(), [
            'name' => ['required'],
            'password' => ['required']
        ])->validate();
    
        $user = Users::where('user_name', request('name'))->first();
        if ($user && Hash::check(request('password'), $user->user_password)) {
            $token = $user->createToken(time())->plainTextToken;

            return response()->json(['status' => 'success', 'token' => $token], 200);
        }
        return response()->json(['error' => false], 401);
    }
}
