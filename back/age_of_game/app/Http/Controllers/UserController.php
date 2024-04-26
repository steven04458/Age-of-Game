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
        validator(request()->all(), [
            'name' => ['required'],
            'password' => ['required']
        ])->validate();
    
        $user = User::where('name', request('name'))->first();
        if ($user && Hash::check(request('password'), $user->password)) {
            $token = $user->createToken(time())->plainTextToken;

            return response()->json(['status' => 'success', 'token' => $token], 200);
        }
        return response()->json(['error' => false], 401);
    }
}
