<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\User;
use App\Helpers\TestHelper;

class LoginTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testLoginIsFailedWhenUserNonVerifiedWithEmail()
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

        $response = $this->post(TestHelper::getApiBase().'/auth/login', $credentials);
        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 1]);
    }

    public function testLoginIsFailedWhenUserNonVerifiedByAdmin()
    {
        $email = 'foo@example.com';
        $password = 'secret';
        $user = factory(User::class)->create([
            'name' => 'foo',
            'email' => $email,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => false,
            'password' => bcrypt($password),
        ]);

        $credentials = [
            'email' => $email,
            'password' => $password,
        ];

        $response = $this->post(TestHelper::getApiBase().'/auth/login', $credentials);
        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 1]);
    }

    public function testLoginIsFailedWhenUserIsLocked()
    {
        $email = 'foo@example.com';
        $password = 'secret';
        $user = factory(User::class)->create([
            'name' => 'foo',
            'email' => $email,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
            'is_locked' => true,
            'password' => bcrypt($password),
        ]);

        $credentials = [
            'email' => $email,
            'password' => $password,
        ];

        $response = $this->post(TestHelper::getApiBase().'/auth/login', $credentials);
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
            'is_verified_by_admin' => true,
            'password' => bcrypt($password),
        ]);

        $credentials = [
            'email' => $email,
            'password' => $password,
        ];

        $response = $this->post(TestHelper::getApiBase().'/auth/login', $credentials);
        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 0]);
    }
}
