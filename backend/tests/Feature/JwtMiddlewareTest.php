<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    public function test_protected_route_with_valid_token(): void
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/protected');

        $response->assertStatus(200)
            ->assertJson(['message' => 'This is a protected route']);
    }

    public function test_protected_route_without_token(): void
    {
        $response = $this->getJson('/api/protected');

        $response->assertStatus(401)
            ->assertJson(['error' => 'Token is absent']);
    }
}
