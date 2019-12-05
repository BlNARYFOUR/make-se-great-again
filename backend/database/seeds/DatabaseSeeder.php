<?php

use App\Models\Highscore;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(FileTableSeeder::class);
        $this->call(CodeBlockTableSeeder::class);
        $this->call(CodeFillTableSeeder::class);

        factory(Highscore::class, 1)->create();
    }
}
