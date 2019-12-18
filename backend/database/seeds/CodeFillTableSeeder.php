<?php

use App\Models\CodeFill;
use Illuminate\Database\Seeder;

class CodeFillTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $json      = File::get( "database/data/codeFills.json" );
        $codeFills = json_decode( $json );

        foreach ( $codeFills as $fills ) {
            CodeFill::create( array(
                'code'          => $fills->code,
                'exec_id'       => $fills->exec_id,
                'code_block_id' => $fills->code_block_id
            ) );
        }
    }
}
