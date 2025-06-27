<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'bid_id',
        'user_id',
        'payment_date',
        'payment_status',
    ];

    public $timestamps = false;

    public function bid()
    {
        return $this->belongsTo(Bid::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
