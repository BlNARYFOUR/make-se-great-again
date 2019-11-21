<?php

use App\Models\CodeBlock;
use Illuminate\Database\Seeder;

class CodeBlockTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $codeblocks = [
            [ 'code' => null, 'adjustable' => true, 'file_id' => 1 ],
            [ 'code' => "this.color = color;", 'adjustable' => false, 'file_id' => 1 ],
            [ 'code' => "} <br> <br> function setSpeed(speed) {", 'adjustable' => false, 'file_id' => 1 ],
            [ 'code' => null, 'adjustable' => true, 'file_id' => 1 ],
            [ 'code' => "}", 'adjustable' => false, 'file_id' => 1 ],
        ];

        foreach ( $codeblocks as $block ) {
            CodeBlock::create( $block );
        }
    }
}
