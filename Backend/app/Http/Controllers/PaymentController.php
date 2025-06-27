<?php
namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Bid;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::all();
        return response()->json(['data' => $payments], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bid_id' => 'required|exists:bids,id',
            'user_id' => 'required|exists:users,id',
            'payment_status' => 'required|string|max:255',
        ]);

        $bid = Bid::find($request->bid_id);
        if ($bid->user_id !== $request->user_id) {
            return response()->json(['message' => 'Invalid bid or user mismatch'], 400);
        }

        $payment = Payment::create([
            'bid_id' => $request->bid_id,
            'user_id' => $request->user_id,
            'payment_date' => Carbon::now(),
            'payment_status' => $request->payment_status,
        ]);

        return response()->json(['message' => 'Payment created successfully!', 'data' => $payment], 201);
    }

    public function show($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json(['data' => $payment], 200);
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $request->validate([
            'payment_status' => 'sometimes|required|string|max:255',
        ]);

        $payment->update($request->all());

        return response()->json(['message' => 'Payment updated successfully!', 'data' => $payment], 200);
    }

    public function destroy($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        $payment->delete();

        return response()->json(['message' => 'Payment deleted successfully!'], 200);
    }
}