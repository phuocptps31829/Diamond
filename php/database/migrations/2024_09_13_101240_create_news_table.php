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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('specialtyID');
            $table->foreign('specialtyID')->references('id')->on('specialty')->onDelete('restrict');
            $table->string('title');
            $table->string('image');
            $table->string('content');
            $table->string('author');
            $table->integer('viewCount');
            $table->boolean('isHidden')->default(0);
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
