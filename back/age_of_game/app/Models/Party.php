<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'id_party';

    protected $table = "partys";
    use HasFactory;
}
