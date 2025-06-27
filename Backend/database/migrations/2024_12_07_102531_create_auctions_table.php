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
        Schema::create('auctions', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('car_id')->constrained('cars')->cascadeOnDelete();
            $table->decimal('starting_price', 12, 2);
            $table->time('start_time');
            $table->time('end_time');
            $table->date('auction_date');
            $table->enum('status', ['Upcoming', 'Ongoing', 'Finished'])->default('Upcoming');
            $table->string('title', 255);
            $table->string('description', 255);
            $table->string('address', 255);
            $table->string('image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auctions');
    }
};
