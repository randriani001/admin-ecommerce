<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->uuid('id')->primary();  
            $table->string('variant_name');
            $table->uuid('product_id');
            $table->integer('stock');
            $table->string('image');
            $table->timestamps();

            $table->foreign('product_id')
                    ->references('id')
                    ->on('products');
        }); 
    }

    /** 
     * Reverse the migrations.
     */
    public function down(): void 
    {
        Schema::dropIfExists('product_variants'); 
    }
};
