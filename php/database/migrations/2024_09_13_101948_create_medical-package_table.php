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
        Schema::create('medical-package', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('specialtyID');
            $table->foreign('specialtyID')->references('id')->on('specialty')->onDelete('restrict');
            $table->string('name');
            $table->string('shortDescription');
            $table->string('image');
            $table->string('detail');
            $table->string('isHidden')->default(0);
            $table->string('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical-package');
    }
};
