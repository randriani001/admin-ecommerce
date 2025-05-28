<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasUuids;

    protected $fillable = [
        'variant_name', 
        'product_id', 
        'stock', 
        'image',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
     
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
