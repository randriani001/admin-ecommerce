<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
      
        return response()->json([
            'data' => $categories,
            'message' => 'get category success',
            'error' => false
        ], status: 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'unique:products,name'],
        ]);

        $category = Category::create($data);

        return response()->json([
            'data' => $category,
            'message' => 'get category success',
            'error' => false
        ], status: 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::all()->find($id);

        return response()->json([
            'data' => $product ?? null,
            'message' => $category ? 'get category success' : 'category not found',
            'error' => $category ? false : true
        ], status: $category ? 200 : 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => ['required', 'string', "unique:products,name,{$category->id}"],
        ]);

        $category->update($data);

        return response()->json([
            'data' => $category,
            'message' => 'update category success',
            'error' => false
        ], status: 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
         if (!$category->exists()) {
            return response()->json([
            'data' => null,
            'message' => 'this data has a relation to another table',
            'error' => false
            ], status: 400);
        }
        
        $category->delete();
        
        return response()->json([
            'data' => null,
            'message' => 'delete category success',
            'error' => false
        ], status: 200);
    }
}
