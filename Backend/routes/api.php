<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuctionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\CarCatalogController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::resource('catalogs', CatalogController::class)->except(['create', 'edit']);
Route::resource('car-catalogs', CarCatalogController::class)->except(['create', 'edit']);

Route::get('auctions/featured-cars', [AuctionController::class, 'featuredCars']);
Route::get('auctions/hottest-bids', [AuctionController::class, 'hottestBids']);
Route::get('auctions/upcoming', [AuctionController::class, 'upcoming']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/profile', [UserController::class, 'getProfile']);
    Route::post('/user/profile', [UserController::class, 'updateProfile']);
    Route::post('/user/change-password', [UserController::class, 'changePassword']);

    Route::resource('cars', CarController::class)->except(['create', 'edit']);
    Route::resource('auctions', AuctionController::class)->except(['create', 'edit']);
    Route::resource('payments', PaymentController::class)->except(['create', 'edit']);

    Route::get('auctions/{auction_id}/bids', [BidController::class, 'index']);
    Route::post('bids', [BidController::class, 'store']);

    Route::get('/getAllUser', [AdminController::class, 'getAllUser']);
    Route::get('/getAllAuction', [AdminController::class, 'getAllAuction']);
    Route::put('/updateUserStatus/{user_id}', [AdminController::class, 'updateUserStatus']);
    Route::put('/updateAuction/{auction_id}', [AdminController::class, 'updateAuction']);
    Route::delete('/deleteUser/{user_id}', [AdminController::class, 'deleteUser']);
});
