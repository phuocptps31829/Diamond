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
        Schema::create('contract', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('doctorID')->nullable();
            $table->foreign('doctorID')->references('id')->on('doctor')->onDelete('restrict');
            $table->unsignedBigInteger('hospitalID')->nullable();
            $table->foreign('hospitalID')->references('id')->on('hospital')->onDelete('restrict');
            $table->date('startDate');
            $table->date('endDate');
            $table->string('detail');
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract');
    }
};
