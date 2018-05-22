<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ArticleAttachment;

use File;
use Log;
use Storage;

class ArticleAttachmentController extends Controller
{

    /**
     * constructor
     * @param ArticleAttachment $article_attachment [description]
     */
    public function __construct(ArticleAttachment $article_attachment)
    {
        $this->article_attachment = $article_attachment;
    }

    public function download(Request $request, $id)
    {
        $attachment = $this->article_attachment->find($id);
        // TODO: check permission
        $path = storage_path('app/article_attachment/'.$attachment->article_id.'/'.$attachment->backend_filename);

        Log::Info('path of download file is: '.$path);

        if (!File::exists($path)) {
            abort(404);
        }
        return response()->download($path);
    }

    public function delete(Request $request, $id)
    {
        $target = $this->article_attachment->find($id);
        $article_id = $target->article_id;

        $directory = 'article_attachment/'.$article_id;

        Log::Info('@target file is: '.$directory.$target->backend_filename);

        Storage::delete($directory.'/'.$target->backend_filename);
        $target->delete();

        $current_attachments = $this->article_attachment
            ->where('article_id', $article_id)
            ->select('id', 'client_filename as name', 'user_id', 'created_at')
            ->get();

        return response()->json(['_code' => 0, 'current_attachments' => $current_attachments]);
    }
}
