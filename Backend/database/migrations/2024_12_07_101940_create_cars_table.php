<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('model', 255);
            $table->string('brand', 255); // Merk
            $table->string('capacity', 255);
            $table->string('condition', 255); // Kualitas
            $table->string('transmission', 255);
            $table->string('odometer', 255);
            $table->string('category', 255);
            $table->string('image')->nullable(); // Car image
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
