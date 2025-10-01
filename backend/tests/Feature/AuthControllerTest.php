<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\Otp;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_send_otp_success(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/auth/send-otp', ['email' => 'test@example.com']);

        $response->assertStatus(200)
            ->assertJson(['message' => 'OTP sent successfully.']);

        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
        $this->assertDatabaseHas('otps', ['user_id' => User::where('email', 'test@example.com')->first()->id]);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com', 'role' => 'viewer']);
    }

    public function test_verify_otp_success(): void
    {
        $user = User::factory()->create();
        $otp = Otp::create([
            'user_id' => $user->id,
            'otp' => '123456',
            'expires_at' => now()->addMinutes(10),
        ]);

        $response = $this->postJson('/api/auth/verify-otp', [
            'email' => $user->email,
            'otp' => '123456',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['token']);

        $this->assertDatabaseHas('otps', [
            'id' => $otp->id,
            'used' => true,
        ]);
    }

    public function test_verify_otp_invalid(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/auth/verify-otp', [
            'email' => $user->email,
            'otp' => '654321',
        ]);

        $response->assertStatus(400)
            ->assertJson(['error' => 'Invalid OTP.']);
    }
}
