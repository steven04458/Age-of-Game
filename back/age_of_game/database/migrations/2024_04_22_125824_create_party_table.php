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
        Schema::disableForeignKeyConstraints();

        Schema::create('partys', function (Blueprint $table) {
            $table->id('id_party');
            $table->integer('id_user');
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->integer('id_game');
            $table->foreign('id_game')->references('id_demineur')->on('demineurs');
            $table->string('type');
            $table->bigInteger('start_time_stamp');
            $table->bigInteger('end_time_stamp');
            $table->integer('status');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partys');
    }
};
