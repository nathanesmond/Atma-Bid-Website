<?php
namespace App\Http\Controllers;

use App\Models\CarCatalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarCatalogController extends Controller
{
    public function index()
    {
        $carCatalogs = CarCatalog::with(['auction.car', 'catalog'])->get();
        return response()->json(['data' => $carCatalogs], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'catalog_id' => 'required|exists:catalogs,id',
            'auction_id' => 'required|exists:auctions,id',
        ]);

        $exists = DB::table('car_catalogs')->where([
            ['catalog_id', '=', $request->catalog_id],
            ['auction_id', '=', $request->auction_id],
        ])->exists();

        if ($exists) {
            return response()->json(['message' => 'The catalog-car relationship already exists'], 409);
        }

        DB::table('car_catalogs')->insert([
            'catalog_id' => $request->catalog_id,
            'auction_id' => $request->auction_id,
        ]);

        return response()->json(['message' => 'Car-Catalog relationship created successfully!'], 201);
    }

    public function show($catalog_id, $auction_id)
    {
        $carCatalog = CarCatalog::with(['car', 'catalog'])->where([
            ['catalog_id', '=', $catalog_id],
            ['auction_id', '=', $auction_id],
        ])->first();

        if (!$carCatalog) {
            return response()->json(['message' => 'Car-Catalog relationship not found'], 404);
        }

        return response()->json(['data' => $carCatalog], 200);
    }

    public function destroy($catalog_id, $auction_id)
    {
        $carCatalog = DB::table('car_catalogs')->where([
            ['catalog_id', '=', $catalog_id],
            ['auction_id', '=', $auction_id],
        ])->exists();

        if (!$carCatalog) {
            return response()->json(['message' => 'Car-Catalog relationship not found'], 404);
        }

        DB::table('car_catalogs')->where([
            ['catalog_id', '=', $catalog_id],
            ['auction_id', '=', $auction_id],
        ])->delete();

        return response()->json(['message' => 'Car-Catalog relationship deleted successfully!'], 200);
    }
}