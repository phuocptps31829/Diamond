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
        Schema::create('appointment', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patientID');
            $table->foreign('patientID')->references('id')->on('patient')->onDelete('restrict');
            $table->unsignedBigInteger('serviceID')->nullable();
            $table->foreign('serviceID')->references('id')->on('service')->onDelete('restrict');
            $table->unsignedBigInteger('medicalPackageID')->nullable();
            $table->foreign('medicalPackageID')->references('id')->on('medical-package')->onDelete('restrict');
            $table->unsignedBigInteger('appointmentHelpID')->nullable();
            $table->foreign('appointmentHelpID')->references('id')->on('patient')->onDelete('restrict');
            $table->unsignedBigInteger('workScheduleID');
            $table->foreign('workScheduleID')->references('id')->on('work-schedule')->onDelete('restrict');
            $table->string('type');
            $table->string('time');
            $table->string('status');
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment');
    }
};
