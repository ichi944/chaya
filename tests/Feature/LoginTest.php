<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\User;

class LoginTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testLoginIsFailedWhenUserNonVerified()
    {
        $email = 'foo@example.com';
        $password = 'secret';
        $user = factory(User::class)->create([
            'name' => 'foo',
            'email' => $email,
            'is_verified_with_email' => false,
            'password' => bcrypt($password),
        ]);

        $credentials = [
            'email' => $email,
            'password' => $password,
        ];

        $response = $this->post('/api/v1.0.0/auth/login', $credentials);
        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 1]);
    }

    public function testLoginIsSucceededWhenUserVerified()
    {
        $email = 'foo@example.com';
        $password = 'secret';
        $user = factory(User::class)->create([
            'name' => 'foo',
            'email' => $email,
            'is_verified_with_email' => true,
            'password' => bcrypt($password),
        ]);

        $credentials = [
            'email' => $email,
            'password' => $password,
        ];

        $response = $this->post('/api/v1.0.0/auth/login', $credentials);
        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 0]);
    }
}
