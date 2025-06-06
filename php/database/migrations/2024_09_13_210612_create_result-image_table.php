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
        Schema::create('result-image', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('resultID');
            $table->foreign('resultID')->references('id')->on('result')->onDelete('restrict');
            $table->string('image');
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('result-image');
    }
};
