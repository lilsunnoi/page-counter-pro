<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:100',
            'image_url' => 'nullable|string'
        ]);

        $product = Product::create($request->all());

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'category' => 'sometimes|required|string|max:100',
            'image_url' => 'nullable|string'
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product
        ], 200);
    }
}
