<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Channel;
use App\Article;
use App\User;
use JWTAuth;
use App\Helpers\TestHelper;

class ChannelTest extends TestCase
{
    use DatabaseMigrations;

    const KEY_AUTH_TOKEN = 'Authorization';

    public function testGetAllChannels()
    {
        $member = $this->createMember01();
        $token = JWTAuth::fromUser($member);
        $channel1 = factory(Channel::class)->create([
            'id' => 1,
        ]);
        $channel2 = factory(Channel::class)->create([
            'id' => 2,
        ]);

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->get(TestHelper::getApiBase().'/channels', $headers);

        $response
            ->assertStatus(200)
            ->assertJson([
                [
                    'id' => 1,
                ],
                [
                    'id' => 2,
                ]
            ]);
    }
    /**
     * @return void
     */
    public function testGetArticlesOwnedByTargetChannel()
    {
        $member = $this->createMember01();
        $token = JWTAuth::fromUser($member);
        $channel1 = factory(Channel::class)->create([
            'id' => 1,
        ]);
        $channel2 = factory(Channel::class)->create([
            'id' => 2,
        ]);
        $article1 = factory(Article::class)->create([
            'channel_id' => 1,
        ]);
        $article2 = factory(Article::class)->create([
            'channel_id' => 1,
        ]);
        $article3 = factory(Article::class)->create([
            'channel_id' => 2,
        ]);

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->get(TestHelper::getApiBase().'/channels/'.$channel1->id.'/articles', $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                'channel' => [
                    'id' => 1,
                ],
                'articles' => [
                    'total' => 2,
                ],
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
