<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Event;
use App\Channel;
use App\Article;
use App\User;
use JWTAuth;
use App\Helpers\TestHelper;
use App\Events\ChannelListUpdated;

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
     * @return void
     */
    public function testUpdateDescription()
    {
        $member = $this->createMember01();
        $token = JWTAuth::fromUser($member);
        $channel = factory(Channel::class)->create([
            'id' => 1,
            'description' => 'old',
        ]);
        $payload = [
            'description' => 'new',
        ];
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->put(TestHelper::getApiBase().'/channels/'.$channel->id.'/description', $payload, $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => 0,
                'channel' => [
                    'id' => 1,
                    'description' => 'new'
                ],
            ]);
    }

    /**
     * @return void
     */
    public function testAddNewChannel()
    {
        $admin = factory(User::class)->create([
            'id' => 1,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
            'is_admin' => 1,
        ]);
        $token = auth()->login($admin);

        Event::fake();

        $name = 'new channel';
        $description = 'some text';
        $payload = [
            'name' => $name,
            'description' => $description,
        ];
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->post(TestHelper::getApiBase().'/channels/add', $payload, $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => 0,
                'channel' => [
                    'name' => $name,
                    'description' => $description,
                ],
            ]);
        Event::assertDispatched(ChannelListUpdated::class, function ($e) {
            // assert only 1 channel exists.
            return $e->channels->count() === 1;
        });
    }


    /**
     * @return void
     */
    public function testFailedAddNewChannelByInvalidParams()
    {
        $admin = factory(User::class)->create([
            'id' => 1,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
            'is_admin' => 1,
        ]);
        $token = auth()->login($admin);

        Event::fake();

        $description = 'some text';
        $payload = [
            // not provide 'name'
            'description' => $description,
        ];
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->post(TestHelper::getApiBase().'/channels/add', $payload, $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => 1,
            ]);
        Event::assertNotDispatched(ChannelListUpdated::class);
    }


    /**
     * @return void
     */
    public function testChannelNameMustBeUnique()
    {
        $admin = factory(User::class)->create([
            'id' => 1,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
            'is_admin' => 1,
        ]);
        $token = auth()->login($admin);

        $name = 'channel1';
        $description = 'some text';
        $current_channel = factory(Channel::class)->create([
            'name' => $name,
        ]);

        Event::fake();

        $payload = [
            'name' => $name,
            'description' => $description,
        ];
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->post(TestHelper::getApiBase().'/channels/add', $payload, $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => 1,
            ]);
        Event::assertNotDispatched(ChannelListUpdated::class);
    }

    /**
     * @return void
     */
    public function testGeneralUserCantAddNewChannel()
    {
        $admin = factory(User::class)->create([
            'id' => 1,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
            'is_admin' => 0,
        ]);
        $token = auth()->login($admin);

        Event::fake();

        $name = 'new channel';
        $description = 'some text';
        $payload = [
            'name' => $name,
            'description' => $description,
        ];
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->post(TestHelper::getApiBase().'/channels/add', $payload, $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                '_code' => 1,
            ]);
        Event::assertNotDispatched(ChannelListUpdated::class);
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
