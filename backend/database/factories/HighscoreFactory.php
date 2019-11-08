<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Highscore;
use Faker\Generator as Faker;
use phpDocumentor\Reflection\Types\Integer;

$factory->define(Highscore::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'score' => $faker->randomNumber(2)
    ];
});
