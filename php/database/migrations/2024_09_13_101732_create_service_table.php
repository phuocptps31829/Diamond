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
        Schema::create('service', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('specialtyID')->nullable();
            $table->foreign('specialtyID')->references('id')->on('specialty')->onDelete('restrict');
            $table->string('name');
            $table->integer('price');
            $table->string('shortDescription');
            $table->string('image');
            $table->string('detail');
            $table->integer('discountPrice')->nullable();
            $table->string('duration');
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
        Schema::dropIfExists('service');
    }
};
