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
        Schema::create('medical-package-service-id', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('medicalPackageServiceID');
            $table->foreign('medicalPackageServiceID')->references('id')->on('medical-package-service')->onDelete('restrict');
            $table->unsignedBigInteger('serviceID');
            $table->foreign('serviceID')->references('id')->on('service')->onDelete('restrict');
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical-package-service-id');
    }
};
