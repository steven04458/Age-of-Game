<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable(); // ID de l'utilisateur lié à la session (optionnel)
            $table->string('ip_address', 45)->nullable(); // Adresse IP de l'utilisateur (optionnel)
            $table->text('user_agent')->nullable(); // Agent utilisateur de l'utilisateur (optionnel)
            $table->text('payload'); // Données de la session encodées
            $table->integer('last_activity')->unsigned(); // Dernière activité de la session (timestamp)
            $table->timestamps(); // Timestamps standard pour la création et la mise à jour

            // Index pour le champ last_activity pour une récupération rapide
            $table->index('last_activity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
};
