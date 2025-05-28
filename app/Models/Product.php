<?php

namespace App\Models;

use App\Http\Controllers\ProductVariantController;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasUuids;
    protected $table = "products";
    protected $fillable = [
        "name",
        'category_id',
        'description',
        'company',
        'price',
        'image'
    ];

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    // $casts untuk mengkonversi data, misalnya password-nya "rahasia". Nanti tidak langsung masuk database tapi dienkripsi dulu/untuk merubah data sebelum dimasukkan ke database
    protected $casts = [
        'price' => 'float',
    ];

    protected $hidden = [
        //'price'
    ];

    //public $incrementing = false;   

    //protected $keyType = 'string';

    //public function category() {
    //    return $this->belongsTo(Category::class);
    //}
    public function category() {
        return $this->belongsTo(Category::class);
    }

     public function variants() {
        return $this->belongsTo(ProductVariant::class); 
    }
}
