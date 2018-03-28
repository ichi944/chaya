<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChatMessage;
use Log;

class ArticleChatController extends Controller
{
    private $chatMessage;

    /**
     * constructor
     * @param ChatMessage $chatMessage
     */
    public function __construct(ChatMessage $chatMessage)
    {
        $this->chatMessage = $chatMessage;
    }

    /**
     * get chat messages with any search queries.
     * @param  Request $request
     * @param  Int $id      articles.id
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        $current_user = auth()->user();
        $max_id = $request->input('max_id');
        $query = $this->chatMessage;

        if ($max_id) {
            $query = $query->where('id', '<=', $max_id);
        }

        $chat_messages = $query->where('article_id', $id)
            ->orderBy('id', 'desc')
            ->take(10)
            ->get();
        return response()->json([
            '_code' => 0,
            'data' => $chat_messages,
        ]);
    }
    /**
     * store a new chat message
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $current_user = auth()->user();
        $created = $this->chatMessage->create([
            'article_id' => $id,
            'user_id' => $current_user->id,
            'body' => $request->chat_message,
        ]);
        return response()->json(['_code' => 0]);
    }
}
