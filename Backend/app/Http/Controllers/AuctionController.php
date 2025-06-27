<?php
namespace App\Http\Controllers;

use App\Models\Auction;
use App\Models\Bid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuctionController extends Controller
{
    public function index()
    {
        $auctions = Auction::with(['car'])->get();
        return response()->json(['data' => $auctions], 200);
    }

    public function store(Request $request)
    {
        $user_id = Auth::user()->id;
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'starting_price' => 'required|numeric|min:0',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'auction_date' => 'required|date',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $request['user_id'] = $user_id;
        $auction = Auction::create($request->all());

        if ($request->hasFile('image')) {
            if ($auction->image) {
                \Storage::disk('s3')->delete($auction->image);
            }

            $path = $request->file('image')->store('auctions_image', 's3');
            $auction->image = $path;
        }

        $auction->save();

        return response()->json(['message' => 'Auction created successfully!', 'data' => $auction], 201);
    }

    public function show($id)
    {
        $auction = Auction::with(['car'])->find($id);

        if (!$auction) {
            return response()->json(['message' => 'Auction not found'], 404);
        }

        return response()->json(['data' => $auction], 200);
    }

    public function update(Request $request, $id)
    {
        $user_id = Auth::user()->id;
        $auction = Auction::where('user_id', '=', $user_id)->find($id);

        if (!$auction) {
            return response()->json(['message' => 'Auction not found'], 404);
        }

        $request->validate([
            'car_id' => 'sometimes|exists:cars,id',
            'starting_price' => 'sometimes|numeric|min:0',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i|after:start_time',
            'auction_date' => 'sometimes|date',
            'status' => 'sometimes|in:Upcoming,Ongoing,Finished',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $auction->fill($request->all());

        if ($request->hasFile('image')) {
            if ($auction->image) {
                \Storage::disk('s3')->delete($auction->image);
            }

            $path = $request->file('image')->store('auctions_image', 's3');
            $auction->image = $path;
        }

        $auction->id = $user_id;

        $auction->save();

        return response()->json(['message' => 'Auction updated successfully!', 'data' => $auction], 200);
    }

    public function destroy($id)
    {
        $auction = Auction::find($id);

        if (!$auction) {
            return response()->json(['message' => 'Auction not found'], 404);
        }

        $auction->delete();

        return response()->json(['message' => 'Auction deleted successfully!'], 200);
    }

    public function featuredCars()
    {
        $featuredAuctions = Auction::with(['car'])->where('status', 'Ongoing')->orderBy('starting_price', 'desc')->take(5)->get();
        return response()->json(['data' => $featuredAuctions], 200);
    }

    public function hottestBids()
    {
        $hottestBids = Bid::select('auction_id')
            ->selectRaw('COUNT(*) as total_bids')
            ->groupBy('auction_id')
            ->orderBy('total_bids', 'desc')
            ->take(5)
            ->with('auction.car')
            ->get();

        return response()->json(['data' => $hottestBids], 200);
    }

    public function upcoming()
    {
        $upcomingAuctions = Auction::with(['car'])->where('status', 'Upcoming')->whereDate('auction_date', '>=', now()->toDateString())->get();
        return response()->json(['data' => $upcomingAuctions], 200);
    }
}
