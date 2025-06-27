<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $cars = [
            [
                'model' => 'Civic',
                'brand' => 'Honda',
                'capacity' => 5,
                'condition' => 'baru',
                'transmission' => 'otomatis',
                'odometer' => 500,
                'category' => 'Sedan',
            ],
            [
                'model' => 'Accord',
                'brand' => 'Honda',
                'capacity' => 5,
                'condition' => 'baru',
                'transmission' => 'manual',
                'odometer' => 1200,
                'category' => 'Sedan',
            ],
            [
                'model' => 'X5',
                'brand' => 'BMW',
                'capacity' => 5,
                'condition' => 'baru',
                'transmission' => 'otomatis',
                'odometer' => 800,
                'category' => 'SUV',
            ],
            [
                'model' => 'Camry',
                'brand' => 'Toyota',
                'capacity' => 5,
                'condition' => 'baru',
                'transmission' => 'otomatis',
                'odometer' => 300,
                'category' => 'Sedan',
            ],
            [
                'model' => 'Model S',
                'brand' => 'Tesla',
                'capacity' => 5,
                'condition' => 'baru',
                'transmission' => 'otomatis',
                'odometer' => 1500,
                'category' => 'Electric',
            ],
            [
                'model' => 'Fortuner',
                'brand' => 'Toyota',
                'capacity' => 7,
                'condition' => 'baru',
                'transmission' => 'otomatis',
                'odometer' => 400,
                'category' => 'SUV',
            ],
            [
                'model' => 'Pajero',
                'brand' => 'Mitsubishi',
                'capacity' => 7,
                'condition' => 'baru',
                'transmission' => 'manual',
                'odometer' => 600,
                'category' => 'SUV',
            ],
            [
                'model' => 'Ertiga',
                'brand' => 'Suzuki',
                'capacity' => 7,
                'condition' => 'baru',
                'transmission' => 'otomatis',
                'odometer' => 700,
                'category' => 'MPV',
            ],
            [
                'model' => 'Alphard',
                'brand' => 'Toyota',
                'capacity' => 7,
                'condition' => 'baru',
                'transmission' => 'otomatis',
                'odometer' => 200,
                'category' => 'MPV',
            ],
            [
                'model' => 'CX-5',
                'brand' => 'Mazda',
                'capacity' => 5,
                'condition' => 'baru',
                'transmission' => 'otomatis',
                'odometer' => 350,
                'category' => 'SUV',
            ],
        ];

        DB::table('cars')->insert($cars);
    }
}
