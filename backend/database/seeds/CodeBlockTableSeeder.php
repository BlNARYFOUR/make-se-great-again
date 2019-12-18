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
        $json = File::get( "database/data/codeBlocks.json" );
        $codeBlocks = json_decode( $json );

        foreach ( $codeBlocks as $block ) {
            CodeBlock::create( array(
                'code'       => $block->code,
                'adjustable' => $block->adjustable,
                'file_id'    => $block->file_id
            ) );
        }
    }
}
