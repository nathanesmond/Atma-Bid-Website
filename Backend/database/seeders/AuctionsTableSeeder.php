<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuctionsTableSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::parse('2024-12-18 11:00:00');

        $auctions = [
            [
                'user_id' => 1,
                'car_id' => 5,
                'starting_price' => 15000,
                'start_time' => '09:00',
                'end_time' => '11:00',
                'auction_date' => '2024-12-17',
                'title' => 'Lelang Mobil Bekas - Honda Civic',
                'description' => 'Lelang mobil bekas Honda Civic tahun 2020 dalam kondisi baik.',
                'address' => 'Jl. Merdeka No. 45',
            ],
            [
                'user_id' => 1,
                'car_id' => 7,
                'starting_price' => 20000,
                'start_time' => '14:00',
                'end_time' => '16:00',
                'auction_date' => '2024-12-18',
                'title' => 'Lelang Mobil SUV - Toyota Fortuner',
                'description' => 'Lelang Toyota Fortuner terbaru dengan fitur lengkap.',
                'address' => 'Jl. Sudirman No. 10',
            ],
            [
                'user_id' => 1,
                'car_id' => 9,
                'starting_price' => 25000,
                'start_time' => '08:00',
                'end_time' => '10:00',
                'auction_date' => '2024-12-19',
                'title' => 'Lelang Mobil MPV - Suzuki Ertiga',
                'description' => 'Lelang Suzuki Ertiga 2023, ideal untuk keluarga.',
                'address' => 'Jl. Gatot Subroto No. 25',
            ],
            [
                'user_id' => 1,
                'car_id' => 12,
                'starting_price' => 18000,
                'start_time' => '10:00',
                'end_time' => '12:00',
                'auction_date' => '2024-12-16',
                'title' => 'Lelang Mobil Sedan - Toyota Camry',
                'description' => 'Toyota Camry 2021 dengan kondisi sangat baik.',
                'address' => 'Jl. Thamrin No. 5',
            ],
            [
                'user_id' => 1,
                'car_id' => 4,
                'starting_price' => 22000,
                'start_time' => '13:00',
                'end_time' => '15:00',
                'auction_date' => '2024-12-18',
                'title' => 'Lelang Mobil SUV - BMW X5',
                'description' => 'BMW X5 2022, performa tinggi dan mewah.',
                'address' => 'Jl. Pahlawan No. 30',
            ],
            [
                'user_id' => 1,
                'car_id' => 6,
                'starting_price' => 17000,
                'start_time' => '07:00',
                'end_time' => '09:00',
                'auction_date' => '2024-12-15',
                'title' => 'Lelang Mobil MPV - Toyota Alphard',
                'description' => 'Toyota Alphard 2019, nyaman dan luas.',
                'address' => 'Jl. Diponegoro No. 12',
            ],
            [
                'user_id' => 1,
                'car_id' => 8,
                'starting_price' => 16000,
                'start_time' => '11:00',
                'end_time' => '13:00',
                'auction_date' => '2024-12-18',
                'title' => 'Lelang Mobil Sedan - Honda Accord',
                'description' => 'Honda Accord 2020, efisiensi bahan bakar tinggi.',
                'address' => 'Jl. Ahmad Yani No. 20',
            ],
            [
                'user_id' => 1,
                'car_id' => 10,
                'starting_price' => 19000,
                'start_time' => '16:00',
                'end_time' => '18:00',
                'auction_date' => '2024-12-20',
                'title' => 'Lelang Mobil Elektrik - Tesla Model S',
                'description' => 'Tesla Model S 2023, teknologi terkini dan ramah lingkungan.',
                'address' => 'Jl. Kemerdekaan No. 8',
            ],
            [
                'user_id' => 1,
                'car_id' => 11,
                'starting_price' => 14000,
                'start_time' => '12:00',
                'end_time' => '14:00',
                'auction_date' => '2024-12-18',
                'title' => 'Lelang Mobil SUV - Mazda CX-5',
                'description' => 'Mazda CX-5 2021, desain sporty dan handal.',
                'address' => 'Jl. Veteran No. 22',
            ],
            [
                'user_id' => 1,
                'car_id' => 13,
                'starting_price' => 13000,
                'start_time' => '15:00',
                'end_time' => '17:00',
                'auction_date' => '2024-12-21',
                'title' => 'Lelang Mobil SUV - Mitsubishi Pajero',
                'description' => 'Mitsubishi Pajero 2022, tangguh di medan apapun.',
                'address' => 'Jl. Bunga Raya No. 7',
            ],
        ];

        foreach ($auctions as &$auction) {
            $auctionDate = Carbon::parse($auction['auction_date']);
            $startTime = Carbon::createFromFormat('Y-m-d H:i', $auction['auction_date'] . ' ' . $auction['start_time']);
            $endTime = Carbon::createFromFormat('Y-m-d H:i', $auction['auction_date'] . ' ' . $auction['end_time']);

            if ($auctionDate->gt($now->copy()->startOfDay())) {
                $auction['status'] = 'Upcoming';
            } elseif ($auctionDate->lt($now->copy()->startOfDay())) {
                $auction['status'] = 'Finished';
            } else {
                if ($startTime->lte($now) && $endTime->gte($now)) {
                    $auction['status'] = 'Ongoing';
                } elseif ($endTime->lt($now)) {
                    $auction['status'] = 'Finished';
                } else {
                    $auction['status'] = 'Upcoming';
                }
            }
        }

        DB::table('auctions')->insert($auctions);
    }
}
