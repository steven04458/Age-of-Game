<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demineur extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'id_demineur';

    protected $table = "demineurs";
    use HasFactory;
}
