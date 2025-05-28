<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')
            ->get();

        return response()->json([
            'data' => $products,
            'message' => 'get product success',
            'error' => false
        ], status: 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $data = $request->validate([
            'name' => ['required', 'string', 'unique:products,name'],
            'category_id' => ['required', 'string', 'exists:categories,id'],
            'description' => ['nullable'],
            'company' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'image' => ['required','image', 'max:2048'],
        ]);

        $image_url = $request->file('image')->store('product', 'public');
        $data['image'] = $image_url;

        $product = Product::create($data);

        return response()->json([
            'data' => $product,
            'message' => 'get product success',
            'error' => false
        ], status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with(['category', 'variants'])
            // di sini 'product' bukan 'products' karena di sini kita tidak menampilkan banyak data tapi satu data produk
            ->find($id);

        return response()->json([
            'data' => $product ?? null,
            // bahasa lainnya: $product ? product : null
            'message' => $product ? 'get product success' : 'product not found',
            'error' => $product ? false : true
        ], status: $product ? 200 : 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => ['required', 'string', "unique:products,name,{$product->id}"],
            'category_id' => ['required', 'string', "exists:categories,id"],
            'description' => ['nullable'],
            'company' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'image' => ['required','image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            $image_url = $request->file('image')->store('product', 'public');
            $data['image'] = $image_url;
        }

        $product->update($data);

        return response()->json([
            'data' => $product,
            'message' => 'update product success',
            'error' => false
        ], status: 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->variants()->exists()) {
            return response()->json([
            'data' => null,
            'message' => 'this data has a relation to another table',
            'error' => false
            ], status: 400);
        }
        
        $product->delete();
        
        return response()->json([
            'data' => null,
            'message' => 'delete product success',
            'error' => false
        ], status: 200);
    }
}
