<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticleAttachment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'article_id', 'client_filename', 'backend_filename',
    ];
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function article()
    {
        return $this->belongsTo('App\Article');
    }
}
