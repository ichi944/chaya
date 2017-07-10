<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\Article;
use App\Constants\Articles;

use Log;

class ArticleController extends Controller
{
    private $article;

    public function __construct(Article $article)
    {
        $this->article = $article;
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
        $data = $this->article->with('user')->find($id);
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
        $deleted = $target->delete();

        if($deleted) {
            Log::Info("The article: $id is deleted.");
            return response()->json(['_code' => 0]);
        } else {
            return response()->json(['_code' => 1]);
        }
    }
}
