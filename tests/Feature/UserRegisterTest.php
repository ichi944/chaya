<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Listeners\SendRegisterVerification;
use Illuminate\Auth\Events\Registered;
use Mail;
use Event;
use App\Mail\UserVerification;
use App\User;
use App\UserVerificationToken;
use App\Services\TokenGeneraterService;



class UserRegisterTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testRegisteredEventIsCalledWhenUserSubmitRegisterationForm()
    {
        Event::fake();
        $name = 'foo';
        $this->json('POST', '/api/v1.0.0/auth/signup', [
            'name' => $name,
            'email' => 'foo@example.com',
            'password' => 'password',
        ]);

        Event::assertDispatched(Registered::class, function ($e) use($name) {
            return $e->user->name === $name;
        });
    }

    public function testGenerateTokenAndSendVerificationMail()
    {
        Mail::fake();
        $tokenGenerater = new TokenGeneraterService();
        $handler = new SendRegisterVerification($tokenGenerater);
        $email = 'foo@example.com';
        $user = User::create([
            'id' => 1,
            'name' => 'foo',
            'email' => $email,
            'password' => bcrypt('password'),
        ]);
        $event = new Registered($user);
        $handler->handle($event);
        Mail::assertSent(UserVerification::class, function($mail) use($user) {
            return $mail->hasTo($user->email);
        });
        $this->assertDatabaseHas('user_verification_tokens', [
            'user_id' => 1,
        ]);
    }

    public function testSuccessVerificationByValidToken() {
        $user = factory(User::class)->create([
            'name' => 'foo',
        ]);
        $valid_token = 'validtoken';
        factory(UserVerificationToken::class)->create([
            'user_id' => $user->id,
            'token' => $valid_token,
        ]);
        $response = $this->get('/api/v1.0.0/auth/verification/'.$valid_token);

        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 0]);

        $this->assertDatabaseHas('users', [
            'name' => $user->name,
            'is_verified_with_email' => true,
        ]);
        $this->assertEquals(UserVerificationToken::all()->count(), 0);
    }

    public function testFailedVerificationByInvalidToken() {
        $user = factory(User::class)->create([
            'name' => 'foo',
        ]);
        $valid_token = 'validtoken';
        factory(UserVerificationToken::class)->create([
            'user_id' => $user->id,
            'token' => $valid_token,
        ]);
        $invalid_token = 'thisisinvalidtoken';
        $response = $this->get('/api/v1.0.0/auth/verification/'.$invalid_token);

        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 1]);

        $this->assertDatabaseHas('users', [
            'name' => $user->name,
            'is_verified_with_email' => false,
        ]);
        $this->assertEquals(UserVerificationToken::all()->count(), 1);

    }
}
