<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\ChatMessage::class, function (Faker\Generator $faker) {

    return [
        'user_id' => 1,
        'article_id' => 1,
        'body' => $faker->text(200),
    ];
});
