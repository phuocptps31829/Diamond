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
        Schema::create('result', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('serviceID');
            $table->foreign('serviceID')->references('id')->on('service')->onDelete('restrict');
            $table->unsignedBigInteger('appointmentID');
            $table->foreign('appointmentID')->references('id')->on('appointment')->onDelete('restrict');
            $table->string('diagnose');
            $table->string('description')->nullable();
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('result');
    }
};
