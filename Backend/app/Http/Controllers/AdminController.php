<?php

namespace App\Http\Controllers;

use App\Models\Auction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function getAllUser()
    {
        $is_admin = Auth::user()->is_admin;

        if (!$is_admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not an admin.',
            ], 403);
        }

        $users = User::all()->map(function ($user) {
            if ($user->image != null) {
                $user->image = Storage::disk('s3')->temporaryUrl(
                    $user->image,
                    now()->addHours(2)
                );
            }
            return $user;
        });

        return response()->json([
            'message' => 'success',
            'users' => $users,
        ]);
    }

    public function getAllAuction()
    {
        // $is_admin = Auth::user()->is_admin;

        // if (!$is_admin) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'You are not an admin.',
        //     ], 403);
        // }

        $auctions = Auction::all();

        return response()->json([
            'message' => 'success',
            'users' => $auctions,
        ]);
    }

    public function updateAuction(Request $request, $id)
    {
        $is_admin = Auth::user()->is_admin;

        if (!$is_admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not an admin.',
            ], 403);
        }

        $auction = Auction::find($id);

        if (!$auction) {
            return response()->json(['message' => 'Auction not found'], 404);
        }

        $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'car_id' => 'sometimes|exists:cars,id',
            'starting_price' => 'sometimes|numeric|min:0',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i|after:start_time',
            'auction_date' => 'sometimes|date',
            'status' => 'sometimes|in:Upcoming,Ongoing,Finished',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
        ]);

        $auction->update($request->all());

        return response()->json(['message' => 'Auction updated successfully!', 'data' => $auction], 200);
    }

    public function updateUserStatus(Request $request, $id)
    {
        $is_admin = Auth::user()->is_admin;

        if (!$is_admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not an admin.',
            ], 403);
        }

        $request->validate([
            'status' => 'required'
        ]);

        $user = User::find($id);

        $user->status = $request->input('status', $user->status);

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User status updated successfully.',
        ]);
    }

    public function deleteUser($id)
    {
        $is_admin = Auth::user()->is_admin;

        if (!$is_admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not an admin.',
            ], 403);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found.',
            ], 404);
        }

        if (Auth::id() === $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot delete yourself.',
            ], 400);
        }

        try {
            if ($user->image) {
                Storage::disk('s3')->delete($user->image);
            }

            $user->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'User deleted successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
