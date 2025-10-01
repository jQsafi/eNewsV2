<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['message' => 'Welcome to the API'];
});

Route::post('/auth/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp']);

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('/protected', function () {
        return response()->json(['message' => 'This is a protected route']);
    });

    Route::get('/admin', ['middleware' => 'role:admin', function () {
        return response()->json(['message' => 'Welcome, Admin!']);
    }]);

    Route::get('/user/profile', [UserProfileController::class, 'show']);
    Route::put('/user/profile', [UserProfileController::class, 'update']);
    Route::put('/user/preferences', [UserProfileController::class, 'updatePreferences']);
});
