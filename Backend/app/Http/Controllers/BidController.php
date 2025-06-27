<?php
namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Auction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Carbon;

class BidController extends Controller
{
    public function store(Request $request, $id)
    {
        $user_id = Auth::user()->id;
        if (!$user_id) {
            return response()->json(['message' => 'User is not authenticated'], 401);
        }
        $request->validate([
            // 'auction_id' => 'required|exists:auctions,id',
            'bid_price' => 'required|numeric|min:0',
        ]);

        // Mengecek status bid
        $auction = Auction::find($id);
        if (!$auction || $auction->status !== 'Ongoing') {
            return response()->json(['message' => 'The auction is not ongoing or does not exist'], 400);
        }

        // Mengecek jumlah bid
        $highestBid = Bid::where('auction_id', $id)->max('bid_price');
        if ($request->bid_price <= $highestBid) {
            return response()->json(['message' => 'Bid price must be higher than the current highest bid'], 400);
        }

        // Membuat bid
        $bid = Bid::create([
            'auction_id' => $id,
            'user_id' => $user_id,
            'bid_price' => $request->bid_price,
            'bid_time' => Carbon::now(),
            'is_valid' => true,
            'is_winning' => false,
        ]);

        // Untuk realtime
        Event::dispatch('bid.created', $bid);

        return response()->json(['message' => 'Bid placed successfully!', 'data' => $bid], 201);
    }

    public function index($auction_id)
    {
        $bids = Bid::where('auction_id', $auction_id)->orderBy('bid_price', 'desc')->get();
        return response()->json(['data' => $bids], 200);
    }
}
