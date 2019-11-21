<?php

use Illuminate\Database\Seeder;
use App\Models\File;

class FileTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $files = [
            ['name' => 'Game.js', 'game_id' => 1],
            ['name' => 'Bird.js', 'game_id' => 1],
        ];

        foreach ($files as $file) {
            File::create($file);
        }
    }
}
