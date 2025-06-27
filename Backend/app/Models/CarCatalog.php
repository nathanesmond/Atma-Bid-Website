<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarCatalog extends Model
{
    public $incrementing = false;
    public $timestamps = false;

    protected $primaryKey = ['catalog_id', 'auction_id'];

    protected $fillable = [
        'catalog_id',
        'auction_id',
    ];

    public function auction()
    {
        return $this->belongsTo(Auction::class, 'auction_id');
    }

    public function catalog()
    {
        return $this->belongsTo(Catalog::class, 'catalog_id');
    }
}
