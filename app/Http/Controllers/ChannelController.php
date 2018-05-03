<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Channel;
use App\Article;
use App\Events\ChannelListUpdated;
use Log;

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
     * @return \Illuminate\Http\JsonResponse
     */
    public function articles($channel_id)
    {
        $channel = $this->channel->find($channel_id);
        $articles = $channel
            ->articles()
            ->with('user')
            ->with('pinned')
            ->orderBy('id', 'desc')
            ->paginate(\App\Constants\Articles::ITEMS_PER_PAGE);

        return response()->json([
            'channel' => $channel,
            'articles' => $articles,
        ]);
    }

    public function add(Request $request)
    {
        $created = $this->channel->create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);

        if ($created) {
            $channels = $this->channel->all();
            event(new ChannelListUpdated($channels));
            return response()->json([
                '_code' => 0,
            ]);
        }
    }

    /**
     * @param Request $request
     * @param int $chanel_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateDescription(Request $request, $channel_id)
    {
        $channel = $this->channel->find($channel_id);
        $channel->description = $request->input('description');
        if($channel->save()) {
            return response()->json([
                '_code' => 0,
                'channel'=> $channel,
            ]);
        }
        return response()->json([
            '_code' => 1,
        ]);
    }

}
