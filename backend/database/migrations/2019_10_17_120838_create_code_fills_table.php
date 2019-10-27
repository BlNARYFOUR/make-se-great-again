<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodeFillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('code_fills', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->longText('code');
            $table->unsignedSmallInteger('exec_id');
            $table->unsignedBigInteger('code_block_id');
            $table->timestamps();

            $table->foreign('code_block_id')->references('id')->on('code_blocks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('code_fills');
    }
}
