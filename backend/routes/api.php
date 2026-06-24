<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChatbotController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Tea Shop Routes
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::post('/orders', [OrderController::class, 'store']);

// Admin Dashboard
Route::post('/admin/dashboard', [AdminController::class, 'dashboard']);
Route::delete('/admin/users/{username}', [AdminController::class, 'deleteUser']);
Route::put('/admin/users/{username}/password', [AdminController::class, 'updatePassword']);

// AI Chatbot Route
Route::post('/chat', [ChatbotController::class, 'chat']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
