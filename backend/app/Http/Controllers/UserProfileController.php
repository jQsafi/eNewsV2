<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class UserProfileController extends Controller
{
    /**
     * Get the authenticated user's profile.
     */
    public function show()
    {
        return response()->json(Auth::user());
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . Auth::id(),
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = Auth::user();

        $data = $request->only('name', 'email');

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $user->update($data);

        return response()->json($user);
    }

    /**
     * Update the authenticated user's preferences.
     */
    public function updatePreferences(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'theme' => 'nullable|string',
            'notifications' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = Auth::user();
        $user->preferences = array_merge((array) $user->preferences, $request->only('theme', 'notifications'));
        $user->save();

        return response()->json($user->preferences);
    }
}
