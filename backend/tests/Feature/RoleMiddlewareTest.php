<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use App\Enums\UserRole;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class RoleMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_route_with_admin_role(): void
    {
        $user = User::factory()->create(['role' => UserRole::ADMIN]);
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin');

        $response->assertStatus(200)
            ->assertJson(['message' => 'Welcome, Admin!']);
    }

    public function test_admin_route_with_viewer_role(): void
    {
        $user = User::factory()->create(['role' => UserRole::VIEWER]);
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/admin');

        $response->assertStatus(403)
            ->assertJson(['message' => 'Unauthorized.']);
    }

    public function test_admin_route_without_token(): void
    {
        $response = $this->getJson('/api/admin');

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    }
}
