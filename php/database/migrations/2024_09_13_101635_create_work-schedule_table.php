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
        Schema::create('work-schedule', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('doctorID');
            $table->foreign('doctorID')->references('id')->on('doctor')->onDelete('restrict');
            $table->unsignedBigInteger('clinicID');
            $table->foreign('clinicID')->references('id')->on('clinic')->onDelete('restrict');
            $table->date('day');
            $table->string('startTime');
            $table->string('endTime');
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work-schedule');
    }
};
