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

        Schema::create('party', function (Blueprint $table) {
            $table->id('id_party');
            $table->integer('id_user');
            $table->foreign('id_user')->references('id_user')->on('user');
            $table->integer('id_game');
            $table->foreign('id_game')->references('id_demineur')->on('demineur');
            $table->string('party_type');
            $table->bigInteger('party_start_time_stamp');
            $table->bigInteger('party_end_time_stamp');
            $table->integer('party_status');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('party');
    }
};
