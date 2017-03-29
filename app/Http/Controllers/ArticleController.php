<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\Article;

use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
    public function __construct(Article $article)
    {
        $this->article = $article;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->article
            ->with('user')
            ->orderBy('id', 'desc')
            ->paginate(3);

        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $current_user = JWTAuth::parseToken()->authenticate();
        $this->article->user_id = $current_user->id;
        $this->article->heading = $request->heading;
        $this->article->body = $request->body;
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
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $current_user = JWTAuth::parseToken()->authenticate();
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
