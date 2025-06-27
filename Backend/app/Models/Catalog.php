<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    use HasFactory;

    protected $table = 'catalogs';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'catalog_name'
    ];
}
