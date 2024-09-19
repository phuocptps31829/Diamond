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
        Schema::create('patient-Health-information', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patientID');
            $table->foreign('patientID')->references('id')->on('patient')->onDelete('restrict');
            $table->string('type');
            $table->string('data');
            $table->string('unit');
            $table->string('date');
            $table->string('note');
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient-Health-information');
    }
};
