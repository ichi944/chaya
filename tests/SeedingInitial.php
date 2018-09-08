<?php

namespace Tests;

use App\Channel;
use App\User;

trait SeedingInitial
{
    /**
     * seeding some basic data
     */
    public function seedingInitial()
    {
        $channel = factory(Channel::class)->create([
            'id' => 1,
            'name' => 'general',
        ]);
        $user = factory(User::class)->create([
            'id' => 1,
            'name' => 'admin',
            'email' => 'admin@example.com',
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
            'is_admin' => true,
        ]);
    }
}
