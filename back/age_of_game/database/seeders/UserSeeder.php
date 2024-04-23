<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userData = ['joe', 'secure', 0];
  
        DB::table('users')->insert([
            'user_name' => $userData[0],
            'user_password' => Hash::make($userData[1]),
            'user_score' => $userData[2]
        ]);
    
    }
}
