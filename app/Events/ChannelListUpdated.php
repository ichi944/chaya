<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ChannelListUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $channels;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($channels)
    {
        $this->channels = $channels;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel');
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
            'channels' => $this->channels,
        ];
    }
}
