<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'total_amount' => 'required|numeric',
        ]);

        try {
            DB::beginTransaction();

            $order = Order::create([
                'username' => $request->username,
                'total_amount' => $request->total_amount,
            ]);

            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'ชำระเงินและบันทึกออเดอร์สำเร็จ', 'order_id' => $order->id], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'เกิดข้อผิดพลาดในการบันทึกออเดอร์', 'error' => $e->getMessage()], 500);
        }
    }
}
