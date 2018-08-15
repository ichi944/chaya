<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ChatMessage;
use App\Events\ArticleChatPosted;
use App\Events\ChatNotification;
use Log;
use App\Constants\ResponseCode;

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
        $number = 10;
        $max_id = $request->query('max_id', null);
        $query = $this->chatMessage;

        if ($max_id !== null) {
            $max_id = (int)$max_id;
        }
        if ($max_id === 0) {
            return response()->json([
                '_code' => ResponseCode::ERROR,
                'message' => 'massage does not exists',
            ]);
        }
        if (isset($max_id) && $max_id > 0) {
            $query = $query->where('id', '<=', $max_id);
        }

        $chat_messages = $query->where('article_id', $id)
            ->orderBy('id', 'desc')
            ->with('user')
            ->take($number)
            ->get()
            ->reverse()
            ->values();
        return response()->json([
            '_code' => ResponseCode::SUCCESS,
            'content' => $chat_messages,
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
        $new_message = $this->chatMessage
            ->where('id', $created->id)
            ->with('user')
            ->with('article')
            ->first();
        event(new ArticleChatPosted(['chat_message' => $new_message]));
        event(new ChatNotification(['chat_message' => $new_message]));
        return response()->json(['_code' => ResponseCode::SUCCESS]);
    }
}
