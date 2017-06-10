<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel;
use App\Article;

class ChannelController extends Controller
{
    /**
     * @var Channel
     */
    private $channel;

    /**
     * @var Article;
     */
    private $article;

    public function __construct(Channel $channel, Article $article)
    {
        $this->channel = $channel;
        $this->article = $article;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $channels = $this->channel->all();
        return response()->json($channels);
    }

    /**
     * @param Int $channel_id
     */
    public function articles($channel_id)
    {
        $channel = $this->channel->find($channel_id);
        $articles = $channel->articles()->paginate(\App\Constants\Articles::ITEMS_PER_PAGE);

        return response()->json([
            'channel' => $channel,
            'articles' => $articles,
        ]);
    }

}
