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
use App\Listeners\NotifyMailVerificationIsDoneToAdmin as NotifyMailVerificationIsDoneToAdminHandler;
use App\Events\MailVerificationIsDone;
use App\Helpers\TestHelper;

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
        $this->json('POST', TestHelper::getApiBase().'/auth/signup', [
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
        Event::fake();
        $user = factory(User::class)->create([
            'name' => 'foo',
        ]);
        $valid_token = 'validtoken';
        factory(UserVerificationToken::class)->create([
            'user_id' => $user->id,
            'token' => $valid_token,
        ]);
        $response = $this->get(TestHelper::getApiBase().'/auth/verification/'.$valid_token);

        Event::assertDispatched(MailVerificationIsDone::class, function ($e) use($user) {
            return $e->user->name === $user->name;
        });
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
        $response = $this->get(TestHelper::getApiBase().'/auth/verification/'.$invalid_token);

        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 1]);

        $this->assertDatabaseHas('users', [
            'name' => $user->name,
            'is_verified_with_email' => false,
        ]);
        $this->assertEquals(UserVerificationToken::all()->count(), 1);

    }

    public function testNotifyMailHasNameOfNewMember()
    {
        Mail::fake();
        $user = factory(User::class)->create([
            'name' => 'foo',
            'is_verified_with_email' => true,
        ]);
        $admin = factory(User::class)->create([
            'name' => 'bar',
            'email' => 'bar@example.com',
            'is_admin' => true,
        ]);

        $handler = new NotifyMailVerificationIsDoneToAdminHandler();
        $event = new MailVerificationIsDone($user);
        $handler->handle($event);

        Mail::assertSent(\App\Mail\NotifyMailVerificationIsDoneToAdmin::class, function($mail) use($admin, $user) {
            return $mail->hasTo($admin->email) &&
                $mail->user->name === 'foo';
        });
    }
}
