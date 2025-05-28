<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category')->get();

        return inertia('product/index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return inertia('product/form', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'unique:products,name'],
            'category_id' => ['required', 'string', 'exists:categories,id'],
            'description' => ['nullable'],
            'company' => ['required', 'string'],
            'price' => ['required', 'numeric'],
        ]);
        
        $image_url = $request->file('image')->store('product', 'public');
        $data['image'] = $image_url;
        //ini adalah cara menyimpan data url-nya ke dalam variabel

        Product::create($data);

        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
         //$product = Product::all();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();

        return inertia('product/form', [
            'categories' => $categories,
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // dd($request->all());
        
        $data = $request->validate([
            'name' => ['required', 'string', "unique:products,name,{$product->id}"],
            'category_id' => ['required', 'string', "exists:categories,id"],
            'description' => ['nullable'],
            'company' => ['required', 'string'],
            'price' => ['required', 'numeric'],
        ]);

        if ($request->hasFile('image')) {
            $image_url = $request->file('image')->store('product', 'public');
            $data['image'] = $image_url;
        }

        $product->update($data);

        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->variants()->exists()) {
            return back()->withErrors(['message' => 'Product masih memiliki variant, tidak bisa dihapus.']);
        }

        $product->delete();

        return inertia('products.index');
    }
}