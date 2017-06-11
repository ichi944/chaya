<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use JWTAuth;

use App\User;
use App\Helpers\TestHelper;

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
        $admin = $this->createAdmin01();
        $token = JWTAuth::fromUser($admin);

        $not_verified = factory(User::class)->create([
            'id' => 2,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => false,
        ]);
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->put(TestHelper::getApiBase().'/team-members/'.$not_verified->id.'/verify', [], $headers);

        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 0]);
        $this->assertDatabaseHas('users', [
            'id' => 2,
            'is_verified_by_admin' => true,
        ]);
    }

    public function testAdminFailedToVerifyIfMemberIsNotVerifiedWithEmail()
    {
        $admin = $this->createAdmin01();
        $token = JWTAuth::fromUser($admin);

        $not_verified = factory(User::class)->create([
            'id' => 2,
            'is_verified_with_email' => false,
            'is_verified_by_admin' => false,
        ]);
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);
        $response = $this->put(TestHelper::getApiBase().'/team-members/'.$not_verified->id.'/verify', [], $headers);

        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 1]);
        $this->assertDatabaseHas('users', [
            'id' => 2,
            'is_verified_by_admin' => false,
        ]);
    }

    public function testAdminLockMember()
    {
        $admin = $this->createAdmin01();
        $member = factory(User::class)->create([
            'id' => 2,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
        ]);
        $token = JWTAuth::fromUser($admin);
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);

        $response = $this->put(TestHelper::getApiBase().'/team-members/'.$member->id.'/lock', [], $headers);

        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 0]);
        $this->assertDatabaseHas('users', [
            'id' => 2,
            'is_locked' => true,
        ]);
    }

    public function testAdminUnlockMember()
    {
        $admin = $this->createAdmin01();
        $member = factory(User::class)->create([
            'id' => 2,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
            'is_locked' => true,
        ]);
        $token = JWTAuth::fromUser($admin);
        $headers = TestHelper::createHeaderWithAuthorizationToken($token);

        $response = $this->put(TestHelper::getApiBase().'/team-members/'.$member->id.'/unlock', [], $headers);

        $response
            ->assertStatus(200)
            ->assertJson(['_code' => 0]);
        $this->assertDatabaseHas('users', [
            'id' => 2,
            'is_locked' => false,
        ]);
    }

    /**
     * return Admin user
     * @return User
     **/
    private function createAdmin01()
    {
        $admin = factory(User::class)->create([
            'id' => 1,
            'is_verified_with_email' => true,
            'is_verified_by_admin' => true,
            'is_admin' => true,
        ]);
        return $admin;
    }
}
