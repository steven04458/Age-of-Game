<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasApiTokens;
    public $timestamps = false;
    protected $primaryKey = 'id_user';

    protected $table = "users";
    use HasFactory;
}
