<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Article::class, function (Faker\Generator $faker) {

    return [
        'user_id' => 1,
        'heading' => $faker->name,
        'body' => $faker->text(200),
    ];
});
