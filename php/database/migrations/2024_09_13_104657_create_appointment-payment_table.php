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
        Schema::create('appointment-payment', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('appointmentID');
            $table->foreign('appointmentID')->references('id')->on('appointment')->onDelete('restrict');
            $table->string('method');
            $table->string('refundCode');
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
        Schema::dropIfExists('appointment-payment');
    }
};
