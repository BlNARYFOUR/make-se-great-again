<?php

use Illuminate\Database\Seeder;

class FileTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get("database/data/files.json");
        $files = json_decode($json);

        foreach ($files as $file) {
            App\Models\File::create(array(
                'name' => $file->name,
                'game_id' => $file->game_id
            ));
        }
    }
}
