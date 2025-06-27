<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $table = 'cars';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'model',
        'brand',
        'capacity',
        'condition',
        'transmission',
        'odometer',
        'category',
        'image',
    ];
}
