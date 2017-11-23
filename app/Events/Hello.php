<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\User;
use Log;

class Hello implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $current_user;
    public $text;
    /**
     * Create a new event instance.
     * @param User $current_user who said hello.
     * @param String $text the user want to broadcast to everyone.
     * @return void
     */
    public function __construct(User $current_user, $text)
    {
        $this->current_user = $current_user;
        $this->text = $text;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('shared');
    }
/**
     * Get the data to broadcast.
     * to broadcast to everyone except ownself, sent own user id.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
          'id' => $this->current_user->id,
          'name' => $this->current_user->name,
          'text' => $this->text,
        ];
}
}
