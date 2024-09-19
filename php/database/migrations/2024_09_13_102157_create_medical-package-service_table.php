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
        Schema::create('medical-package-service', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('medicalPackageID');
            $table->foreign('medicalPackageID')->references('id')->on('medical-package')->onDelete('restrict');
            $table->string('levelName');
            $table->integer('price');
            $table->integer('discountPrice')->nullable();
            $table->string('duration');
            $table->string('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical-package-service');
    }
};
