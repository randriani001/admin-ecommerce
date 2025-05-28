<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasUuids;

    protected $table = 'order_items';

    protected $fillable = [
        'order_id',
        'product_variant_id',
        'quantity',
        'price' 
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
