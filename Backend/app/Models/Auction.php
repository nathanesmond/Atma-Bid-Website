<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;
    protected $table = 'auctions';
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'car_id',
        'starting_price',
        'start_time',
        'end_time',
        'auction_date',
        'status',
        'title',
        'description',
        'address',
        'image',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
