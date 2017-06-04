<?php

namespace App\Listeners;

use App\Events\MailVerificationIsDone;
use App\User;
use Log;
use Mail;

class NotifyMailVerificationIsDoneToAdmin
{
    /**
     * Create the event listener.
     *
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  MailVerificationIsDone  $event
     * @return void
     */
    public function handle(MailVerificationIsDone $event)
    {
        Log::Info('@NotifyMailVerificationIsDoneToAdmin');

        $user = $event->user;
        // TODO: Notify all administrators not only one.
        $admin = User::where('is_admin', '=', true)->first();

        Mail::to($admin)->send(new \App\Mail\NotifyMailVerificationIsDoneToAdmin($user));

    }
}
