<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Channel;
use App\Article;
use App\User;
use App\PinnedArticle;
use JWTAuth;
use App\Helpers\TestHelper;

class PinnedArticleTest extends TestCase
{
    use DatabaseMigrations;

    const KEY_AUTH_TOKEN = 'Authorization';

    /**
     * @return void
     */
    public function testPinnedArticle()
    {
        $member = $this->createMember01();
        $token = JWTAuth::fromUser($member);
        $channel = factory(Channel::class)->create([
            'id' => 1,
        ]);
        $article = factory(Article::class)->create([
            'channel_id' => 1,
        ]);

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->put(TestHelper::getApiBase().'/articles/'.$article->id.'/pinned', [], $headers);

        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => 0,
            ]);

        $this->assertDatabaseHas('pinned_articles', [
            'article_id' => 1,
            'channel_id' => 1,
            'created_by' => 1,
        ]);
    }

    /**
     * @return void
     */
    public function testUnpinnedArticle()
    {
        $member = $this->createMember01();
        $token = JWTAuth::fromUser($member);
        $channel = factory(Channel::class)->create([
            'id' => 1,
        ]);
        $article = factory(Article::class)->create([
            'id' => 1,
            'channel_id' => $channel->id,
        ]);
        $pinned_article = factory(PinnedArticle::class)->create([
            'article_id' => $article->id,
            'channel_id' => $article->channel_id,
            'created_by' => $member->id,
        ]);

        $this->assertDatabaseHas('pinned_articles', [
            'article_id' => 1,
            'channel_id' => 1,
            'created_by' => 1,
        ]);

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->put(TestHelper::getApiBase().'/articles/'.$article->id.'/unpinned', [], $headers);

        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => 0,
            ]);

        $this->assertDatabaseMissing('pinned_articles', [
            'article_id' => 1,
            'channel_id' => 1,
            'created_by' => 1,
        ]);
    }

    /**
     * return a member
     * @return User
     **/
    private function createMember01()
    {
        $member = factory(User::class)->create([
            'id' => 1,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
        ]);
        return $member;
    }
}
