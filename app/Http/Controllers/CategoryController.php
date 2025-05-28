<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        //return Inertia::render('category/index', compact('categories')); | atau:
        //return inertia ('category/index', [
        //     'categories' => $categories
        //]); | atau:

        return inertia ('category/index', compact('categories'));  
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //$category = Category::create([
        //    'name' => "Ini kategori baru 123 zzz 123",
        //]);  

        return inertia("category/form"); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //$category = Category::create([
        //    'name' => "Ini kategori baru 123 zzz 123",
        //]);  

        //return response()->json($category);
        $data = $request->validate([
            'name'=> ['required', 'unique:categories,name'],
        ]);

        Category::create($data);
        
        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //$category = Category::find($category->id); -> ini kode untuk menampilkan satu2 by id

        $category = Category::all();

        return response()->json($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('category/form', [
            'category'=> $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        // $category->update([
        //     "name"=> "123456",
        // ]);

        $data = $request->validate([
            'name'=> ['required',"unique:categories,name,{$category->id}"],
        ]);

        $category->update($data);

        return redirect()->route("categories.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->products()->exists()) {
            return back()->withErrors(['message' => 'Category masih digunakan oleh product, data tidak bisa dihapus']);
        }

        $category->delete();

        return redirect()->route("categories.index");
    }
}
