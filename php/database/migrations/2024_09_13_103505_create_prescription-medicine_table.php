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
        Schema::create('prescription-medicine', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('medicineID');
            $table->foreign('medicineID')->references('id')->on('medicine')->onDelete('restrict');
            $table->string('dosage');
            $table->integer('quantity');
            $table->boolean('deleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription-medicine');
    }
};
