<?php
namespace App\Http\Controllers;

use App\Models\Catalog;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index()
    {
        $catalogs = Catalog::all();
        return response()->json(['data' => $catalogs], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'catalog_name' => 'required|string|max:255',
        ]);

        $catalog = Catalog::create($request->all());

        return response()->json(['message' => 'Catalog created successfully!', 'data' => $catalog], 201);
    }

    public function show($id)
    {
        $catalog = Catalog::find($id);

        if (!$catalog) {
            return response()->json(['message' => 'Catalog not found'], 404);
        }

        return response()->json(['data' => $catalog], 200);
    }

    public function update(Request $request, $id)
    {
        $catalog = Catalog::find($id);

        if (!$catalog) {
            return response()->json(['message' => 'Catalog not found'], 404);
        }

        $request->validate([
            'catalog_name' => 'sometimes|required|string|max:255',
        ]);

        $catalog->update($request->all());

        return response()->json(['message' => 'Catalog updated successfully!', 'data' => $catalog], 200);
    }

    public function destroy($id)
    {
        $catalog = Catalog::find($id);

        if (!$catalog) {
            return response()->json(['message' => 'Catalog not found'], 404);
        }

        $catalog->delete();

        return response()->json(['message' => 'Catalog deleted successfully!'], 200);
    }
}