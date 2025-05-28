<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 
        'address', 
        'payment_method', 
        'payment_channel', 
        'country', 
        'status', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

     public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
