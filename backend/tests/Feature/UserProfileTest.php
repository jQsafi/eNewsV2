<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UserProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_show_user_profile(): void
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/user/profile');

        $response->assertStatus(200)
            ->assertJson(['name' => $user->name, 'email' => $user->email]);
    }

    public function test_update_user_profile(): void
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $newUserData = [
            'name' => 'New Name',
            'email' => 'new@example.com',
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/user/profile', $newUserData);

        $response->assertStatus(200)
            ->assertJson(['name' => 'New Name', 'email' => 'new@example.com']);

        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'New Name', 'email' => 'new@example.com']);
    }

    public function test_update_user_profile_with_avatar(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $file = UploadedFile::fake()->image('avatar.jpg', 100, 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->post('/api/user/profile', [
                '_method' => 'PUT',
                'name' => 'Avatar User',
                'email' => 'avatar@example.com',
                'avatar' => $file,
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Avatar User', 'email' => 'avatar@example.com']);

        Storage::disk('public')->assertExists('avatars/' . $file->hashName());
        $this->assertDatabaseHas('users', ['id' => $user->id, 'avatar' => 'avatars/' . $file->hashName()]);
    }

    public function test_update_user_preferences(): void
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $newPreferences = [
            'theme' => 'dark',
            'notifications' => true,
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/user/preferences', $newPreferences);

        $response->assertStatus(200)
            ->assertJson($newPreferences);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'preferences' => json_encode(json_decode(json_encode($newPreferences), true), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_FORCE_OBJECT),
        ]);
    }
}
