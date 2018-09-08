<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\SeedingInitial;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\User;
use App\Article;
use App\EmbeddedImage;
use App\Helpers\TestHelper;

class EmbeddedImagesTest extends TestCase
{
    use DatabaseMigrations;
    use SeedingInitial;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testEmbeddedImageIsSaved()
    {
        $this->seedingInitial();

        $member = User::find(1);
        $token = auth()->login($member);

        $article = factory(Article::class)->create([
            'id' => 1,
            'channel_id' => 1,
            'user_id' => 1,
        ]);

        $data = [
            'user_id' => 1,
            'channel_id' => 1,
            'image' => UploadedFile::fake()->image('embedded.png'),
        ];

        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->post(TestHelper::getApiBase().'/embedded-images', $data, $headers);

        $response
            ->assertJson(['_code' => 0])
            ->assertJsonStructure(['_code', 'url']);

        $this->assertDatabaseHas('embedded_images', [
            'user_id' => 1,
            'channel_id' => 1,
            'client_filename' => 'embedded.png',
        ]);
    }
}
