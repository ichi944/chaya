<?php

namespace App;

use Eloquent;

class Article extends Eloquent
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'heading', 'body', 'channel_id',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function channel()
    {
        return $this->belongsTo('App\Channel');
    }

}
