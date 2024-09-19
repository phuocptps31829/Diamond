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
        Schema::create('applicable-object', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('medicalPackageID');
            $table->foreign('medicalPackageID')->references('id')->on('medical-package')->onDelete('restrict');
            $table->string('gender')->nullable();
            $table->integer('ageMin')->nullable();
            $table->integer('ageMax')->nullable();
            $table->boolean('isMarried')->default(0);
            $table->boolean('isFamily')->default(0);
            $table->string('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicable-object');
    }
};
