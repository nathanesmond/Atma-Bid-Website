<?php
namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::all()->map(function ($car) {
            if ($car->image != null) {
                $car->image = Storage::disk('s3')->temporaryUrl(
                    $car->image,
                    now()->addHours(2)
                );
            }
            return $car;
        });

        return response()->json(['data' => $cars], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'model' => 'required',
            'brand' => 'required',
            'capacity' => 'required',
            'condition' => 'required',
            'transmission' => 'required',
            'odometer' => 'required',
            'category' => 'required',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $car = new Car($request->all());

        if ($request->hasFile('image')) {
            if ($car->image) {
                \Storage::disk('s3')->delete($car->image);
            }

            $path = $request->file('image')->store('cars_image', 's3');
            $car->image = $path;
        }

        $car->save();

        return response()->json(['message' => 'Car added successfully!', 'data' => $car], 201);
    }

    public function show($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        if ($car->image != null) {
            $car->image = Storage::disk('s3')->temporaryUrl(
                $car->image,
                now()->addHours(2)
            );
        }

        return response()->json(['data' => $car], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'model' => 'nullable',
            'brand' => 'nullable',
            'capacity' => 'nullable',
            'condition' => 'nullable',
            'transmission' => 'nullable',
            'odometer' => 'nullable',
            'category' => 'nullable',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $car->fill($request->all());

        if ($request->hasFile('image')) {
            $car->image = $request->file('image')->store('cars');
        }

        $car->save();

        return response()->json(['message' => 'Car updated successfully!', 'data' => $car], 200);
    }

    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $car->delete();

        return response()->json(['message' => 'Car deleted successfully!'], 200);
    }
}
