<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVarian;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Product $product)
    {
        $variants = ProductVariant::all(); 

        return inertia('product/variant/index', [
            'product' => $product,
            'variants' => $variants  
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Product $product)
    {
        return inertia ('product/variant/form', [
            'product' => $product
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Product $product)
    {
        $data = $request->validate([
            'variant_name' => ['required','string'],
            'product_id' => ['required','string', 'exists:products,id'],
            'stock' => ['required','numeric'],
            'image' => ['required','image', 'max:2048']
        ]);

        $image_url = $request->file('image')->store('variant', 'public');
        $data['image'] = $image_url;

        ProductVariant::create($data);

        return redirect()->route('products.variants.index', $product);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductVariant $productVarian)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product, ProductVariant $variant)
    {
        return inertia ('product/variant/form', [
            'product' => $product,
            'variant' => $variant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product, ProductVariant $variant)
    {
        $data = $request->validate([
            'variant_name' => ['required','string'],
            'product_id' => ['required','string', 'exists:products,id'],
            'stock' => ['required','numeric'],
            'image' => ['required','image', 'max:2048']
        ]);

        if ($request->hasFile('image')) {
            $image_url = $request->file('image')->store('variant', 'public');
            $data['image'] = $image_url;
        }

        $variant->update($data);

        return redirect()->route('products.variants.index', $product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, ProductVariant $variant)
    {
        $variant->delete();

        return back();
    }
}
