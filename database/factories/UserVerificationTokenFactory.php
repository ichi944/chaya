<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\UserVerificationToken::class, function (Faker\Generator $faker) {

    return [
        'user_id' => 1,
        'token' => str_random(32),
    ];
});
