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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();  
            $table->unsignedBigInteger('order_id');
            $table->uuid('product_variant_id');
            $table->string('address');
            $table->string('payment_method');
            $table->string('payment_channel');
            $table->string('country');
            $table->enum('status', ['PENDING', 'PAID', 'CANCELED'])->default('PENDING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
