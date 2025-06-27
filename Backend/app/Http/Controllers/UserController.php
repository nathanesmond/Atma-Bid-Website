<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Get the authenticated user's profile.
     */
    public function getProfile(Request $request)
    {
        if ($request->user()->photo_profile != null) {
            $request->user()->photo_profile = Storage::disk('s3')->temporaryUrl(
                $request->user()->photo_profile,
                now()->addHours(2)
            );
        }

        return response()->json([
            'status' => 'success',
            'user' => $request->user(),
        ]);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'email' => 'string|max:255',
            'full_name' => 'string|max:255',
            'phone_number' => 'string|max:20',
            'photo_profile' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'identity_number' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user->email = $request->input('email', $user->email);
        $user->full_name = $request->input('full_name', $user->full_name);
        $user->phone_number = $request->input('phone_number', $user->phone_number);
        // $user->identity_number = $request->input('identity_number', $user->identity_number);

        if ($request->hasFile('photo_profile')) {
            if ($user->photo_profile) {
                \Storage::disk('s3')->delete($user->photo_profile);
            }

            $path = $request->file('photo_profile')->store('profile_pictures', 's3');
            $user->photo_profile = $path;
        }

        if ($request->hasFile('identity_number')) {
            if ($user->identity_number) {
                \Storage::disk('s3')->delete($user->identity_number);
            }
    
            $identityPath = $request->file('identity_number')->store('identity_files', 's3');
            $user->identity_number = $identityPath;
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully.',
            'user' => $user,
        ]);
    }

    /**
     * Change the authenticated user's password.
     */
    public function changePassword(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Current password is incorrect.',
            ], 403);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Password changed successfully.',
        ]);
    }
}
