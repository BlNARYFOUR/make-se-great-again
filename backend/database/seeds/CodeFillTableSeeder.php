<?php

use Illuminate\Database\Seeder;

class CodeFillTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $codeFills = [
            ["code" => "color = red;", "exec_id" => 1, "code_block_id" => 1],
            ["code" => "setColor(color) {", "exec_id" => 2, "code_block_id" => 1],
            ["code" => "function (color) {", "exec_id" => 3, "code_block_id" => 1],
            ["code" => "function setColor(color) {", "exec_id" => 4, "code_block_id" => 1],
            ["code" => "speed = 5;", "exec_id" => 1, "code_block_id" => 4],
            ["code" => "this.speed = 17;", "exec_id" => 2, "code_block_id" => 4],
            ["code" => "speed = speed;", "exec_id" => 3, "code_block_id" => 4],
            ["code" => "this.speed = 5;", "exec_id" => 4, "code_block_id" => 4],
        ];
    }
}
