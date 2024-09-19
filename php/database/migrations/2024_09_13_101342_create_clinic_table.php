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
        Schema::create('clinic', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('branchID');
            $table->foreign('branchID')->references('id')->on('user')->onDelete('restrict');
            $table->unsignedBigInteger('specialtyID');
            $table->foreign('specialtyID')->references('id')->on('specialty')->onDelete('restrict');
            $table->string('name');
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinic');
    }
};
