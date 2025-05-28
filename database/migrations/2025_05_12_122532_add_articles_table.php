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
        Schema::create('articles', function (Blueprint $table) {
            $table->uuid('id')->primary();  
            $table->string('title');
            $table->text('content');
            $table->string('author');
            $table->timestamps();

            //untuk membuat relasi masukkan unsignedBigInteger. category_id adalah Foreign Key (FK)
            $table->unsignedBigInteger('category_id');

            //untuk menghubungkan FK yang kita bikin dengan relasinya: (category_id nama kolomnya)
            //$table->foreign('category_id')
                    //->references('id')
                    //->on('categories');

                    //ada panah "ondelete" yang dibuat untuk menghapus data kategori jika ID-nya dihapus
                    //->onDelete('cascade'); 
        }); 
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles'); 
    }
};
