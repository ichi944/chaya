<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Mail;
use App\Mail\UserVerification;
use Log;
use App\Services\TokenGeneraterService;

class SendRegisterVerification
{
    /**
     * Create the event listener.
     *
     * @param TokenGeneraterService $tokenGenerater
     */
    public function __construct(TokenGeneraterService $tokenGenerater)
    {
        $this->tokenGenerater = $tokenGenerater;
    }

    /**
     * Handle the event.
     *
     * @param  Registered  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        Log::Info('@SendRegisterVerification');
        $token = (new TokenGeneraterService())
                ->generateUserVerificationToken();

        $event->user->userVerificationToken()->create([
            'token' => $token,
        ]);

        Log::Info('token is: '. $token);
        $verification_url = $this->getApplicationBaseUrl() . \App\Constants\Verification::URL . '/' . $token;
        Mail::to($event->user)->send(new UserVerification(compact('verification_url')));
    }

    private function getApplicationBaseUrl()
    {
        $base = env('APP_URL', 'http://localhost');
        $port = '';
        if (!empty(env('APP_PORT'))) {
            $port = ':' . env('APP_PORT');
        }
        return $base . $port;
    }
}
