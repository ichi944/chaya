<?php

namespace App;

use Eloquent;

class UserVerificationToken extends Eloquent
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'token',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
