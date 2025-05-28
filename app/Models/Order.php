<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasUuids;
    protected $fillable = [
        'user_id', 
        'address', 
        'phone',
        'total',
        'status', 
        'url',
        'payment_method', 
        'payment_channel', 
        'postal_code',
        'country' 
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
