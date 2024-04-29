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
            'name' => $userData[0],
            'password' => Hash::make($userData[1]),
            'score' => $userData[2]
        ]);
    
    }
}
