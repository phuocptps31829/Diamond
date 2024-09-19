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
        Schema::create('medicine', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('medicineCode');
            $table->string('ingredients');
            $table->string('unit');
            $table->string('sideEffects');
            $table->string('type');
            $table->string('instruction');
            $table->string('note');
            $table->integer('price');
            $table->boolean('isHidden')->default(0);
            $table->boolean('isDeleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicine');
    }
};
