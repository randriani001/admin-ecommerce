<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name'  
    ];

    //public function user() {
    //    return $this->belongsTo(User::class);
    //}
}
