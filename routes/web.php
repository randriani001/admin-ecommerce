<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/about', AboutController::class);
// Route::get('/contact', ContactController::class);
// Route::resource('categories', CategoryController::class)->except([
//     'store',
//     'update',
//     'destroy'
// ]);

// Route::get('/coba-store', [CategoryController::class, 'store']);

// Route::resource('products', ProductController::class);

// Route::get('/', function () {
//     return inertia('index');
// });

// Route::get('/products', function () {
//     return inertia('product');
// });

Route::get('/users', function () {
    return inertia('user');
});

Route::get('/orders', function () {
    return inertia('order');
});

Route::get('/articles', function () {
    return inertia('article');
});

Route::get('/dashboard', function () {
    return inertia('dashboard');
});

Route::get('/profiles', function () {
    return inertia('profile');
});

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::prefix('/admin')
    // ->middleware(['auth','admin'])
    ->group(function () {
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('products.variants', ProductVariantController::class);

    Route::get('/dashboard', function () {
        return inertia('home');
    })->name('dashboard');

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/category/form', function () {
        return inertia('category/form');
    });
    //untuk memasukkan halaman baru yang diproteksi masukkan di sini

    Route::get('/product/form', function () {
        return inertia('product/form');
    });
});

Route::get('login', function () {
    return inertia('login');
})->name('login');

Route::post('login', [AuthController::class, 'authenticate']);

// Route::get('test', function () {
//     return "test 123";
// })->name('test');