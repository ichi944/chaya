<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\PinnedArticle::class, function (Faker\Generator $faker) {
    return [
        'article_id' => 1,
        'channel_id' => 1,
        'created_by' => 1,
    ];
});
