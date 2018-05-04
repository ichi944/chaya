<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\Article;
use App\PinnedArticle;
use App\Constants\Articles;

use Log;

class ArticleController extends Controller
{
    private $article;

    public function __construct(Article $article, PinnedArticle $pinned_article)
    {
        $this->article = $article;
        $this->pinned_article = $pinned_article;
    }
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search_query = $request->input('query');
        $query = $this->article;
        if($search_query !== '') {
            // TODO: make it can search also in article body.
            $query = $this->article
                ->where('heading', 'like', "%$search_query%");
        }
        $data = $query
            ->with('user')
            ->with('pinned')
            ->orderBy('id', 'desc')
            ->paginate(Articles::ITEMS_PER_PAGE);

        return response()->json($data);
    }/** @noinspection PhpInconsistentReturnPointsInspection */

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }/** @noinspection PhpInconsistentReturnPointsInspection */

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $current_user = JWTAuth::parseToken()->authenticate();
        $this->article->user_id = $current_user->id;
        $this->article->heading = $request->heading;
        $this->article->body = $request->body;
        $this->article->channel_id = $request->channelId;
        $created = $this->article->save();
        if($created) {
            Log::Info('a new article is created.');
            return response()->json($this->article);
        } else {
            Log::Info('error');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = $this->article->with('user')->with('pinned')->find($id);
        return response()->json($data);
    }/** @noinspection PhpInconsistentReturnPointsInspection */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }/** @noinspection PhpInconsistentReturnPointsInspection */

    /**
     * Update the specified resource in storage.
     *
     * @param  Request $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $target = $this->article->find($id);
        $target->heading = $request->heading;
        $target->body = $request->body;
        $updated = $target->update();
        if($updated) {
            Log::Info('the article is updated successfully.');
            return response()->json($target);
        } else {
            Log::Info('error');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $target = $this->article->find($id);

        // delete cascade manually.
        $pinned = $target->pinned()->first();
        if($pinned) {
            $pinned->delete();
        }

        // delete the chat messages too.
        $chat_messages = $target->chat_messages();
        if ($chat_messages) {
            $chat_messages->delete();
        }

        $deleted = $target->delete();

        if($deleted) {
            Log::Info("The article: $id is deleted.");
            return response()->json(['_code' => 0]);
        } else {
            return response()->json(['_code' => 1]);
        }
    }

    /**
     * User create a pinned article.
     *
     * @param  int $id article id
     * @return  \Illuminate\Http\Response
     */
    public function pinned($id)
    {
        $current_user = JWTAuth::parseToken()->authenticate();
        $article = $this->article->find($id);
        $result = $this->pinned_article->create([
            'article_id' => $article->id,
            'channel_id' => $article->channel_id,
            'created_by' => $current_user->id,
        ]);
        if($result) {
            return response()->json(['_code' => 0]);
        } else {
            return response()->json(['_code' => 1]);
        }
    }

    /**
     * User delete a pinned article.
     *
     * @param  int $id article id
     * @return  \Illuminate\Http\Response
     */
    public function unpinned($id)
    {
        $pinned_article = $this->pinned_article->where('article_id', '=', $id);
        $result = $pinned_article->delete();
        if($result) {
            return response()->json(['_code' => 0]);
        } else {
            return response()->json(['_code' => 1]);
        }
    }
}
