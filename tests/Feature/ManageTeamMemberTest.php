<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\User;
use Log;

class ManageTeamMemberTest extends TestCase
{
    use DatabaseMigrations;
    /**
     * Admin member verifies non-verified user.
     *
     * @return void
     */
    public function testAdminVerifiesMember()
    {
        $admin_email = 'test@example.com';
        $admin_password = 'password';
        $admin = factory(User::class)->create([
            'id' => 1,
            'email' => $admin_email,
            'password' => $admin_password,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
        ]);
        $token = JWTAuth::fromUser($admin);

        $not_verified = factory(User::class)->create([
            'id' => 2,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => false,
        ]);
        $headers['Authorization'] = 'Bearer ' . $token;
        $response = $this->post('/api/v1.0.0/team-members/'.$not_verified->id, ['is_verified_by_admin' => true], $headers);

        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 0]);
        $this->assertDatabaseHas('users', [
            'id' => 2,
            'is_verified_by_admin' => true,
        ]);
    }
}
