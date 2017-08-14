<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PinnedArticle extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'article_id',
        'channel_id',
        'created_by',
    ];
}
