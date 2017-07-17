<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Channel::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->name,
        'description' => $faker->text,
    ];
});
