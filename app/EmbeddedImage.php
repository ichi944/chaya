<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmbeddedImage extends Model
{
    protected $fillable = [
        'user_id',
        'channel_id',
        'client_filename',
        'backend_filename',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        $this->belongsTo('APP\User');
    }

    public function channel()
    {
        $this->belongsTo('App\Channel');
    }
}
