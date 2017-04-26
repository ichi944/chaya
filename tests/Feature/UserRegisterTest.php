<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Listeners\SendRegisterVerification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserVerification;
use App\User;

class UserRegisterTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testSendVerificationMail()
    {
        Mail::fake();
        $handler = new SendRegisterVerification();
        $email = 'foo@example.com';
        $user = User::create([
            'name' => 'foo',
            'email' => $email,
            'password' => bcrypt('password'),
        ]);
        $event = new Registered($user);
        $handler->handle($event);
        Mail::assertSent(UserVerification::class, function($mail) use($user) {
            return $mail->hasTo($user->email);
        });
    }
}
