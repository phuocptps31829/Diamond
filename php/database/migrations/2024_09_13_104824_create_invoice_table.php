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
        Schema::create('invoice', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patientID');
            $table->foreign('patientID')->references('id')->on('patient')->onDelete('restrict');
            $table->unsignedBigInteger('appointmentID');
            $table->foreign('appointmentID')->references('id')->on('appointment')->onDelete('restrict');
            $table->unsignedBigInteger('prescriptionID');
            $table->foreign('prescriptionID')->references('id')->on('prescription')->onDelete('restrict');
            $table->integer('price');
            $table->integer('arisePrice')->nullable();
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice');
    }
};
