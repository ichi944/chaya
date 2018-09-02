<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\{User, Channel, Article, ChatMessage};
use App\Helpers\TestHelper;
use App\Constants\ResponseCode;
use Event;
use App\Events\ArticleChatPosted;

class ChatMessageTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * Post and save a new chat message.
     *
     * @return void
     */
    public function testNewChatMessageCreated()
    {
        $member = $this->createMember01();
        $token = auth()->login($member);

        $channel1 = factory(Channel::class)->create([
            'id' => 1,
        ]);
        $article = factory(Article::class)->create([
            'id' => 1,
            'channel_id' => 1,
            'user_id' => 1,
        ]);

        Event::fake();

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $test_chat_message = 'test message';
        $data = ['chat_message' => $test_chat_message];
        $response = $this->post(TestHelper::getApiBase().'/articles/'.$article->id.'/post-chat-message', $data, $headers);

        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => ResponseCode::SUCCESS,
            ]);

        $this->assertDatabaseHas('chat_messages', [
            'body' => $test_chat_message,
        ]);
        Event::assertDispatched(ArticleChatPosted::class);
    }

    public function testLatestTenChatMessages()
    {
        $member = $this->createMember01();
        $token = auth()->login($member);

        $channel1 = factory(Channel::class)->create([
            'id' => 1,
        ]);
        $article = factory(Article::class)->create([
            'id' => 1,
            'channel_id' => 1,
            'user_id' => 1,
        ]);
        $chat_messages = factory(ChatMessage::class, 15)->create();

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->get(TestHelper::getApiBase().'/articles/'.$article->id.'/get-chat-messages', $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => ResponseCode::SUCCESS,
                'content' => [
                    ['id' => 15],
                    ['id' => 14],
                    ['id' => 13],
                    ['id' => 12],
                    ['id' => 11],
                    ['id' => 10],
                    ['id' => 9],
                    ['id' => 8],
                    ['id' => 7],
                    ['id' => 6],
                ],
            ]);
    }

    public function testCantGetAnyMessages()
    {
        $member = $this->createMember01();
        $token = auth()->login($member);

        $channel1 = factory(Channel::class)->create([
            'id' => 1,
        ]);
        $article = factory(Article::class)->create([
            'id' => 1,
            'channel_id' => 1,
            'user_id' => 1,
        ]);

        $no_messages_article_id = 3;
        $chat_messages = factory(ChatMessage::class, 15)->create();

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->get(TestHelper::getApiBase().'/articles/'.$no_messages_article_id.'/get-chat-messages', $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => ResponseCode::SUCCESS,
                // content should be empgy.
                'content' => [],
            ]);
    }

    public function testGetOldChatMessages()
    {
        $member = $this->createMember01();
        $token = auth()->login($member);

        $channel1 = factory(Channel::class)->create([
            'id' => 1,
        ]);
        $article = factory(Article::class)->create([
            'id' => 1,
            'channel_id' => 1,
            'user_id' => 1,
        ]);

        $max_id = 5;

        $chat_messages = factory(ChatMessage::class, 15)->create();

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->get(TestHelper::getApiBase().'/articles/'.$article->id.'/get-chat-messages?max_id='.$max_id, $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => ResponseCode::SUCCESS,
                'content' => [
                    ['id' => 5],
                    ['id' => 4],
                    ['id' => 3],
                    ['id' => 2],
                    ['id' => 1],
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
