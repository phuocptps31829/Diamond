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
        Schema::create('doctor', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userID');
            $table->foreign('userID')->references('id')->on('user')->onDelete('restrict');
            $table->unsignedBigInteger('specialtyID');
            $table->foreign('specialtyID')->references('id')->on('specialty')->onDelete('restrict');
            $table->string('title')->nullable();
            $table->string('practicingCertificate')->nullable();
            $table->integer('yearsExperience')->nullable();
            $table->string('detail')->nullable();;
            $table->boolean('isInternal')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor');
    }
};
